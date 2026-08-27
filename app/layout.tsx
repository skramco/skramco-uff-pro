import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { isNonQmIncomeAnalysisEnabled } from "@/lib/feature-flags"
import {
  COMPANY_ADDRESS_LINES,
  COMPANY_PHONE,
  NMLS_ID,
  PROFESSIONAL_USE_NOTICE,
} from "@/content/disclosures"
import { pageMetadata } from "@/lib/seo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Wholesale Mortgage Lending for Brokers | United Fidelity Funding",
    description:
      "Wholesale mortgage lending for brokers: self-sign up, price scenarios, and register loans in PRO Portal. United Fidelity Funding Corp, NMLS 34381.",
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
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* Header */}
          <header className="site-header bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="bg-gray-900 text-gray-300 text-[11px] sm:text-xs text-center py-1.5 px-4 tracking-wide">
              {PROFESSIONAL_USE_NOTICE}
            </div>
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center space-x-3">
                  <Image
                    src="/images/uff-logo.png"
                    alt="United Fidelity Funding Corp"
                    width={180}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>

                <nav className="hidden lg:flex items-center space-x-8">
                  <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
                    Home
                  </Link>
                  <Link href="/about" className="text-gray-700 hover:text-red-600 transition-colors">
                    About
                  </Link>
                  <Link href="/loan-products" className="text-gray-700 hover:text-red-600 transition-colors">
                    Loan Products
                  </Link>
                  <Link href="/pro-portal" className="text-gray-700 hover:text-red-600 transition-colors">
                    PRO Portal
                  </Link>
                  <div className="relative group">
                    <button className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-1">
                      Resources
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <Link
                        href="/resources"
                        className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        Resource Library
                      </Link>
                      <Link
                        href="/licensing"
                        className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        Licensing
                      </Link>
                      {showNonQmIncomeAnalysis ? (
                        <Link
                          href="/non-qm-income-analysis"
                          className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          Non-QM Income Analysis
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">
                    Contact
                  </Link>
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white hover:text-white">
                    <Link href="/get-approved">Get Approved</Link>
                  </Button>
                </nav>

                {/* Mobile menu button */}
                <div className="lg:hidden">
                  <Button asChild size="sm" className="bg-red-600 hover:bg-red-700 text-white hover:text-white">
                    <Link href="/get-approved">Get Approved</Link>
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <main>{children}</main>

          <footer className="site-footer bg-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <Image
                    src="/images/uff-logo.png"
                    alt="United Fidelity Funding Corp"
                    width={200}
                    height={45}
                    className="h-10 w-auto mb-4"
                  />
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{COMPANY_PHONE}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>support@uff.loans</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>
                        {COMPANY_ADDRESS_LINES[0]}
                        <br />
                        {COMPANY_ADDRESS_LINES[1]}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Company</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li>
                      <Link href="/loan-products" className="hover:text-white transition-colors">
                        Loan Products
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="hover:text-white transition-colors">
                        About UFF
                      </Link>
                    </li>
                    <li>
                      <Link href="/resources" className="hover:text-white transition-colors">
                        Resources
                      </Link>
                    </li>
                    {showNonQmIncomeAnalysis ? (
                      <li>
                        <Link href="/non-qm-income-analysis" className="hover:text-white transition-colors">
                          Non-QM Income Analysis
                        </Link>
                      </li>
                    ) : null}
                    <li>
                      <Link href="/contact" className="hover:text-white transition-colors">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/pro-portal" className="hover:text-white transition-colors">
                        PRO Portal
                      </Link>
                    </li>
                    <li>
                      <Link href="/get-approved" className="hover:text-white transition-colors">
                        Get Approved
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="text-sm text-gray-400 space-y-3">
                  <p className="font-semibold text-white">NMLS ID: #{NMLS_ID} | Equal Housing Lender</p>
                  <p>{PROFESSIONAL_USE_NOTICE}</p>
                  <p>
                    <Link href="/licensing" className="text-white underline underline-offset-2 hover:text-red-300">
                      Licensing &amp; full disclosures
                    </Link>
                  </p>
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white hover:text-white">
                    <Link href="/get-approved">Apply Now</Link>
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-8 pt-6 text-gray-500 text-sm">
                © 2026 United Fidelity Funding Corp. All rights reserved.
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
