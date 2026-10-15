import type { Metadata } from "next";
import type { ReactNode } from "react";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coople public jobs",
  description: "Browse public job opportunities from Coople.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body><QueryProvider>{children}</QueryProvider></body>
    </html>
  );
}
