"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { profileUpdateSchema } from "@/lib/validations/profile";

const prisma = new PrismaClient();

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const parsed = profileUpdateSchema.safeParse({
    name: formData.get("name"),
    yearsPlaying: formData.get("yearsPlaying"),
    skillLevel: formData.get("skillLevel"),
    playStyle: formData.get("playStyle"),
    dominantHand: formData.get("dominantHand"),
    racquet: formData.get("racquet") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, ...profileFields } = parsed.data;

  await prisma.user.update({ where: { id: session.user.id }, data: { name } });
  await prisma.playerProfile.update({ where: { userId: session.user.id }, data: profileFields });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function deleteAccount() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  // Cascading deletes (onDelete: Cascade in schema) handle Account, Session,
  // PlayerProfile, TrainingSession, and Rally rows automatically.
  await prisma.user.delete({ where: { id: session.user.id } });
}