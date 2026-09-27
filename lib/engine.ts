import type { InsuranceInput, InsuranceResult } from "./types";

const MODEL_VERSION = "claimpilot-sim-1.0.0";

export function runInsurance(input: InsuranceInput): InsuranceResult {
  const revenueW = input.revenueBand === "<$1M" ? 8 : input.revenueBand === "$1M-$5M" ? 14 : input.revenueBand === "$5M-$20M" ? 20 : 27;
  const employeeW = input.employeeBand === "1-10" ? 6 : input.employeeBand === "11-50" ? 12 : input.employeeBand === "51-200" ? 18 : 24;
  const riskW = input.riskProfile === "Low" ? 5 : input.riskProfile === "Medium" ? 12 : input.riskProfile === "High" ? 22 : 30;

  const riskScore = Math.max(22, Math.min(98, Math.round(24 + revenueW + employeeW * 0.7 + riskW)));

  const coverageRecommendations = [
    "General Liability with third-party injury and property endorsements",
    "Cyber Liability including incident response and data restoration",
    "Errors & Omissions for professional service and contract protection",
    "Employment Practices Liability for team-related claims exposure",
  ];

  const coverageGaps = [
    "Business interruption coverage limits below likely downtime impact",
    "Cyber sublimits may not cover ransomware or legal response fully",
    "Vendor and contractor liability transfer language needs tightening",
  ];

  const quoteCards = [
    { carrier: "Northline Mutual", annualPremium: "$18,400", deductible: "$10,000", fit: "Balanced coverage and claims support" },
    { carrier: "Harbor Shield", annualPremium: "$16,900", deductible: "$15,000", fit: "Lower premium with stricter terms" },
    { carrier: "Atlas Commercial", annualPremium: "$20,100", deductible: "$7,500", fit: "Best fit for higher-risk operations" },
  ];

  const renewalWarnings = [
    "Policy renewal in <90 days; start marketing and remarketing now",
    "Recent claims activity may trigger premium uplift at renewal",
    "Carrier requires updated controls evidence before term extension",
  ];

  const brokerActionPlan = [
    "Finalize coverage hierarchy by critical business risk in 7 days",
    "Launch quote refresh across top 3 carriers this week",
    "Schedule renewal readiness review with finance and operations",
    "Prepare negotiation memo for deductible and cyber riders",
  ];

  const executiveSummary = `ClaimPilot scored current insurance exposure at ${riskScore}/100 and generated policy matches, quote comparisons, renewal warnings, and broker next actions for ${input.companyType}.`;

  return {
    riskScore,
    coverageRecommendations,
    coverageGaps,
    quoteCards,
    renewalWarnings,
    brokerActionPlan,
    executiveSummary,
    modelVersion: MODEL_VERSION,
  };
}
