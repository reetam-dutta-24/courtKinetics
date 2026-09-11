import { z } from "zod";

export const profileUpdateSchema = z.object({
  name: z.string().min(2).max(50),
  yearsPlaying: z.coerce.number().min(0).max(80),
  skillLevel: z.enum(["beginner", "intermediate", "advanced", "competitive"]),
  playStyle: z.enum(["singles", "doubles", "both"]),
  dominantHand: z.enum(["right", "left"]),
  racquet: z.string().max(100).optional(),
});