import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://courtkinetics.vercel.app"), // update once deployed
  title: {
    default: "CourtKinetics — AI Badminton Performance Analysis",
    template: "%s | CourtKinetics",
  },
  description:
    "Pose-estimation computer vision system that analyzes badminton performance from a single phone camera — measures anticipation and reaction timing, detects unforced-error patterns, and evaluates doubles court positioning. Built with MediaPipe, FastAPI, and Next.js as a hypothesis-driven research project.",
  keywords: [
    "badminton analytics",
    "pose estimation",
    "computer vision",
    "sports performance analysis",
    "MediaPipe",
    "anticipation timing",
    "badminton training",
  ],
  authors: [{ name: "Reetam Dutta" }],
  openGraph: {
    title: "CourtKinetics — AI Badminton Performance Analysis",
    description:
      "Measures anticipation timing, unforced errors, and doubles positioning from a single phone camera using pose estimation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CourtKinetics — AI Badminton Performance Analysis",
    description:
      "Pose-estimation performance analysis for badminton, built with MediaPipe, FastAPI, and Next.js.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const THEMES = [
  "court-cyan",
  "match-point",
  "china-masters",
  "nightshade",
  "stealth",
  "daylight",
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="data-theme"
          themes={THEMES}
          defaultTheme="court-cyan"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}