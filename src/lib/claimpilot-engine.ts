import {
  BUSINESS_COVERAGE_PROFILES,
  CARRIER_QUOTES,
  RISK_RADAR_AXES,
  type BusinessType,
  type ClaimsHistory,
  type CoverageOption,
  type EmployeeBand,
  type Location,
  type PolicyCategory,
  type RevenueBand,
  type RiskExposure,
} from "./claimpilot-data";

export const ENGINE_VERSION = "claimpilot-cockpit-1.0.0";

export type ClaimPilotInput = {
  businessType: BusinessType;
  revenue: RevenueBand;
  employees: EmployeeBand;
  location: Location;
  currentCoverage: CoverageOption[];
  riskExposure: RiskExposure[];
  assets: string;
  claimsHistory: ClaimsHistory;
  renewalDate: string;
};

export type CoverageGap = {
  policy: CoverageOption;
  severity: "critical" | "moderate" | "watch";
  detail: string;
};

export type QuoteCard = {
  carrier: string;
  annualPremium: string;
  deductible: string;
  fit: string;
  highlight: boolean;
};

export type RenewalMilestone = {
  label: string;
  date: string;
  status: "upcoming" | "due" | "complete";
  detail: string;
};

export type PolicyStackItem = {
  name: CoverageOption;
  status: "active" | "gap" | "review";
  limit: string;
  renewal: string;
};

export type RiskRadarPoint = {
  axis: (typeof RISK_RADAR_AXES)[number];
  score: number;
};

export type ActionItem = {
  id: string;
  label: string;
  done: boolean;
  priority: "high" | "medium" | "low";
};

export type ClaimsReadinessItem = {
  label: string;
  ready: boolean;
  note: string;
};

export type ClaimPilotResult = {
  riskScore: number;
  healthScore: number;
  coverageGaps: CoverageGap[];
  recommendedPolicies: PolicyCategory[];
  quoteCards: QuoteCard[];
  renewalTimeline: RenewalMilestone[];
  brokerSummary: string;
  actionChecklist: ActionItem[];
  policyStack: PolicyStackItem[];
  riskRadar: RiskRadarPoint[];
  claimsReadiness: ClaimsReadinessItem[];
  modelVersion: string;
};

function revenueWeight(revenue: RevenueBand): number {
  const map: Record<RevenueBand, number> = {
    "Under $500K": 6,
    "$500K–$1M": 10,
    "$1M–$5M": 16,
    "$5M–$20M": 22,
    "Over $20M": 28,
  };
  return map[revenue];
}

function employeeWeight(employees: EmployeeBand): number {
  const map: Record<EmployeeBand, number> = {
    "1–5": 5,
    "6–15": 9,
    "16–50": 14,
    "51–200": 20,
    "200+": 26,
  };
  return map[employees];
}

function claimsWeight(history: ClaimsHistory): number {
  const map: Record<ClaimsHistory, number> = {
    "No claims in 5 years": 0,
    "Minor claim in last 3 years": 8,
    "Material claim in last 3 years": 16,
    "Multiple claims in 5 years": 24,
  };
  return map[history];
}

function locationWeight(location: Location): number {
  const map: Record<Location, number> = {
    California: 8,
    "New York": 7,
    Texas: 5,
    Florida: 6,
    Illinois: 5,
    "Other US": 4,
  };
  return map[location];
}

function exposureWeight(exposures: RiskExposure[]): number {
  return Math.min(24, exposures.length * 3);
}

function coverageCompleteness(current: CoverageOption[], businessType: BusinessType): number {
  const profile = BUSINESS_COVERAGE_PROFILES[businessType];
  const needed = [...profile.required, ...profile.recommended];
  const covered = needed.filter((item) => current.includes(item)).length;
  return needed.length === 0 ? 1 : covered / needed.length;
}

function identifyGaps(input: ClaimPilotInput): CoverageGap[] {
  const profile = BUSINESS_COVERAGE_PROFILES[input.businessType];
  const gaps: CoverageGap[] = [];

  for (const policy of profile.required) {
    if (!input.currentCoverage.includes(policy)) {
      gaps.push({
        policy,
        severity: "critical",
        detail: `${policy} is typically required for ${input.businessType.toLowerCase()} operations and is not listed in your current stack.`,
      });
    }
  }

  for (const policy of profile.recommended) {
    if (!input.currentCoverage.includes(policy)) {
      gaps.push({
        policy,
        severity: "moderate",
        detail: `${policy} closes a common renewal objection for businesses at your revenue and headcount.`,
      });
    }
  }

  if (input.riskExposure.includes("Client data / PII") && !input.currentCoverage.includes("Cyber liability")) {
    gaps.push({
      policy: "Cyber liability",
      severity: "critical",
      detail: "Data exposure is listed in your risk profile without matching cyber limits.",
    });
  }

  if (input.riskExposure.includes("Fleet / delivery operations") && !input.currentCoverage.includes("Commercial auto")) {
    gaps.push({
      policy: "Commercial auto",
      severity: "moderate",
      detail: "Fleet exposure usually needs dedicated auto coverage beyond general liability.",
    });
  }

  if (input.assets.length > 20 && !input.currentCoverage.includes("Commercial property")) {
    gaps.push({
      policy: "Commercial property",
      severity: "watch",
      detail: "Asset detail suggests property values that should be validated against current limits.",
    });
  }

  return gaps.slice(0, 8);
}

function buildRecommendedPolicies(input: ClaimPilotInput, gaps: CoverageGap[]): PolicyCategory[] {
  const profile = BUSINESS_COVERAGE_PROFILES[input.businessType];
  const missing = new Set(gaps.map((gap) => gap.policy));

  const categories: PolicyCategory[] = [];

  for (const policy of profile.required) {
    categories.push({
      id: policy,
      name: policy,
      priority: missing.has(policy) ? "critical" : "recommended",
      rationale: missing.has(policy)
        ? "Core line missing from the current policy stack."
        : "Already in place; confirm limits at renewal.",
    });
  }

  for (const policy of profile.recommended) {
    if (categories.some((item) => item.id === policy)) continue;
    categories.push({
      id: policy,
      name: policy,
      priority: missing.has(policy) ? "recommended" : "optional",
      rationale: missing.has(policy)
        ? "Frequently required by contracts, landlords, or lenders in your segment."
        : "Useful buffer coverage for growth-stage renewals.",
    });
  }

  return categories.slice(0, 7);
}

function buildQuoteCards(input: ClaimPilotInput, riskScore: number): QuoteCard[] {
  const base = 12000 + revenueWeight(input.revenue) * 420 + employeeWeight(input.employees) * 180;

  return CARRIER_QUOTES.slice(0, 3).map((quote, index) => {
    const premium = Math.round(base * (0.92 + index * 0.08 + riskScore / 500));
    const deductible = index === 0 ? 7500 : index === 1 ? 10000 : 12500;
    return {
      carrier: quote.carrier,
      annualPremium: `$${premium.toLocaleString("en-US")}`,
      deductible: `$${deductible.toLocaleString("en-US")}`,
      fit:
        quote.tone === "Balanced"
          ? "Balanced limits with responsive claims support"
          : quote.tone === "Value"
            ? "Lower premium with tighter endorsements"
            : "Broader limits for higher operational exposure",
      highlight: index === 0,
    };
  });
}

function parseRenewalDate(renewalDate: string): Date {
  const parsed = new Date(renewalDate);
  return Number.isNaN(parsed.getTime()) ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) : parsed;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function buildRenewalTimeline(renewalDate: string, gaps: CoverageGap[]): RenewalMilestone[] {
  const renewal = parseRenewalDate(renewalDate);
  const milestones: RenewalMilestone[] = [
    {
      label: "Coverage inventory",
      date: formatDate(new Date(renewal.getTime() - 75 * 24 * 60 * 60 * 1000)),
      status: "complete",
      detail: "Collect dec pages, endorsements, and loss runs.",
    },
    {
      label: "Gap remediation plan",
      date: formatDate(new Date(renewal.getTime() - 55 * 24 * 60 * 60 * 1000)),
      status: gaps.length > 2 ? "due" : "upcoming",
      detail: "Prioritize missing lines before marketing to carriers.",
    },
    {
      label: "Quote comparison",
      date: formatDate(new Date(renewal.getTime() - 35 * 24 * 60 * 60 * 1000)),
      status: "upcoming",
      detail: "Compare at least three carrier options with broker notes.",
    },
    {
      label: "Renewal bind",
      date: formatDate(renewal),
      status: "upcoming",
      detail: "Bind coverage before expiration to avoid lapse risk.",
    },
  ];

  return milestones;
}

function buildPolicyStack(input: ClaimPilotInput, gaps: CoverageGap[]): PolicyStackItem[] {
  const gapNames = new Set(gaps.map((gap) => gap.policy));
  const renewal = formatDate(parseRenewalDate(input.renewalDate));

  const stack: PolicyStackItem[] = input.currentCoverage.map((name) => ({
    name,
    status: gapNames.has(name) ? ("review" as const) : ("active" as const),
    limit: gapNames.has(name) ? "Limits need review" : "In force",
    renewal,
  }));

  for (const gap of gaps.slice(0, 3)) {
    if (!stack.some((item) => item.name === gap.policy)) {
      stack.push({
        name: gap.policy,
        status: "gap",
        limit: "Not in force",
        renewal,
      });
    }
  }

  return stack;
}

function buildRiskRadar(input: ClaimPilotInput, riskScore: number): RiskRadarPoint[] {
  const completeness = coverageCompleteness(input.currentCoverage, input.businessType);
  const claims = claimsWeight(input.claimsHistory);
  const exposure = exposureWeight(input.riskExposure);

  const base = riskScore / 100;

  return RISK_RADAR_AXES.map((axis) => {
    let score = Math.round(35 + base * 40);
    if (axis === "Cyber" && input.riskExposure.includes("Client data / PII")) score += 18;
    if (axis === "Property" && input.riskExposure.includes("Physical inventory")) score += 14;
    if (axis === "People" && input.employees !== "1–5") score += 10;
    if (axis === "Operations" && input.riskExposure.includes("Fleet / delivery operations")) score += 12;
    if (axis === "Compliance" && input.businessType === "Healthcare") score += 15;
    score = Math.round(score - completeness * 12 + claims * 0.4 + exposure * 0.3);
    return { axis, score: Math.max(18, Math.min(96, score)) };
  });
}

function buildActionChecklist(gaps: CoverageGap[]): ActionItem[] {
  const items: ActionItem[] = [
    { id: "inventory", label: "Upload current dec pages and endorsements", done: false, priority: "high" },
    { id: "gaps", label: "Resolve critical coverage gaps before renewal marketing", done: gaps.length === 0, priority: "high" },
    { id: "quotes", label: "Request three comparable carrier quotes", done: false, priority: "medium" },
    { id: "broker", label: "Share broker-ready summary with your advisor", done: false, priority: "medium" },
    { id: "claims", label: "Confirm claims reporting workflow with operations", done: false, priority: "low" },
  ];
  return items;
}

function buildClaimsReadiness(input: ClaimPilotInput): ClaimsReadinessItem[] {
  return [
    {
      label: "Incident contact tree documented",
      ready: input.employees !== "200+",
      note: "Operations should know who to call within the first hour.",
    },
    {
      label: "Loss runs available",
      ready: input.claimsHistory === "No claims in 5 years",
      note: "Carriers will ask for five-year loss history at renewal.",
    },
    {
      label: "Policy numbers centralized",
      ready: input.currentCoverage.length >= 3,
      note: "Keep carrier, policy number, and broker contact in one place.",
    },
    {
      label: "Evidence retention process",
      ready: !input.riskExposure.includes("Client data / PII"),
      note: "Photos, contracts, and system logs speed up claim response.",
    },
  ];
}

function buildBrokerSummary(input: ClaimPilotInput, riskScore: number, gaps: CoverageGap[]): string {
  const gapText = gaps.length
    ? `Top gaps: ${gaps
        .slice(0, 3)
        .map((gap) => gap.policy)
        .join(", ")}.`
    : "No critical line gaps detected in the current stack.";

  return `${input.businessType} business in ${input.location} with ${input.employees} employees and ${input.revenue} revenue. Risk score ${riskScore}/100. ${gapText} Renewal target ${formatDate(parseRenewalDate(input.renewalDate))}. Assets and exposure notes: ${input.assets || "Not provided"}.`;
}

export function analyzeCoverageGaps(input: ClaimPilotInput): ClaimPilotResult {
  const completeness = coverageCompleteness(input.currentCoverage, input.businessType);
  const riskScore = Math.max(
    24,
    Math.min(
      98,
      Math.round(
        28 +
          revenueWeight(input.revenue) +
          employeeWeight(input.employees) * 0.65 +
          claimsWeight(input.claimsHistory) +
          locationWeight(input.location) +
          exposureWeight(input.riskExposure) -
          completeness * 18,
      ),
    ),
  );
  const healthScore = Math.max(18, Math.min(94, Math.round(100 - riskScore * 0.55 + completeness * 22)));

  const coverageGaps = identifyGaps(input);
  const recommendedPolicies = buildRecommendedPolicies(input, coverageGaps);
  const quoteCards = buildQuoteCards(input, riskScore);
  const renewalTimeline = buildRenewalTimeline(input.renewalDate, coverageGaps);
  const policyStack = buildPolicyStack(input, coverageGaps);
  const riskRadar = buildRiskRadar(input, riskScore);
  const actionChecklist = buildActionChecklist(coverageGaps);
  const claimsReadiness = buildClaimsReadiness(input);
  const brokerSummary = buildBrokerSummary(input, riskScore, coverageGaps);

  return {
    riskScore,
    healthScore,
    coverageGaps,
    recommendedPolicies,
    quoteCards,
    renewalTimeline,
    brokerSummary,
    actionChecklist,
    policyStack,
    riskRadar,
    claimsReadiness,
    modelVersion: ENGINE_VERSION,
  };
}

export function defaultClaimPilotInput(): ClaimPilotInput {
  const renewal = new Date();
  renewal.setMonth(renewal.getMonth() + 4);

  return {
    businessType: "Professional services",
    revenue: "$1M–$5M",
    employees: "16–50",
    location: "California",
    currentCoverage: ["General liability", "Workers compensation"],
    riskExposure: ["Client data / PII", "Remote workforce"],
    assets: "Office leasehold improvements, laptops, client contracts, and AR aging over $400K.",
    claimsHistory: "No claims in 5 years",
    renewalDate: renewal.toISOString().slice(0, 10),
  };
}
