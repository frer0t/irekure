import { Footer } from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top";
import ThemeProvider from "@/providers/ThemeProvider";
import { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Uburyo bwo Gutega Amatwi Abaturage - irekure",
  description:
    "Urubuga rugenewe abaturage kugira ngo batange ibitekerezo kandi bakurikirane ibisubizo bya Leta",
  generator: "irekure Platform",
  applicationName: "irekure",
  referrer: "origin-when-cross-origin",
  keywords: [
    "irekure",
    "Rwanda",
    "citizen feedback",
    "government",
    "public service",
  ],
  authors: [{ name: "Frérot Ntwali" }],
  creator: "Frérot Ntwali",
  publisher: "Frérot Ntwali",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "rw_RW",
    siteName: "irekure",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@frer0t",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="rw" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        style={{ colorScheme: "light" }}
        suppressHydrationWarning
      >
        <NextTopLoader
          showSpinner={false}
          height={4}
          color="green"
          shadow={false}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex-grow pt-16">{children}</div>
            <Footer />
            <ScrollToTopButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
