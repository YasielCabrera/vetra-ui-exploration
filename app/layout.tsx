import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { TooltipProvider } from "@/modules/shared/components/ui/tooltip"
import { ThemeProvider } from "@/modules/shared/providers/theme-provider"
import { StudioShell } from "@/modules/studio/components/studio-shell"
import { StudioProvider } from "@/modules/studio/providers"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Vetra Studio",
  description:
    "Describe what you want. Own what gets built. AI-ready software on infrastructure that's always yours.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <StudioProvider>
              <StudioShell>{children}</StudioShell>
            </StudioProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
