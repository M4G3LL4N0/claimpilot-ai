import { z } from "zod";
import { COMPANY_TYPE, EMPLOYEE_BAND, REVENUE_BAND, RISK_PROFILE } from "./types";

export const insuranceSchema = z.object({
  companyType: z.enum(COMPANY_TYPE),
  revenueBand: z.enum(REVENUE_BAND),
  employeeBand: z.enum(EMPLOYEE_BAND),
  riskProfile: z.enum(RISK_PROFILE),
  coverageNeeds: z.string().min(10),
});
