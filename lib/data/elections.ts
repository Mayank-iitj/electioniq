// ===== INDIA ELECTION DATA =====
export const indiaElectionData = {
  country: "India",
  code: "IN",
  commission: "Election Commission of India (ECI)",
  commissionUrl: "https://eci.gov.in",
  voterPortal: "https://voters.eci.gov.in",
  
  elections: [
    {
      id: "lok-sabha",
      name: "Lok Sabha (General Election)",
      description: "National parliament election. Elect Members of Parliament (MPs).",
      frequency: "Every 5 years",
      lastHeld: "2024",
      nextExpected: "2029",
      seats: 543,
      type: "national",
    },
    {
      id: "vidhan-sabha",
      name: "Vidhan Sabha (State Election)",
      description: "State assembly election. Elect Members of Legislative Assembly (MLAs).",
      frequency: "Every 5 years (staggered by state)",
      type: "state",
    },
    {
      id: "local",
      name: "Local Body Elections",
      description: "Panchayat, Municipal Corporation, and Nagar Panchayat elections.",
      frequency: "Every 5 years",
      type: "local",
    },
  ],

  eligibility: {
    ageRequirement: 18,
    citizenship: "Indian Citizen",
    residency: "Ordinary resident in the constituency",
    disqualifications: [
      "Non-citizen of India",
      "Under 18 years of age",
      "Of unsound mind (declared by court)",
      "Corrupt or illegal practices under Representation of People Act",
    ],
  },

  voterRegistration: {
    form: "Form 6",
    formUrl: "https://voters.eci.gov.in",
    onlinePortal: "https://nvsp.in",
    aadhaarLinkRequired: false,
    documents: [
      { name: "Aadhaar Card", required: true, description: "Or any government photo ID" },
      { name: "Proof of Age", required: true, description: "Birth certificate, school certificate, or Aadhaar" },
      { name: "Proof of Address", required: true, description: "Utility bill, rent agreement, or bank passbook" },
      { name: "Passport Photo", required: true, description: "Recent passport-size photograph" },
    ],
    steps: [
      {
        step: 1,
        title: "Check Eligibility",
        description: "Verify you are 18+ and an Indian citizen residing in the constituency.",
        icon: "shield-check",
        color: "#3B82F6",
      },
      {
        step: 2,
        title: "Register Online or Offline",
        description: "Fill Form 6 on the NVSP portal or visit your nearest ERO (Electoral Registration Officer) office.",
        icon: "file-text",
        color: "#8B5CF6",
      },
      {
        step: 3,
        title: "Submit Documents",
        description: "Upload or submit Aadhaar, proof of age, address proof, and a passport photo.",
        icon: "upload",
        color: "#F97316",
      },
      {
        step: 4,
        title: "Verification",
        description: "BLO (Booth Level Officer) verifies your details. This may take 2–6 weeks.",
        icon: "user-check",
        color: "#10B981",
      },
      {
        step: 5,
        title: "Get EPIC Card",
        description: "Receive your Voter ID (EPIC) card by post or download the e-EPIC from the voter portal.",
        icon: "credit-card",
        color: "#FBBF24",
      },
    ],
  },

  votingProcess: {
    steps: [
      {
        step: 1,
        title: "Find Your Polling Booth",
        description: "Use the voter portal or SMS 'EPIC <voter ID>' to find your assigned polling booth.",
        icon: "map-pin",
      },
      {
        step: 2,
        title: "Carry Valid ID",
        description: "Bring your EPIC card or any of the 12 alternative documents (Aadhaar, Passport, Driving License, etc.).",
        icon: "id-card",
      },
      {
        step: 3,
        title: "Join the Queue",
        description: "Arrive at your polling booth between 7 AM – 6 PM. Senior citizens and PWDs get priority.",
        icon: "users",
      },
      {
        step: 4,
        title: "Verify Identity",
        description: "Election officer verifies your ID and marks your name in the electoral roll.",
        icon: "check-circle",
      },
      {
        step: 5,
        title: "Cast Your Vote",
        description: "Press the button next to your candidate on the EVM (Electronic Voting Machine). Your vote is anonymous.",
        icon: "vote",
      },
      {
        step: 6,
        title: "Collect VVPAT Slip",
        description: "The VVPAT machine shows a slip for 7 seconds confirming your vote. Do not leave without verifying.",
        icon: "receipt",
      },
    ],
  },

  timeline2024: [
    { date: "Mar 16, 2024", event: "Model Code of Conduct enforced", phase: "Pre-Election", color: "#3B82F6" },
    { date: "Apr 19 – Jun 1, 2024", event: "Voting in 7 phases across India", phase: "Voting", color: "#8B5CF6" },
    { date: "Jun 4, 2024", event: "Result declaration & counting", phase: "Results", color: "#10B981" },
    { date: "Jun 2024", event: "New government sworn in", phase: "Post-Election", color: "#FBBF24" },
  ],

  states: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu & Kashmir", "Puducherry",
  ],

  sources: [
    { name: "Election Commission of India", url: "https://eci.gov.in" },
    { name: "National Voter's Service Portal", url: "https://voters.eci.gov.in" },
    { name: "Know Your Constituency", url: "https://www.knowindia.gov.in" },
  ],
};

// ===== USA ELECTION DATA =====
export const usaElectionData = {
  country: "United States",
  code: "US",
  commission: "Federal Election Commission (FEC)",
  commissionUrl: "https://www.fec.gov",
  voterPortal: "https://vote.gov",

  elections: [
    {
      id: "presidential",
      name: "Presidential Election",
      description: "Election for the President and Vice President of the United States.",
      frequency: "Every 4 years",
      lastHeld: "2024",
      nextExpected: "2028",
      type: "national",
    },
    {
      id: "congressional",
      name: "Congressional Election",
      description: "Elections for the Senate (1/3 of seats) and all 435 House seats.",
      frequency: "Every 2 years",
      type: "national",
    },
    {
      id: "state-local",
      name: "State & Local Elections",
      description: "Governor, state legislature, mayor, school board, judges, etc.",
      frequency: "Varies by state",
      type: "state/local",
    },
    {
      id: "primary",
      name: "Primary Elections",
      description: "Party primaries to select candidates for the general election.",
      frequency: "Every 2 years (before general election)",
      type: "primary",
    },
  ],

  eligibility: {
    ageRequirement: 18,
    citizenship: "US Citizen",
    residency: "Resident of the state where registering",
    disqualifications: [
      "Non-citizen",
      "Under 18 on Election Day (in most states)",
      "Serving a felony sentence (varies by state)",
      "Declared mentally incompetent by court (varies by state)",
    ],
  },

  voterRegistration: {
    onlinePortal: "https://vote.gov",
    deadline: "Varies by state (typically 15–30 days before election)",
    documents: [
      { name: "Government-issued Photo ID", required: false, description: "Required in some states" },
      { name: "Proof of Citizenship", required: false, description: "Only a few states require this" },
      { name: "Social Security Number", required: true, description: "Last 4 digits typically" },
      { name: "Proof of Residence", required: false, description: "Utility bill, bank statement, or lease" },
    ],
    steps: [
      {
        step: 1,
        title: "Check Eligibility",
        description: "Must be a US citizen, 18+ on Election Day, and a resident of your state.",
        icon: "shield-check",
        color: "#3B82F6",
      },
      {
        step: 2,
        title: "Register to Vote",
        description: "Register online at vote.gov, by mail using the National Voter Registration Form, or in person at the DMV or election office.",
        icon: "file-text",
        color: "#8B5CF6",
      },
      {
        step: 3,
        title: "Check Registration Status",
        description: "Verify your registration online at vote.gov or your state election authority website.",
        icon: "search",
        color: "#F97316",
      },
      {
        step: 4,
        title: "Know Your Voting Options",
        description: "Choose between in-person voting, early voting, or absentee/mail-in ballot.",
        icon: "list-checks",
        color: "#10B981",
      },
      {
        step: 5,
        title: "Vote!",
        description: "Cast your ballot on Election Day (first Tuesday after November 1st for federal elections).",
        icon: "vote",
        color: "#FBBF24",
      },
    ],
  },

  timeline2024: [
    { date: "Jan – Sep 2024", event: "State primary elections", phase: "Primary", color: "#3B82F6" },
    { date: "Aug 19–22, 2024", event: "Democratic National Convention", phase: "Campaign", color: "#8B5CF6" },
    { date: "Oct 15, 2024", event: "Voter registration deadlines (most states)", phase: "Registration", color: "#F97316" },
    { date: "Nov 5, 2024", event: "Presidential Election Day", phase: "Voting", color: "#EF4444" },
    { date: "Nov – Dec 2024", event: "Electoral College vote", phase: "Post-Election", color: "#10B981" },
    { date: "Jan 20, 2025", event: "Inauguration Day", phase: "Transition", color: "#FBBF24" },
  ],

  sources: [
    { name: "Vote.gov (Official US Voter Portal)", url: "https://vote.gov" },
    { name: "Federal Election Commission", url: "https://www.fec.gov" },
    { name: "USA.gov — Voting", url: "https://www.usa.gov/absentee-voting" },
    { name: "NCSL — State Voting Laws", url: "https://www.ncsl.org/elections-and-campaigns" },
  ],
};

export type Country = "IN" | "US";
export const COUNTRIES: Record<Country, typeof indiaElectionData | typeof usaElectionData> = {
  IN: indiaElectionData,
  US: usaElectionData,
};
