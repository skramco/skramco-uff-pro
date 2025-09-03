import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PasswordGate } from "@/components/password-gate"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "United Fidelity Funding Corp - Wholesale Mortgage Lender",
  description:
    "Partner with UFF for competitive rates, fast closings, and comprehensive loan solutions. Access our PRO Portal for seamless loan management.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PasswordGate>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
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
                      </div>
                    </div>
                    <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors">
                      Contact
                    </Link>
                    <Button asChild className="bg-red-600 hover:bg-red-700">
                      <Link href="/get-approved">Get Approved</Link>
                    </Button>
                  </nav>

                  {/* Mobile menu button */}
                  <div className="lg:hidden">
                    <Button asChild size="sm" className="bg-red-600 hover:bg-red-700">
                      <Link href="/get-approved">Get Approved</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div>
                    <div className="mb-6">
                      <Image
                        src="/images/uff-logo.png"
                        alt="United Fidelity Funding Corp"
                        width={200}
                        height={45}
                        className="h-12 w-auto"
                      />
                    </div>
                    <p className="text-gray-400 mb-6">
                      Your trusted wholesale mortgage lending partner, providing competitive rates, fast closings, and
                      exceptional service to mortgage brokers nationwide.
                    </p>
                    <div className="space-y-3 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>(855) 95-EAGLE</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>support@uff.loans</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>
                          1300 NW Briarcliff Pkwy #275
                          <br />
                          Kansas City, MO 64116
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Loan Products</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>
                        <Link href="/loan-products" className="hover:text-white transition-colors">
                          Conventional Loans
                        </Link>
                      </li>
                      <li>
                        <Link href="/loan-products" className="hover:text-white transition-colors">
                          FHA Loans
                        </Link>
                      </li>
                      <li>
                        <Link href="/loan-products" className="hover:text-white transition-colors">
                          VA Loans
                        </Link>
                      </li>
                      <li>
                        <Link href="/loan-products" className="hover:text-white transition-colors">
                          USDA Loans
                        </Link>
                      </li>
                      <li>
                        <Link href="/loan-products" className="hover:text-white transition-colors">
                          Non-QM Loans
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Company</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>
                        <Link href="/about" className="hover:text-white transition-colors">
                          About UFF
                        </Link>
                      </li>
                      <li>
                        <Link href="/licensing" className="hover:text-white transition-colors">
                          Licensing
                        </Link>
                      </li>
                      <li>
                        <Link href="/resources" className="hover:text-white transition-colors">
                          Resources
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="hover:text-white transition-colors">
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/pro-portal" className="hover:text-white transition-colors">
                          PRO Portal
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Get Started</h3>
                    <p className="text-gray-400 mb-4">
                      Ready to partner with UFF? Get approved today and start accessing our competitive rates and PRO
                      Portal technology.
                    </p>
                    <Button asChild className="bg-red-600 hover:bg-red-700 w-full mb-4">
                      <Link href="/get-approved">Apply Now</Link>
                    </Button>
                    <p className="text-xs text-gray-500">NMLS ID: 1234567 | Equal Housing Lender</p>
                  </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="text-gray-400 text-sm">
                      © 2025 United Fidelity Funding Corp. All rights reserved.
                    </div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                      <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                        Privacy Policy
                      </Link>
                      <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                        Terms of Service
                      </Link>
                      <Link href="/licensing" className="text-gray-400 hover:text-white text-sm transition-colors">
                        NMLS Consumer Access
                      </Link>
                    </div>
                  </div>

                  {/* NMLS and Regulatory Compliance */}
                  <div className="text-center mb-4">
                    <p className="text-gray-400 text-sm font-semibold">NMLS ID: #34381 | Equal Housing Lender</p>
                  </div>

                  {/* Comprehensive Regulatory Compliance Language */}
                  <div className="text-xs text-gray-500 leading-relaxed space-y-2">
                    <p className="text-center">
                      <strong>United Fidelity Funding Corp</strong> is licensed as a mortgage lender/broker in multiple
                      states. Not all products and services are available in all states. Credit and collateral are
                      subject to approval. Terms and conditions apply. Programs, rates, terms and conditions are subject
                      to change without notice.
                    </p>

                    <p className="text-center">
                      <strong>State Licensing Information:</strong> Licensed by the Alabama State Banking Department |
                      Arizona Department of Financial Institutions | Arkansas Securities Department | California
                      Department of Financial Protection and Innovation under the California Financing Law | Colorado
                      Division of Real Estate | Florida Office of Financial Regulation | Georgia Department of Banking
                      and Finance | Idaho Department of Finance | Illinois Department of Financial and Professional
                      Regulation | Indiana Department of Financial Institutions | Iowa Division of Banking | Kansas
                      Office of the State Bank Commissioner | Kentucky Department of Financial Institutions | Louisiana
                      Office of Financial Institutions | Maine Bureau of Consumer Credit Protection | Maryland
                      Commissioner of Financial Regulation | Massachusetts Division of Banks | Michigan Department of
                      Insurance and Financial Services | Minnesota Department of Commerce | Mississippi Department of
                      Banking and Consumer Finance | Missouri Division of Finance | Nebraska Department of Banking and
                      Finance | Nevada Division of Mortgage Lending | New Hampshire Banking Department | New Jersey
                      Department of Banking and Insurance | New Mexico Regulation and Licensing Department | North
                      Carolina Commissioner of Banks | North Dakota Department of Financial Institutions | Ohio Division
                      of Financial Institutions | Oklahoma Department of Consumer Credit | Oregon Division of Financial
                      Regulation | Pennsylvania Department of Banking and Securities | South Carolina Board of Financial
                      Institutions | South Dakota Division of Banking | Tennessee Department of Financial Institutions |
                      Texas Department of Savings and Mortgage Lending | Virginia State Corporation Commission |
                      Washington Department of Financial Institutions | Wisconsin Department of Financial Institutions.
                    </p>

                    <p className="text-center">
                      <strong>Federal Compliance:</strong> This company is an Equal Housing Lender. We do not
                      discriminate on the basis of race, color, religion, national origin, sex, handicap, familial
                      status, or age in the origination of mortgage loans. Complaints may be filed with the Consumer
                      Financial Protection Bureau at consumerfinance.gov or by calling (855) 411-2372.
                    </p>

                    <p className="text-center">
                      <strong>Important Disclosures:</strong> The information provided is for informational purposes
                      only and is not an advertisement for products or services. This is not a commitment to lend. All
                      loans subject to underwriting approval. Restrictions may apply. Interest rates and program terms
                      are subject to change without notice. Other restrictions and limitations may apply.
                    </p>

                    <p className="text-center">
                      <strong>Privacy Notice:</strong> We are committed to protecting your privacy. Information
                      collected may be shared with affiliates and third parties as described in our Privacy Policy. By
                      providing your information, you consent to be contacted regarding mortgage services.
                    </p>

                    <p className="text-center font-semibold">
                      Corporate Headquarters: 1300 NW Briarcliff Pkwy #275, Kansas City, MO 64116 | Phone: (855)
                      95-EAGLE | NMLS ID: #34381
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </PasswordGate>
      </body>
    </html>
  )
}
