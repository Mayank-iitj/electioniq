import { indiaElectionData, usaElectionData } from "@/lib/data/elections";

// ===== KNOWLEDGE BASE for RAG-style retrieval =====
export interface KnowledgeEntry {
  id: string;
  topic: string;
  keywords: string[];
  content: string;
  country: "IN" | "US" | "ALL";
  source: string;
  sourceUrl: string;
}

export const knowledgeBase: KnowledgeEntry[] = [
  // ===== INDIA ENTRIES =====
  {
    id: "in-eligibility",
    topic: "India Voter Eligibility",
    keywords: ["eligible", "eligibility", "qualify", "vote", "age", "18", "citizen", "india"],
    content: `To vote in India, you must be:
1. A citizen of India
2. At least 18 years of age on the qualifying date (January 1st of the year)
3. Ordinarily resident in the constituency where you wish to register

You are NOT eligible if you are:
- Not an Indian citizen
- Under 18 years old
- Declared of unsound mind by a competent court
- Convicted of corrupt or illegal practices under the Representation of People Act, 1951`,
    country: "IN",
    source: "Election Commission of India",
    sourceUrl: "https://eci.gov.in",
  },
  {
    id: "in-registration",
    topic: "How to Register to Vote in India",
    keywords: ["register", "registration", "form 6", "voter id", "epic", "enroll", "nvsp", "how to vote india"],
    content: `How to register as a voter in India:

**Online Registration:**
1. Visit https://voters.eci.gov.in (National Voter's Service Portal)
2. Click "New Registration" and fill Form 6
3. Upload required documents (Aadhaar, age proof, address proof, photo)
4. Submit and note your application reference number

**Offline Registration:**
1. Visit your nearest Electoral Registration Office (ERO) or Booth Level Officer (BLO)
2. Fill Form 6 manually and submit with documents
3. BLO will verify your details within 2–6 weeks
4. You'll receive your EPIC (Voter ID) card by post

**Required Documents:**
- Aadhaar Card (or any government photo ID)
- Proof of Age (birth certificate, school leaving certificate)
- Proof of Residence (utility bill, rent agreement, bank passbook)
- Recent passport-size photograph`,
    country: "IN",
    source: "National Voter's Service Portal",
    sourceUrl: "https://voters.eci.gov.in",
  },
  {
    id: "in-voting-process",
    topic: "How to Vote in India",
    keywords: ["how to vote", "polling booth", "evm", "voting process", "election day", "ballot", "cast vote"],
    content: `How to vote in India on Election Day:

1. **Find your polling booth**: Use the voter portal or SMS 'EPIC <voter ID number>' to 1950
2. **Check voting hours**: Generally 7 AM to 6 PM (check your notification slip)
3. **Carry valid ID**: Your EPIC card OR any of these 12 alternatives:
   - Aadhaar Card, Passport, Driving License, PAN Card
   - NREGA Job Card, Bank/Post Office Passbook with photo
   - Smart Card issued by RGI, Student ID from recognized university
4. **At the polling station**: 
   - Join the queue (senior citizens and PWDs get priority)
   - Get your name verified in the electoral roll
   - Your finger gets ink-marked (indelible ink on left index finger)
5. **Cast your vote**:
   - Press the button next to your candidate's symbol on the EVM
   - The EVM beeps confirming your vote
6. **VVPAT verification**: The VVPAT machine shows a printed slip for 7 seconds confirming your choice`,
    country: "IN",
    source: "Election Commission of India",
    sourceUrl: "https://eci.gov.in",
  },
  {
    id: "in-evm",
    topic: "Electronic Voting Machine (EVM)",
    keywords: ["evm", "electronic voting machine", "how evm works", "machine", "button", "tamper"],
    content: `About India's Electronic Voting Machine (EVM):

**What is an EVM?**
An EVM is the standalone electronic device used in Indian elections to record votes. It replaced paper ballots from 1999 onwards.

**How does it work?**
- The EVM has two units: a Control Unit (with polling officer) and a Balloting Unit (in voting compartment)
- The Balloting Unit shows candidate names, party symbols, and serial numbers
- You press the blue button next to your candidate
- A green light and beep confirm your vote is recorded
- Each EVM can record up to 2,000 votes

**VVPAT (Voter Verifiable Paper Audit Trail):**
- A printer device attached to the EVM
- After you vote, a paper slip with your chosen candidate is shown for 7 seconds
- The slip falls into a sealed box — it's for audit purposes only

**Is the EVM secure?**
- EVMs are standalone devices with no internet connection
- Manufactured by BEL and ECIL under ECI supervision
- Subjected to rigorous technical checking before every election`,
    country: "IN",
    source: "Election Commission of India",
    sourceUrl: "https://eci.gov.in/voter/evm-and-vvpat/",
  },
  {
    id: "in-model-code",
    topic: "Model Code of Conduct",
    keywords: ["model code of conduct", "mcc", "election rules", "campaign rules", "conduct"],
    content: `Model Code of Conduct (MCC) in India:

**What is the MCC?**
A set of guidelines issued by the Election Commission of India (ECI) to regulate the conduct of political parties and candidates during elections.

**When does it apply?**
The MCC comes into effect the moment the election schedule is announced and remains until the results are declared.

**Key rules under MCC:**
- Government cannot announce new schemes, policies, or projects
- No use of government machinery or resources for campaigning
- Political parties must get prior permission for rallies
- No hate speech, communal appeals, or bribery
- Polling booths cannot be near places of worship

**Who enforces it?**
The Election Commission of India (ECI) enforces the MCC and can take action against violators.`,
    country: "IN",
    source: "Election Commission of India",
    sourceUrl: "https://eci.gov.in/model-code-of-conduct/",
  },
  {
    id: "in-documents-voting",
    topic: "Documents Required to Vote in India",
    keywords: ["documents", "id proof", "voter id", "what to bring", "id card", "identification"],
    content: `Documents accepted at Indian polling booths (any ONE of these):

**Primary Document:**
- EPIC (Voter ID / Elector Photo Identity Card) — Preferred

**12 Alternative Photo IDs accepted by ECI:**
1. Aadhaar Card
2. MNREGA Job Card
3. Passbooks with photograph issued by Bank/Post Office
4. Health Insurance Smart Card under Ministry of Labour scheme
5. Driving License
6. PAN Card
7. Smart Card issued by RGI under National Population Register
8. Indian Passport
9. Pension document with photograph
10. Service Identity Cards with photograph (Central/State/PSU/Public Limited Companies)
11. MP/MLA/MLC Identity Card
12. Unique Disability ID (UDID) Card issued by Ministry of Social Justice & Empowerment`,
    country: "IN",
    source: "Election Commission of India",
    sourceUrl: "https://eci.gov.in",
  },

  // ===== USA ENTRIES =====
  {
    id: "us-eligibility",
    topic: "USA Voter Eligibility",
    keywords: ["eligible", "eligibility", "qualify", "vote usa", "american voter", "citizen", "united states"],
    content: `To vote in US federal elections, you must be:
1. A United States citizen (by birth or naturalization)
2. At least 18 years old on or before Election Day
3. Registered to vote in your state (some states allow same-day registration)
4. A resident of the state in which you register

Additional state-specific rules may apply. Some states have additional requirements or restrictions regarding:
- Felony convictions (varies widely by state)
- Mental incapacity (rarely applied)

Note: Permanent residents (green card holders), visa holders, and undocumented immigrants cannot vote in federal elections.`,
    country: "US",
    source: "Vote.gov",
    sourceUrl: "https://vote.gov",
  },
  {
    id: "us-registration",
    topic: "How to Register to Vote in the USA",
    keywords: ["register usa", "voter registration usa", "vote.gov", "how to register", "mail-in registration"],
    content: `How to register to vote in the United States:

**Online:**
- Visit https://vote.gov and click your state
- Most states allow online registration via their Secretary of State website

**By Mail:**
- Download the National Voter Registration Form
- Mail it to your local election office before your state's deadline

**In Person:**
- Register at your local election office, DMV, public library, or military recruitment office
- Some states allow same-day registration at the polls

**Key Deadlines:**
- Most states require registration 15–30 days before the election
- Check your specific state deadline at vote.gov

**Information you'll need:**
- Name, address, date of birth
- US citizenship status
- Social Security number (last 4 digits typically)
- State ID or driver's license number (in some states)`,
    country: "US",
    source: "Vote.gov — Official US Voter Portal",
    sourceUrl: "https://vote.gov",
  },
  {
    id: "us-voting-process",
    topic: "How to Vote in the USA",
    keywords: ["how to vote usa", "polling place", "ballot", "election day usa", "early voting", "absentee"],
    content: `How to vote in the United States:

**3 Ways to Vote:**

1. **Vote In-Person on Election Day:**
   - Federal Election Day: First Tuesday after November 1st
   - Find your polling place at vote.gov
   - Bring required ID (varies by state)
   - Receive a ballot, make your selections, feed it into the scanner or place in ballot box

2. **Early Voting:**
   - Many states offer early voting 1–4 weeks before Election Day
   - Visit any designated early voting location in your county
   - Great way to avoid Election Day crowds

3. **Mail-in/Absentee Voting:**
   - Request an absentee ballot from your election office
   - Mark your ballot, sign the envelope, and mail it back
   - Must be received by your state's deadline (usually Election Day)

**At the Polling Place:**
- Show your ID (requirements vary by state)
- Tell the poll worker your name and address
- Receive your ballot
- Make your selections in the privacy booth
- Submit your ballot`,
    country: "US",
    source: "Federal Election Commission",
    sourceUrl: "https://www.fec.gov",
  },

  // ===== GENERAL ENTRIES =====
  {
    id: "gen-why-vote",
    topic: "Why Voting Matters",
    keywords: ["why vote", "importance of voting", "why should i vote", "impact", "democracy"],
    content: `Why Your Vote Matters:

**Your vote directly impacts:**
- Local infrastructure: roads, schools, hospitals in your area
- National policies: economy, healthcare, education funding
- Who represents your community in government
- Laws that affect your daily life

**The math of voting:**
- Many elections are decided by very small margins
- In India's 2014 elections, 30+ constituencies were won by margins under 1,000 votes
- In the 2000 US Presidential election, Florida was decided by just 537 votes

**Voting is a right, not just a privilege:**
- Generations fought for the right to vote (women's suffrage, civil rights movement)
- It's one of the most direct ways citizens can influence their government
- Abstaining is also a choice — but it means others decide for you

**Remember:** In a democracy, government works for the people — but only if the people participate.`,
    country: "ALL",
    source: "ElectIQ Civic Education",
    sourceUrl: "https://electiq.app",
  },
  {
    id: "gen-what-is-election",
    topic: "What is an Election?",
    keywords: ["what is election", "election meaning", "how elections work", "democracy", "voting system"],
    content: `What is an Election?

An election is a formal process where citizens choose their representatives or decide on policies through voting.

**Key Types of Elections:**
- **General Elections**: To elect the national parliament/congress
- **State/Provincial Elections**: To elect state government representatives
- **Local Elections**: For city councils, mayors, school boards
- **By-elections**: Held to fill a vacancy in a seat

**How a Democratic Election Works:**
1. Candidates from different parties (or as independents) register to contest
2. A campaign period allows candidates to present their ideas to voters
3. On Election Day, registered voters cast their ballots
4. Votes are counted and the candidate/party with the most votes wins
5. The winning party or coalition forms the government

**Key Principles of Free & Fair Elections:**
- Universal suffrage (all eligible citizens can vote)
- Secret ballot (your vote is private)
- Equal voting weight (one person, one vote)
- Independent election authority (ECI in India, FEC in USA)
- Transparent counting process`,
    country: "ALL",
    source: "ElectIQ Civic Education",
    sourceUrl: "https://electiq.app",
  },
];

// ===== TOP-K RETRIEVAL =====
export function retrieveRelevantEntries(query: string, country: "IN" | "US" | "ALL", topK = 3): KnowledgeEntry[] {
  const queryLower = query.toLowerCase();
  const words = queryLower.split(/\s+/);

  const scored = knowledgeBase
    .filter((e) => e.country === country || e.country === "ALL" || country === "ALL")
    .map((entry) => {
      let score = 0;
      for (const keyword of entry.keywords) {
        if (queryLower.includes(keyword)) score += 3;
        for (const word of words) {
          if (keyword.includes(word) && word.length > 3) score += 1;
        }
      }
      if (queryLower.includes(entry.topic.toLowerCase())) score += 5;
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ entry }) => entry);

  // If nothing found, return general entries
  if (scored.length === 0) {
    return knowledgeBase.filter((e) => e.country === "ALL").slice(0, 2);
  }

  return scored;
}

// ===== STATIC RESPONSE GENERATOR (fallback when no OpenAI key) =====
export function generateStaticResponse(query: string, country: "IN" | "US" | "ALL"): string {
  const entries = retrieveRelevantEntries(query, country, 2);

  if (entries.length === 0) {
    return `I can help you understand election processes. Could you be more specific about what you'd like to know? For example, you can ask about voter registration, eligibility requirements, what documents you need, or how the voting process works.`;
  }

  const content = entries
    .map((e) => `**${e.topic}**\n\n${e.content}\n\n*Source: [${e.source}](${e.sourceUrl})*`)
    .join("\n\n---\n\n");

  return content;
}

// ===== INDIA DATA QUICK ACCESS =====
export { indiaElectionData, usaElectionData };
