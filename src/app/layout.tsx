import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "webdrive/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebDrive Showcase — Next.js LTS + shadcn/ui",
  description:
    "Production-ready example application demonstrating WebDrive UI tour library with Next.js App Router and shadcn/ui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
