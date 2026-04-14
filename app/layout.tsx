import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { PaletteProvider } from "@/components/docs/palette-provider";
import { PaletteBootstrap } from "@/components/docs/palette-bootstrap";
import { Toaster } from "@/components/ui/toast";
import { ConfirmRoot } from "@/components/ui/confirm-modal";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hippo-ui — copy-paste React components",
  description: "Copy-paste React components. Tailwind tokens, framer-motion animations, zero dependencies you don't want.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PaletteBootstrap />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PaletteProvider>
            {children}
            <Toaster />
            <ConfirmRoot />
          </PaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
