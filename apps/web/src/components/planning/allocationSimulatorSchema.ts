import { z } from "zod";

export const allocationSimulatorSchema = z.object({
  initialAmount: z.number().min(0).max(10000000),
  monthlyContribution: z.number().min(0).max(100000),
  years: z.number().min(1).max(60),
  stabilityAllocationPct: z.number().min(0).max(100),
  stabilityReturnPct: z.number().min(0).max(20),
  growthReturnPct: z.number().min(0).max(25),
  contributionIncreasePct: z.number().min(0).max(10)
});

export type AllocationSimulatorValues = z.infer<
  typeof allocationSimulatorSchema
>;
