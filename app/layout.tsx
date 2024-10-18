import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Social Bio Generator",
  description: "Create unique, engaging social media bios effortlessly with our AI-powered Bio Generator app. Craft personalized bios for Instagram, Twitter, LinkedIn, and more in seconds. Perfect for influencers, professionals, and anyone looking to stand out online. Start generating now for a stronger online presence.",
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
         <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
      </body>
    </html>
  );
}
