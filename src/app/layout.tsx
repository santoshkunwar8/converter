import type { Metadata, Viewport } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { CommandPaletteProvider } from "@/hooks/use-command-palette";
import { CommandPalette } from "@/components/shared/command-palette";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getSearchableIndex } from "@/lib/search";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { organizationJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/shared/json-ld";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free Online Calculators & Unit Converters`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Hundreds of free, fast, and accurate calculators and unit converters for finance, health, education, math, and everyday life.",
  applicationName: SITE_NAME,
  // Favicon/apple-icon are auto-detected from icon.tsx/apple-icon.tsx/favicon.ico.
  // Fill in real IDs here once you register the site with each console:
  // verification: { google: "...", other: { "msvalidate.01": "..." } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const searchIndex = getSearchableIndex();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationJsonLd()} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider delay={200}>
            <CommandPaletteProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CommandPalette tools={searchIndex} />
            </CommandPaletteProvider>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
