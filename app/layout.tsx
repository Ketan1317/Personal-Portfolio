import type { Metadata } from "next";
import { Space_Grotesk, DM_Mono, Michroma } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { CustomCursor } from "@/components/ui/CustomCursor";

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Ketan Goyal — Full-Stack Developer",
  description:
    "Personal portfolio of Ketan Goyal — CS undergrad at Chitkara University, full-stack developer building real applications across frontend, backend, systems, and cloud infrastructure.",
  keywords: [
    "Ketan Goyal",
    "full-stack developer",
    "computer science",
    "portfolio",
    "React",
    "Next.js",
    "Spring Boot",
  ],
  authors: [{ name: "Ketan Goyal" }],
  creator: "Ketan Goyal",
  openGraph: {
    title: "Ketan Goyal — Full-Stack Developer",
    description:
      "CS undergrad at Chitkara University building real applications across frontend, backend, systems, and cloud infrastructure.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ketan Goyal — Full-Stack Developer",
    description:
      "CS undergrad at Chitkara University building real applications across frontend, backend, systems, and cloud infrastructure.",
    creator: "@KetanGo11864224",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${michroma.variable} ${spaceGrotesk.variable} ${dmMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased bg-bg-base text-text-primary">
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
