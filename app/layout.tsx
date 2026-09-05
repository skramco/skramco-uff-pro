import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { isNonQmIncomeAnalysisEnabled } from "@/lib/feature-flags"
import { pageMetadata } from "@/lib/seo"
import { UtilityBar } from "@/components/utility-bar"
import { DisclosureFooter } from "@/components/disclosure-footer"
import { PRO_PORTAL_LOGIN_URL, PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Wholesale Mortgage Lending for Brokers | United Fidelity Funding",
    description:
      "Wholesale mortgage lending for mortgage brokers. Self-sign up for PRO Portal and run the file from origination to funded. United Fidelity Funding Corp, NMLS 34381.",
    path: "/",
  }),
  metadataBase: new URL("https://uff.pro"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const showNonQmIncomeAnalysis = isNonQmIncomeAnalysisEnabled()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${sans.className} bg-surface text-ink`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="sticky top-0 z-50">
            <UtilityBar />
            <header className="site-header border-b border-hairline bg-surface-raised">
              <div className="container mx-auto px-4">
                <div className="flex h-14 items-center justify-between">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/images/uff-logo.png"
                      alt="United Fidelity Funding Corp"
                      width={180}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </Link>

                  <nav className="hidden items-center gap-6 text-sm lg:flex">
                    <Link href="/" className="text-ink-muted duration-150 hover:text-ink">
                      Home
                    </Link>
                    <Link href="/products" className="text-ink-muted duration-150 hover:text-ink">
                      Products
                    </Link>
                    <Link href="/pro-portal" className="text-ink-muted duration-150 hover:text-ink">
                      PRO Portal
                    </Link>
                    <Link href="/piper" className="text-ink-muted duration-150 hover:text-ink">
                      Piper
                    </Link>
                    <div className="relative group">
                      <button className="flex items-center gap-1 text-ink-muted duration-150 hover:text-ink">
                        Resources
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div className="invisible absolute left-0 top-full z-50 mt-1 w-64 rounded-md border border-hairline bg-surface-raised opacity-0 duration-150 group-hover:visible group-hover:opacity-100">
                        <Link
                          href="/resources"
                          className="block px-4 py-2 text-ink-muted duration-150 hover:bg-muted hover:text-ink"
                        >
                          Resource library
                        </Link>
                        <Link
                          href="/industry-news"
                          className="block px-4 py-2 text-ink-muted duration-150 hover:bg-muted hover:text-ink"
                        >
                          Industry news
                        </Link>
                        <Link
                          href="/licensing"
                          className="block px-4 py-2 text-ink-muted duration-150 hover:bg-muted hover:text-ink"
                        >
                          Licensing
                        </Link>
                        {showNonQmIncomeAnalysis ? (
                          <Link
                            href="/non-qm-income-analysis"
                            className="block px-4 py-2 text-ink-muted duration-150 hover:bg-muted hover:text-ink"
                          >
                            Non-QM Income Analysis
                          </Link>
                        ) : null}
                        <div className="mt-1 border-t border-hairline pt-1">
                          <p className="px-4 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                            Cheat Sheets
                          </p>
                          <Link
                            href="/resources/cheat-sheets/non-qm"
                            className="block px-4 py-2 text-ink-muted duration-150 hover:bg-muted hover:text-ink"
                          >
                            Non-QM
                          </Link>
                          <Link
                            href="/resources/cheat-sheets/dscr"
                            className="block px-4 py-2 text-ink-muted duration-150 hover:bg-muted hover:text-ink"
                          >
                            DSCR
                          </Link>
                        </div>
                      </div>
                    </div>
                    <Link href="/contact" className="text-ink-muted duration-150 hover:text-ink">
                      Contact
                    </Link>
                    <Button asChild variant="outline">
                      <a href={PRO_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                        Log in
                      </a>
                    </Button>
                    <Button asChild>
                      <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                        Create your account
                      </a>
                    </Button>
                  </nav>

                  <div className="flex items-center gap-2 lg:hidden">
                    <Button asChild size="sm" variant="outline">
                      <a href={PRO_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                        Log in
                      </a>
                    </Button>
                    <Button asChild size="sm">
                      <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                        Create your account
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </header>
          </div>

          <main>{children}</main>

          <DisclosureFooter showNonQmIncomeAnalysis={showNonQmIncomeAnalysis} />
        </ThemeProvider>
      </body>
    </html>
  )
}
