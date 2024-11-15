import { EvervaultCard } from "@/components/ui/evervault-card";
import "@coinbase/onchainkit/styles.css";
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

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
  title: "Unipump",
  description: "Unipump",
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
        <Providers >
          {/* <div
            className="absolute inset-0 h-full w-full bg-black bg-[radial-gradient(#ccc_0.5px,transparent_0.5px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_60%,transparent_100%)]"
          ></div> */}
          <EvervaultCard className="w-full max-h-screen h-full overflow-hidden" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
