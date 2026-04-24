// ===== TRANSLATIONS =====

export type Language = "en" | "hi";

export const translations = {
  en: {
    // Nav
    appName: "ElectIQ",
    tagline: "AI-Powered Election Assistant",
    nav: {
      home: "Home",
      chat: "AI Chat",
      guide: "Election Guide",
      timeline: "Timeline",
      eligibility: "Eligibility",
      documents: "Documents",
    },

    // Landing
    hero: {
      badge: "Civic Tech • Powered by AI",
      headline: "Understand Your",
      headlineAccent: "Democracy",
      subheadline: "Your intelligent guide to elections, voting rights, and civic participation. Clear, unbiased, and available in your language.",
      cta: "Start Chatting",
      ctaSecondary: "Explore Guide",
      trustBadge: "Verified sources from Election Commissions",
    },
    features: {
      chat: { title: "AI Chat Assistant", desc: "Ask anything about elections in plain language" },
      guide: { title: "Step-by-Step Guide", desc: "Guided flow from eligibility to casting your vote" },
      timeline: { title: "Election Timeline", desc: "Interactive calendar of key election dates" },
      eligibility: { title: "Eligibility Checker", desc: "Know your voting rights in seconds" },
    },

    // Chat
    chat: {
      title: "AI Election Assistant",
      subtitle: "Ask me anything about elections",
      placeholder: "Ask about elections, voting, registration...",
      send: "Send",
      thinking: "Thinking...",
      clearChat: "Clear Chat",
      suggestedQuestions: [
        "How do I register to vote in India?",
        "What documents do I need to vote?",
        "When is the next election?",
        "What is the voting age?",
        "How does the EVM work?",
        "What is Model Code of Conduct?",
      ],
      systemPrompt: "You are ElectIQ, a neutral, factual AI assistant that explains election processes clearly and simply. You only provide procedural guidance — never endorse political parties, candidates, or ideologies. Always cite official government sources. Use simple language and step-by-step explanations.",
      disclaimer: "ElectIQ provides procedural guidance only. Not affiliated with any political party.",
    },

    // Guide
    guide: {
      title: "Election Flow Guide",
      subtitle: "Your step-by-step journey from citizen to voter",
      steps: {
        eligibility: "Check Eligibility",
        register: "Register to Vote",
        verify: "Verify Registration",
        vote: "Cast Your Vote",
        track: "Track Results",
      },
      eli5Toggle: "Explain Like I'm 18",
      eli5Badge: "Simple Mode ON",
    },

    // Timeline
    timeline: {
      title: "Election Timeline",
      subtitle: "Key dates and phases of the election process",
      phases: {
        preElection: "Pre-Election",
        registration: "Registration",
        campaign: "Campaign Period",
        voting: "Voting Day",
        results: "Results",
        postElection: "Post-Election",
      },
    },

    // Eligibility
    eligibility: {
      title: "Eligibility Checker",
      subtitle: "Find out if you're eligible to vote",
      form: {
        age: "Your Age",
        agePlaceholder: "Enter your age",
        citizenship: "Citizenship",
        citizenshipPlaceholder: "Select your citizenship status",
        country: "Country",
        state: "State / Region",
        statePlaceholder: "Select your state",
        check: "Check My Eligibility",
      },
      results: {
        eligible: "You are Eligible to Vote! 🎉",
        notEligible: "You are Not Eligible Yet",
        partial: "Conditionally Eligible",
        nextSteps: "Your Next Steps",
        requirements: "Requirements",
        missing: "Missing Requirements",
      },
    },

    // Documents
    documents: {
      title: "Document Guide",
      subtitle: "Everything you need to register and vote",
      categories: {
        registration: "For Registration",
        voting: "For Voting",
        optional: "Optional / Helpful",
      },
      downloadChecklist: "Download Checklist",
    },

    // Common
    common: {
      india: "India",
      usa: "United States",
      selectCountry: "Select Country",
      learnMore: "Learn More",
      viewSource: "View Source",
      officialSource: "Official Source",
      verified: "Verified",
      loading: "Loading...",
      back: "Back",
      next: "Next",
      close: "Close",
    },
  },

  hi: {
    appName: "ElectIQ",
    tagline: "AI-सक्षम चुनाव सहायक",
    nav: {
      home: "होम",
      chat: "AI चैट",
      guide: "चुनाव गाइड",
      timeline: "टाइमलाइन",
      eligibility: "पात्रता",
      documents: "दस्तावेज़",
    },

    hero: {
      badge: "नागरिक तकनीक • AI द्वारा संचालित",
      headline: "अपना",
      headlineAccent: "लोकतंत्र समझें",
      subheadline: "चुनाव, मतदान अधिकार और नागरिक भागीदारी के लिए आपका बुद्धिमान मार्गदर्शक। स्पष्ट, निष्पक्ष, और आपकी भाषा में।",
      cta: "चैट शुरू करें",
      ctaSecondary: "गाइड देखें",
      trustBadge: "चुनाव आयोग के सत्यापित स्रोत",
    },
    features: {
      chat: { title: "AI चैट सहायक", desc: "सरल भाषा में चुनाव के बारे में कुछ भी पूछें" },
      guide: { title: "चरणबद्ध गाइड", desc: "पात्रता से मतदान तक का पूरा मार्गदर्शन" },
      timeline: { title: "चुनाव टाइमलाइन", desc: "प्रमुख चुनाव तिथियों का इंटरएक्टिव कैलेंडर" },
      eligibility: { title: "पात्रता जांचक", desc: "कुछ ही सेकंड में अपने मतदान अधिकार जानें" },
    },

    chat: {
      title: "AI चुनाव सहायक",
      subtitle: "चुनाव के बारे में कुछ भी पूछें",
      placeholder: "चुनाव, मतदान, पंजीकरण के बारे में पूछें...",
      send: "भेजें",
      thinking: "सोच रहा हूं...",
      clearChat: "चैट साफ़ करें",
      suggestedQuestions: [
        "भारत में मतदाता पंजीकरण कैसे करें?",
        "मतदान के लिए कौन से दस्तावेज़ चाहिए?",
        "अगला चुनाव कब है?",
        "मतदान की आयु क्या है?",
        "EVM कैसे काम करती है?",
        "आदर्श आचार संहिता क्या है?",
      ],
      systemPrompt: "आप ElectIQ हैं, एक निष्पक्ष AI सहायक जो चुनाव प्रक्रियाओं को सरल भाषा में समझाते हैं। केवल प्रक्रियात्मक मार्गदर्शन दें, कभी भी किसी राजनीतिक दल या उम्मीदवार का समर्थन न करें।",
      disclaimer: "ElectIQ केवल प्रक्रियात्मक मार्गदर्शन प्रदान करता है। किसी राजनीतिक दल से संबद्ध नहीं।",
    },

    guide: {
      title: "चुनाव प्रवाह गाइड",
      subtitle: "नागरिक से मतदाता तक की आपकी यात्रा",
      steps: {
        eligibility: "पात्रता जांचें",
        register: "मतदाता पंजीकरण",
        verify: "पंजीकरण सत्यापित करें",
        vote: "मत डालें",
        track: "परिणाम ट्रैक करें",
      },
      eli5Toggle: "सरल भाषा में समझाएं",
      eli5Badge: "सरल मोड चालू",
    },

    timeline: {
      title: "चुनाव टाइमलाइन",
      subtitle: "चुनाव प्रक्रिया की प्रमुख तिथियां और चरण",
      phases: {
        preElection: "पूर्व-चुनाव",
        registration: "पंजीकरण",
        campaign: "प्रचार काल",
        voting: "मतदान दिवस",
        results: "परिणाम",
        postElection: "चुनाव के बाद",
      },
    },

    eligibility: {
      title: "पात्रता जांचक",
      subtitle: "जानें कि आप मतदान के लिए पात्र हैं या नहीं",
      form: {
        age: "आपकी आयु",
        agePlaceholder: "अपनी आयु दर्ज करें",
        citizenship: "नागरिकता",
        citizenshipPlaceholder: "नागरिकता की स्थिति चुनें",
        country: "देश",
        state: "राज्य / क्षेत्र",
        statePlaceholder: "अपना राज्य चुनें",
        check: "पात्रता जांचें",
      },
      results: {
        eligible: "आप मतदान के पात्र हैं! 🎉",
        notEligible: "आप अभी पात्र नहीं हैं",
        partial: "सशर्त पात्र",
        nextSteps: "आगे के कदम",
        requirements: "आवश्यकताएं",
        missing: "लापता आवश्यकताएं",
      },
    },

    documents: {
      title: "दस्तावेज़ गाइड",
      subtitle: "पंजीकरण और मतदान के लिए आवश्यक सब कुछ",
      categories: {
        registration: "पंजीकरण के लिए",
        voting: "मतदान के लिए",
        optional: "वैकल्पिक / सहायक",
      },
      downloadChecklist: "चेकलिस्ट डाउनलोड करें",
    },

    common: {
      india: "भारत",
      usa: "संयुक्त राज्य अमेरिका",
      selectCountry: "देश चुनें",
      learnMore: "और जानें",
      viewSource: "स्रोत देखें",
      officialSource: "आधिकारिक स्रोत",
      verified: "सत्यापित",
      loading: "लोड हो रहा है...",
      back: "वापस",
      next: "आगे",
      close: "बंद करें",
    },
  },
};

export function t(lang: Language, key: string): string {
  const keys = key.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[lang];
  for (const k of keys) {
    if (value === undefined) return key;
    value = value[k];
  }
  return typeof value === "string" ? value : key;
}
