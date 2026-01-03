import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Audiowide } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const audiowide = Audiowide({ subsets: ["latin"], weight: "400", variable: "--font-audiowide", })
export const metadata: Metadata = {
  title: "Baryogenesis - Portfolio",
  description: "Where ideas evolve into matter. AI Developer, Backend Engineer, System Thinker.",
  generator: "v0.app",
  keywords: ["portfolio", "developer", "AI", "backend", "engineering"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} ${audiowide.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
