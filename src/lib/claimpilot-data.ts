export const BUSINESS_TYPES = [
  "Retail",
  "Restaurant",
  "Professional services",
  "Healthcare",
  "Manufacturing",
  "Logistics",
  "Technology",
  "Construction",
] as const;

export const REVENUE_BANDS = [
  "Under $500K",
  "$500K–$1M",
  "$1M–$5M",
  "$5M–$20M",
  "Over $20M",
] as const;

export const EMPLOYEE_BANDS = ["1–5", "6–15", "16–50", "51–200", "200+"] as const;

export const LOCATIONS = [
  "California",
  "Texas",
  "New York",
  "Florida",
  "Illinois",
  "Other US",
] as const;

export const COVERAGE_OPTIONS = [
  "General liability",
  "Commercial property",
  "Workers compensation",
  "Cyber liability",
  "Professional liability (E&O)",
  "Commercial auto",
  "Directors & officers",
  "Employment practices (EPLI)",
  "Business interruption",
  "Umbrella / excess",
] as const;

export const RISK_EXPOSURES = [
  "Customer-facing premises",
  "Remote workforce",
  "Client data / PII",
  "Physical inventory",
  "Contractor / vendor reliance",
  "Product liability",
  "Regulatory compliance",
  "Fleet / delivery operations",
] as const;

export const CLAIMS_HISTORY = [
  "No claims in 5 years",
  "Minor claim in last 3 years",
  "Material claim in last 3 years",
  "Multiple claims in 5 years",
] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];
export type RevenueBand = (typeof REVENUE_BANDS)[number];
export type EmployeeBand = (typeof EMPLOYEE_BANDS)[number];
export type Location = (typeof LOCATIONS)[number];
export type CoverageOption = (typeof COVERAGE_OPTIONS)[number];
export type RiskExposure = (typeof RISK_EXPOSURES)[number];
export type ClaimsHistory = (typeof CLAIMS_HISTORY)[number];

export type PolicyCategory = {
  id: string;
  name: string;
  priority: "critical" | "recommended" | "optional";
  rationale: string;
};

export type CoverageNeedProfile = {
  required: CoverageOption[];
  recommended: CoverageOption[];
  optional: CoverageOption[];
};

export const BUSINESS_COVERAGE_PROFILES: Record<BusinessType, CoverageNeedProfile> = {
  Retail: {
    required: ["General liability", "Commercial property", "Workers compensation"],
    recommended: ["Business interruption", "Cyber liability", "Umbrella / excess"],
    optional: ["Employment practices (EPLI)", "Commercial auto"],
  },
  Restaurant: {
    required: ["General liability", "Commercial property", "Workers compensation"],
    recommended: ["Business interruption", "Employment practices (EPLI)", "Umbrella / excess"],
    optional: ["Cyber liability", "Commercial auto"],
  },
  "Professional services": {
    required: ["General liability", "Professional liability (E&O)", "Cyber liability"],
    recommended: ["Employment practices (EPLI)", "Directors & officers", "Umbrella / excess"],
    optional: ["Commercial property", "Business interruption"],
  },
  Healthcare: {
    required: ["General liability", "Professional liability (E&O)", "Cyber liability", "Employment practices (EPLI)"],
    recommended: ["Commercial property", "Directors & officers", "Umbrella / excess"],
    optional: ["Workers compensation", "Business interruption"],
  },
  Manufacturing: {
    required: ["General liability", "Commercial property", "Workers compensation"],
    recommended: ["Business interruption", "Commercial auto", "Umbrella / excess"],
    optional: ["Cyber liability", "Directors & officers"],
  },
  Logistics: {
    required: ["General liability", "Commercial auto", "Workers compensation"],
    recommended: ["Commercial property", "Cyber liability", "Umbrella / excess"],
    optional: ["Employment practices (EPLI)", "Business interruption"],
  },
  Technology: {
    required: ["General liability", "Cyber liability", "Professional liability (E&O)"],
    recommended: ["Directors & officers", "Employment practices (EPLI)", "Umbrella / excess"],
    optional: ["Commercial property", "Business interruption"],
  },
  Construction: {
    required: ["General liability", "Workers compensation", "Commercial auto"],
    recommended: ["Commercial property", "Umbrella / excess", "Employment practices (EPLI)"],
    optional: ["Cyber liability", "Directors & officers"],
  },
};

export const CARRIER_QUOTES = [
  { carrier: "Northline Mutual", tone: "Balanced" },
  { carrier: "Harbor Shield", tone: "Value" },
  { carrier: "Atlas Commercial", tone: "Broad" },
  { carrier: "Summit Specialty", tone: "Specialty" },
] as const;

export const RISK_RADAR_AXES = [
  "Liability",
  "Property",
  "Cyber",
  "People",
  "Operations",
  "Compliance",
] as const;
