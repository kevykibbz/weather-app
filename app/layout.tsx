import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Real-time weather updates and forecasts",
  keywords: ["weather", "forecast", "temperature", "weather app", "climate", "weather updates"],
  authors: [{ name: "Kevin Kibebe" }],
  openGraph: {
    type: "website",
    title: "Weather App - Real-time Weather Updates",
    description: "Stay up to date with real-time weather updates and forecasts.",
    url: "http://localhost:3000",
    siteName: "Weather App",
  },
  themeColor: "#00aaff",
  icons: {
    icon: "/favicon.ico", 
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
