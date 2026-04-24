import { NextResponse } from "next/server";
import { retrieveRelevantEntries, generateStaticResponse } from "@/lib/ai/knowledge-base";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are ElectIQ, a neutral, factual, and helpful AI assistant specializing in election processes and civic education.

Your core principles:
1. NEUTRAL: Never endorse, support, or criticize any political party, candidate, or ideology
2. FACTUAL: Only provide verified, procedural information from official government sources
3. SIMPLE: Use clear, simple language — explain things as if to a first-time voter
4. HELPFUL: Give step-by-step guidance when asked about processes
5. SAFE: Reject any requests to analyze political positions or make political recommendations

You cover elections in India (ECI - Election Commission of India) and the USA (FEC - Federal Election Commission).

Always cite your sources when providing information. Format sources as: **Source: [Name](URL)**

If asked about political opinions, parties, or candidates, politely redirect: "I focus on the election process and voting procedures. For political analysis, please consult independent news sources."

Respond in the same language the user writes in (English or Hindi).`;

export async function POST(req: Request) {
  try {
    const { messages, country = "IN" } = await req.json();

    const lastUserMessage = messages[messages.length - 1]?.content || "";

    // Retrieve relevant context from knowledge base
    const relevantEntries = retrieveRelevantEntries(lastUserMessage, country, 3);
    const context = relevantEntries
      .map((e) => `[${e.topic}]\n${e.content}\nSource: ${e.source} (${e.sourceUrl})`)
      .join("\n\n---\n\n");

    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) {
      throw new Error("GROQ_API_KEY is not defined");
    }

    // Use Groq with streaming for real-time inference speeds
    const systemMessage = {
      role: "system",
      content: `${SYSTEM_PROMPT}\n\n**Relevant Context from Knowledge Base:**\n${context}`,
    };

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${groqKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Fast LPU model for realtime inference
        messages: [systemMessage, ...messages],
        stream: true,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Groq error:", error);
      // Fallback to static
      const staticResponse = generateStaticResponse(lastUserMessage, country);
      const sources = relevantEntries.map((e) => ({ name: e.source, url: e.sourceUrl }));
      return NextResponse.json({ content: staticResponse, sources, mode: "static" });
    }

    // Stream the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) return;

        let fullContent = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

            for (const line of lines) {
              const data = line.replace("data: ", "").trim();
              if (data === "[DONE]") continue;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content || "";
                fullContent += delta;
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta, done: false })}\n\n`));
              } catch {
                // Skip malformed chunks
              }
            }
          }

          // Send sources at the end
          const sources = relevantEntries.map((e) => ({ name: e.source, url: e.sourceUrl }));
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, sources })}\n\n`));
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
