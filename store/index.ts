import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language } from "@/lib/i18n/translations";

// ===== TYPES =====
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: Array<{ name: string; url: string }>;
  isStreaming?: boolean;
}

export type Country = "IN" | "US";
export type EligibilityStatus = "eligible" | "not-eligible" | "partial" | null;

export interface UserProfile {
  country: Country;
  state: string;
  language: Language;
}

export interface EligibilityResult {
  status: EligibilityStatus;
  age: number;
  citizenship: string;
  country: Country;
  state: string;
  missingRequirements: string[];
  nextSteps: string[];
}

// ===== CHAT STORE =====
interface ChatStore {
  messages: Message[];
  isLoading: boolean;
  addMessage: (msg: Message) => void;
  updateLastMessage: (content: string, done?: boolean) => void;
  setLoading: (v: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>()((set) => ({
  messages: [
    {
      id: "welcome",
      role: "assistant",
      content:
        "👋 **Welcome to ElectIQ!** I'm your AI-powered election guide.\n\nI can help you understand:\n- 🗳️ How to register to vote\n- 📋 What documents you need\n- 📅 Key election dates and timelines\n- ✅ Your voter eligibility\n- 🏛️ How the election process works\n\nAsk me anything about elections in India or the USA — in English or Hindi!",
      timestamp: new Date(),
      sources: [
        { name: "Election Commission of India", url: "https://eci.gov.in" },
        { name: "Vote.gov (USA)", url: "https://vote.gov" },
      ],
    },
  ],
  isLoading: false,
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  updateLastMessage: (content, done = false) =>
    set((s) => {
      const msgs = [...s.messages];
      const last = msgs[msgs.length - 1];
      if (last && last.role === "assistant") {
        msgs[msgs.length - 1] = { ...last, content, isStreaming: !done };
      }
      return { messages: msgs };
    }),
  setLoading: (v) => set({ isLoading: v }),
  clearMessages: () =>
    set({
      messages: [
        {
          id: "welcome-" + Date.now(),
          role: "assistant",
          content: "👋 Chat cleared! Ask me anything about elections.",
          timestamp: new Date(),
        },
      ],
    }),
}));

// ===== USER PROFILE STORE =====
interface ProfileStore {
  profile: UserProfile;
  setCountry: (country: Country) => void;
  setState: (state: string) => void;
  setLanguage: (lang: Language) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: {
        country: "IN",
        state: "",
        language: "en",
      },
      setCountry: (country) => set((s) => ({ profile: { ...s.profile, country } })),
      setState: (state) => set((s) => ({ profile: { ...s.profile, state } })),
      setLanguage: (language) => set((s) => ({ profile: { ...s.profile, language } })),
    }),
    { name: "electiq-profile" }
  )
);

// ===== ELIGIBILITY STORE =====
interface EligibilityStore {
  result: EligibilityResult | null;
  setResult: (r: EligibilityResult | null) => void;
}

export const useEligibilityStore = create<EligibilityStore>()((set) => ({
  result: null,
  setResult: (result) => set({ result }),
}));

// ===== GUIDE STORE =====
interface GuideStore {
  currentStep: number;
  completedSteps: number[];
  eli5Mode: boolean;
  setStep: (step: number) => void;
  completeStep: (step: number) => void;
  toggleEli5: () => void;
}

export const useGuideStore = create<GuideStore>()((set) => ({
  currentStep: 0,
  completedSteps: [],
  eli5Mode: false,
  setStep: (step) => set({ currentStep: step }),
  completeStep: (step) =>
    set((s) => ({
      completedSteps: s.completedSteps.includes(step) ? s.completedSteps : [...s.completedSteps, step],
      currentStep: Math.min(step + 1, 4),
    })),
  toggleEli5: () => set((s) => ({ eli5Mode: !s.eli5Mode })),
}));

// ===== UI STORE =====
interface UIStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebar: (v: boolean) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebar: (v) => set({ sidebarOpen: v }),
}));
