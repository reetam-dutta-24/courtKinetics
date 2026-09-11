"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function saveProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const yearsPlaying = Number(formData.get("yearsPlaying"));
  const skillLevel = String(formData.get("skillLevel"));
  const playStyle = String(formData.get("playStyle"));
  const dominantHand = String(formData.get("dominantHand"));
  const racquet = String(formData.get("racquet") || "");

  await prisma.playerProfile.upsert({
    where: { userId: session.user.id },
    update: { yearsPlaying, skillLevel, playStyle, dominantHand, racquet },
    create: {
      userId: session.user.id,
      yearsPlaying,
      skillLevel,
      playStyle,
      dominantHand,
      racquet,
    },
  });

  redirect("/dashboard");
}