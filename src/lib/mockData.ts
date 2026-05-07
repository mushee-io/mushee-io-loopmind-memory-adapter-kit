import { MemoryRecord } from "../types/memory";

export const seedMemories: MemoryRecord[] = [
  {
    memoryId: "mem_1",
    agentId: "research-agent",
    agentName: "Research Agent",
    title: "Autonomys Architecture Notes",
    content: "Research Agent saved Autonomys architecture notes. Autonomys uses a permanent distributed storage layer with content-addressed blobs for AI agent memory.",
    tags: ["autonomys", "architecture"],
    timestamp: new Date(Date.now() - 100000).toISOString(),
    hash: "0x8f21...a91c",
    autonomysStorageRef: "auto://loopmind/memory/research-agent/mem_1",
    verificationStatus: "verified"
  },
  {
    memoryId: "mem_2",
    agentId: "governance-agent",
    agentName: "Governance Agent",
    title: "DAO Voting Preferences",
    content: "Governance Agent remembered DAO voting preferences. User prefers proposals with 48-hour discussion periods and on-chain execution.",
    tags: ["governance", "dao"],
    timestamp: new Date(Date.now() - 200000).toISOString(),
    hash: "0x4b3a...7c22",
    autonomysStorageRef: "auto://loopmind/memory/governance-agent/mem_2",
    verificationStatus: "verified"
  },
  {
    memoryId: "mem_3",
    agentId: "depin-agent",
    agentName: "DePIN Agent",
    title: "Mission History",
    content: "DePIN Agent saved mission history for field operators. 3 completed missions in zone 7, 12 active sensor nodes.",
    tags: ["depin", "mission"],
    timestamp: new Date(Date.now() - 300000).toISOString(),
    hash: "0x9d11...f31a",
    autonomysStorageRef: "auto://loopmind/memory/depin-agent/mem_3",
    verificationStatus: "pending"
  },
  {
    memoryId: "mem_4",
    agentId: "grant-agent",
    agentName: "Grant Writing Agent",
    title: "Grant Milestones Checklist",
    content: "Grant Writing Agent saved Subspace feedback checklist. User prefers concise grant milestones with measurable deliverables.",
    tags: ["grant", "checklist"],
    timestamp: new Date(Date.now() - 400000).toISOString(),
    hash: "0x2c44...e89b",
    autonomysStorageRef: "auto://loopmind/memory/grant-agent/mem_4",
    verificationStatus: "verified"
  },
  {
    memoryId: "mem_5",
    agentId: "defi-agent",
    agentName: "DeFi Risk Agent",
    title: "Risk Parameters",
    content: "DeFi Risk Agent saved user risk tolerance: conservative positions, max 5% allocation per protocol, preference for audited contracts.",
    tags: ["defi", "risk"],
    timestamp: new Date(Date.now() - 500000).toISOString(),
    hash: "0x1a88...b45d",
    autonomysStorageRef: "auto://loopmind/memory/defi-agent/mem_5",
    verificationStatus: "unverified"
  }
];

export const MOCK_AI_RESPONSES: Record<string, string[]> = {
  "research-agent": [
    "Autonomys provides permanent distributed storage for AI agent context. Each memory object is content-addressed and retrievable by any authorized agent.",
    "I've analyzed the grant requirements. Key deliverables: decentralized memory SDK, demo app, Autonomys storage integration, and developer documentation.",
    "The architecture uses a hash-based retrieval system. Memory objects are encrypted before storage and can be verified against their content hash."
  ],
  "defi-agent": [
    "Current market conditions suggest elevated volatility. I recommend reducing exposure to unaudited protocols.",
    "Risk analysis complete: your portfolio shows 67% correlation with BTC. Consider diversification into uncorrelated DePIN assets.",
    "Governance proposals in your watched DAOs: 3 active votes, 1 reaching quorum in 18 hours."
  ],
  "governance-agent": [
    "DAO voting summary: Proposal #47 passed with 73% approval. Next vote: treasury allocation review.",
    "Your delegated voting power: 2,400 votes. Upcoming proposals require attention in the next 48 hours.",
    "On-chain governance analysis complete. Quorum requirements met for 2 of 3 active proposals."
  ],
  "depin-agent": [
    "Mission status: 12 active sensor nodes in Zone 7. Last sync: 4 minutes ago.",
    "Field operator report: 3 completed missions, 1 pending review. Coverage area expanded by 15%.",
    "Network health: 94% uptime. 2 nodes require maintenance. Estimated repair window: 6 hours."
  ],
  "grant-agent": [
    "Grant application analysis: Your Autonomys submission scores high on ecosystem value and technical clarity.",
    "Recommended milestone structure: Month 1 - SDK core, Month 2 - Demo app, Month 3 - Documentation + integration guide.",
    "Subspace Foundation criteria checklist: decentralized storage ✓, open-source ✓, AI3.0 focus ✓, measurable milestones ✓"
  ]
};

export const AGENTS = [
  { id: "research-agent", name: "Research Agent" },
  { id: "defi-agent", name: "DeFi Risk Agent" },
  { id: "governance-agent", name: "Governance Agent" },
  { id: "depin-agent", name: "DePIN Mission Agent" },
  { id: "grant-agent", name: "Grant Writing Agent" },
];
