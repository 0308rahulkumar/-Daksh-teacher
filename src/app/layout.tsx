import type { Metadata } from "next";
import { Inter, Rubik, Newsreader } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { ThreeCanvas } from "@/components/ThreeCanvas";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Daksh — Class 10 AI Teacher",
  description: "A personal AI teacher for Class 10 board exam preparation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${rubik.variable} ${newsreader.variable}`}>
      <body className="min-h-svh font-sans antialiased relative">
        {/* ThreeUI Interactive 3D Ambient WebGL Background */}
        <ThreeCanvas />

        <div className="relative z-10 flex min-h-svh">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}