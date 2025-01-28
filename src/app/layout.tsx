import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Inter, M_PLUS_Rounded_1c, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

const mPlus = M_PLUS_Rounded_1c({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-mplus",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="scroll-pt-[3.8rem]" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${notoSansJP.variable} ${mPlus.variable} min-h-screen flex flex-col bg-background`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
