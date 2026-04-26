import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abdul Rehman - Mechanical Engineering Student",
  description:
    "Abdul Rehman is a Mechanical Engineering student focused on CAD, SolidWorks, ANSYS, thermodynamics, and practical design projects.",
  keywords: "Abdul Rehman, Mechanical Engineering Student, CAD, SolidWorks, ANSYS, Thermodynamics, Design",
  authors: [{ name: "Abdul Rehman" }],
  creator: "Abdul Rehman",
  openGraph: {
    title: "Abdul Rehman - Mechanical Engineering Student",
    description: "Mechanical Engineering student focused on CAD, design, analysis, and practical engineering projects.",
    url: "https://your-domain.com",
    siteName: "Abdul Rehman Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Rehman - Mechanical Engineering Student",
    description: "Mechanical Engineering student focused on CAD, design, analysis, and practical engineering projects.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
