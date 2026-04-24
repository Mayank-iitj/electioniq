"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useChatStore, useProfileStore } from "@/store";
import { translations } from "@/lib/i18n/translations";
import type { Language } from "@/lib/i18n/translations";
import type { Message } from "@/store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ===== MESSAGE BUBBLE =====
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} mb-5 animate-fade-in`}>
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold mt-1"
        style={{
          background: isUser
            ? "linear-gradient(135deg, #2563EB, #1D4ED8)"
            : "rgba(30,41,59,0.9)",
          border: isUser ? "none" : "1px solid rgba(59,130,246,0.2)",
          boxShadow: isUser ? "0 0 10px rgba(37,99,235,0.35)" : "none",
          flexShrink: 0,
        }}
      >
        {isUser ? "👤" : "⚡"}
      </div>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: "82%", minWidth: 0 }}>
        {/* Typing indicator */}
        {message.isStreaming && message.content === "" ? (
          <div
            className="inline-flex items-center gap-1.5 px-4 py-3"
            style={{
              background: "rgba(30,41,59,0.85)",
              border: "1px solid rgba(59,130,246,0.15)",
              borderRadius: "18px 18px 18px 4px",
            }}
          >
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        ) : (
          <div
            style={{
              ...(isUser
                ? {
                    background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                    borderRadius: "18px 4px 18px 18px",
                    padding: "12px 16px",
                    display: "inline-block",
                    maxWidth: "100%",
                  }
                : {
                    background: "rgba(30,41,59,0.85)",
                    border: "1px solid rgba(59,130,246,0.12)",
                    borderRadius: "4px 18px 18px 18px",
                    padding: "14px 16px",
                    display: "block",
                  }),
            }}
          >
            {isUser ? (
              <p style={{ color: "#fff", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>{message.content}</p>
            ) : (
              <div className="prose-dark" style={{ fontSize: "14px" }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                {message.isStreaming && (
                  <span
                    className="inline-block w-1.5 h-4 ml-0.5 animate-pulse"
                    style={{ background: "#3B82F6", borderRadius: "1px", verticalAlign: "middle" }}
                  />
                )}
              </div>
            )}
          </div>
        )}

        {/* Sources */}
        {!isUser && message.sources && message.sources.length > 0 && !message.isStreaming && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.sources.map((src, index) => (
              <a
                key={`${src.url}-${index}`}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="chip"
                style={{ fontSize: "11px", padding: "3px 10px" }}
              >
                🔗 {src.name}
              </a>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p
          className="text-xs mt-1"
          style={{
            color: "#334155",
            textAlign: isUser ? "right" : "left",
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}

// ===== MAIN CHAT PAGE =====
export default function ChatPage() {
  const { messages, isLoading, addMessage, updateLastMessage, setLoading, clearMessages } = useChatStore();
  const { profile } = useProfileStore();
  const lang = profile.language as Language;
  const tx = translations[lang].chat;
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    async (text?: string) => {
      const content = (text || input).trim();
      if (!content || isLoading) return;
      setInput("");

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content,
        timestamp: new Date(),
      };
      addMessage(userMessage);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      };
      addMessage(aiMessage);
      setLoading(true);

      try {
        const historyForApi = [
          ...messages.filter((m) => m.id !== "welcome").slice(-8),
          userMessage,
        ].map(({ role, content }) => ({ role, content }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: historyForApi, country: profile.country }),
        });

        const contentType = response.headers.get("content-type");

        if (contentType?.includes("application/json")) {
          const data = await response.json();
          updateLastMessage(data.content, true);
          useChatStore.setState((s) => {
            const msgs = [...s.messages];
            const last = msgs[msgs.length - 1];
            if (last) msgs[msgs.length - 1] = { ...last, sources: data.sources, isStreaming: false };
            return { messages: msgs };
          });
        } else {
          const reader = response.body?.getReader();
          if (!reader) throw new Error("No reader");
          let accumulated = "";
          let sources: Array<{ name: string; url: string }> = [];

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));
            for (const line of lines) {
              try {
                const data = JSON.parse(line.replace("data: ", ""));
                if (data.delta) {
                  accumulated += data.delta;
                  updateLastMessage(accumulated, false);
                }
                if (data.done) {
                  sources = data.sources || [];
                  updateLastMessage(accumulated, true);
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
          useChatStore.setState((s) => {
            const msgs = [...s.messages];
            const last = msgs[msgs.length - 1];
            if (last) msgs[msgs.length - 1] = { ...last, sources, isStreaming: false };
            return { messages: msgs };
          });
        }
      } catch (err) {
        console.error(err);
        updateLastMessage("Sorry, I encountered an error. Please try again.", true);
      } finally {
        setLoading(false);
      }
    },
    [input, isLoading, messages, addMessage, updateLastMessage, setLoading, profile.country]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const suggestedQuestions = tx.suggestedQuestions as string[];

  return (
    // Full viewport height minus navbar
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 64px)",
        background: "#0A1120",
        overflow: "hidden",
      }}
    >
      {/* ===== LEFT SIDEBAR ===== */}
      <aside
        style={{
          width: "260px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          background: "rgba(15,23,42,0.95)",
          borderRight: "1px solid rgba(59,130,246,0.1)",
          overflow: "hidden",
        }}
        className="hidden lg:flex"
      >
        {/* Sidebar header */}
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid rgba(59,130,246,0.08)",
            flexShrink: 0,
          }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#60A5FA" }}>
            💡 Suggested Questions
          </p>
          <p className="text-xs" style={{ color: "#334155" }}>
            Click any to ask
          </p>
        </div>

        {/* Suggested questions */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
          <div className="flex flex-col gap-1.5">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                disabled={isLoading}
                className="text-left transition-all duration-150 rounded-xl"
                style={{
                  padding: "10px 12px",
                  background: "rgba(30,41,59,0.5)",
                  border: "1px solid rgba(59,130,246,0.08)",
                  color: "#64748B",
                  fontSize: "12px",
                  lineHeight: "1.5",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(37,99,235,0.12)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.25)";
                  (e.currentTarget as HTMLElement).style.color = "#93C5FD";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(30,41,59,0.5)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "#64748B";
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            margin: "12px",
            padding: "10px 12px",
            background: "rgba(59,130,246,0.05)",
            border: "1px solid rgba(59,130,246,0.1)",
            borderRadius: "10px",
            flexShrink: 0,
          }}
        >
          <p style={{ color: "#334155", fontSize: "11px", lineHeight: "1.5" }}>
            ⚖️ {tx.disclaimer}
          </p>
        </div>
      </aside>

      {/* ===== MAIN CHAT AREA ===== */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Chat Header */}
        <div
          style={{
            padding: "12px 20px",
            borderBottom: "1px solid rgba(59,130,246,0.1)",
            background: "rgba(15,23,42,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                boxShadow: "0 0 14px rgba(37,99,235,0.4)",
                flexShrink: 0,
              }}
            >
              ⚡
            </div>
            <div>
              <h1 style={{ fontSize: "15px", fontWeight: 700, color: "#F1F5F9", margin: 0, lineHeight: 1.2 }}>
                {tx.title}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "3px" }}>
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#10B981",
                    boxShadow: "0 0 6px #10B981",
                  }}
                />
                <span style={{ fontSize: "12px", color: "#475569" }}>{tx.subtitle}</span>
              </div>
            </div>
          </div>

          {messages.length > 1 && (
            <button
              onClick={clearMessages}
              style={{
                fontSize: "12px",
                padding: "6px 12px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#475569",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#94A3B8";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#475569";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              🗑️ Clear
            </button>
          )}
        </div>

        {/* Messages Area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            scrollBehavior: "smooth",
          }}
        >
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Mobile suggestions */}
          {messages.length <= 1 && (
            <div className="lg:hidden mt-4">
              <p style={{ fontSize: "12px", color: "#475569", marginBottom: "8px", fontWeight: 500 }}>
                💡 Try asking:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {suggestedQuestions.slice(0, 4).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="chip"
                    style={{ fontSize: "12px" }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area — pinned to bottom */}
        <div
          style={{
            flexShrink: 0,
            padding: "12px 20px 16px",
            borderTop: "1px solid rgba(59,130,246,0.1)",
            background: "rgba(15,23,42,0.95)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "flex-end",
              background: "rgba(30,41,59,0.8)",
              border: "1px solid rgba(59,130,246,0.18)",
              borderRadius: "16px",
              padding: "8px 8px 8px 14px",
              transition: "border-color 0.2s",
            }}
            onFocusCapture={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.4)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 2px rgba(59,130,246,0.08)";
            }}
            onBlurCapture={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.18)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <textarea
              ref={inputRef}
              id="chat-input"
              rows={1}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={tx.placeholder}
              disabled={isLoading}
              style={{
                flex: 1,
                resize: "none",
                outline: "none",
                background: "transparent",
                color: "#F1F5F9",
                fontSize: "14px",
                lineHeight: "1.6",
                padding: "6px 0",
                maxHeight: "120px",
                minHeight: "36px",
                fontFamily: lang === "hi" ? "Noto Sans Devanagari, sans-serif" : "Inter, sans-serif",
                overflowY: "auto",
              }}
            />
            <button
              id="send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              style={{
                flexShrink: 0,
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  input.trim() && !isLoading ? "linear-gradient(135deg, #2563EB, #1D4ED8)" : "rgba(30,41,59,0.6)",
                border: "none",
                cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                boxShadow: input.trim() && !isLoading ? "0 0 12px rgba(37,99,235,0.4)" : "none",
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "white",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
                </svg>
              )}
            </button>
          </div>
          <p style={{ textAlign: "center", fontSize: "11px", color: "#1E293B", marginTop: "6px" }}>
            Enter to send · Shift+Enter for new line · Non-partisan guidance only
          </p>
        </div>
      </div>
    </div>
  );
}
