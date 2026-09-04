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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Intercept and silence third-party browser extension errors (e.g. MetaMask / Wallet extensions)
              if (typeof window !== 'undefined') {
                window.addEventListener('unhandledrejection', function(event) {
                  var reason = event.reason;
                  var msg = (reason && (reason.message || String(reason))) || '';
                  var stack = (reason && reason.stack) || '';
                  if (
                    msg.includes('MetaMask') ||
                    msg.includes('failed to connect') ||
                    stack.includes('chrome-extension://') ||
                    stack.includes('moz-extension://')
                  ) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                  }
                }, true);

                window.addEventListener('error', function(event) {
                  var msg = event.message || '';
                  var file = event.filename || '';
                  if (
                    msg.includes('MetaMask') ||
                    file.includes('chrome-extension://') ||
                    file.includes('moz-extension://')
                  ) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                  }
                }, true);
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
