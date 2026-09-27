export const COMPANY_TYPE = ["Ecommerce", "Professional services", "Healthcare", "Manufacturing", "Logistics"] as const;
export const REVENUE_BAND = ["<$1M", "$1M-$5M", "$5M-$20M", ">$20M"] as const;
export const EMPLOYEE_BAND = ["1-10", "11-50", "51-200", "200+"] as const;
export const RISK_PROFILE = ["Low", "Medium", "High", "Critical"] as const;

export type InsuranceInput = {
  companyType: (typeof COMPANY_TYPE)[number];
  revenueBand: (typeof REVENUE_BAND)[number];
  employeeBand: (typeof EMPLOYEE_BAND)[number];
  riskProfile: (typeof RISK_PROFILE)[number];
  coverageNeeds: string;
};

export type InsuranceResult = {
  riskScore: number;
  coverageRecommendations: string[];
  coverageGaps: string[];
  quoteCards: Array<{ carrier: string; annualPremium: string; deductible: string; fit: string }>;
  renewalWarnings: string[];
  brokerActionPlan: string[];
  executiveSummary: string;
  modelVersion: string;
};
