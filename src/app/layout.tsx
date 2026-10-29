import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { Providers } from "@/components/features/providers";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const bebas = Bebas_Neue({ variable: "--font-bebas", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: { default: "Traiflex — Trailers for everything trending", template: "%s · Traiflex" },
  description: "Browse trending movies and TV shows, watch their trailers, and keep a list of what to watch next.",
  applicationName: "Traiflex",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
