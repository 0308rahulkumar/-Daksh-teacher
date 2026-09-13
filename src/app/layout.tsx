import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Daksh — Class 10 AI Teacher",
  description: "A personal AI teacher for Class 10 board exam preparation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={rubik.variable}>
      <body className="min-h-svh font-sans antialiased">
        <div className="flex min-h-svh">
          <Sidebar />
          <div className="flex-1 min-w-0">
            <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}