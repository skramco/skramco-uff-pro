import Image from "next/image"
import Link from "next/link"
import {
  COMPANY_ADDRESS_LINES,
  COMPANY_COMPLIANCE_EMAIL,
  COMPANY_PHONE,
  COMPANY_SUPPORT_EMAIL,
  CFPB_URL,
  FOOTER_LEGAL,
  LICENSED_STATE_ABBREVS,
  NMLS_COMPANY_RECORD_URL,
  NMLS_CONSUMER_ACCESS_URL,
  NMLS_ID,
  PROFESSIONAL_USE_NOTICE,
  TEXAS_SML_URL,
} from "@/content/disclosures"
import { PRO_PORTAL_LOGIN_URL, PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

type DisclosureFooterProps = {
  showNonQmIncomeAnalysis: boolean
}

function FooterNavLink({ link }: { link: FooterLink }) {
  const className = "hover:text-ink duration-150"
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label}
      </a>
    )
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  )
}

function EqualHousingMark() {
  return (
    <Image
      src="/images/equal-housing-opportunity.png"
      alt="Equal Housing Opportunity"
      width={48}
      height={51}
      className="h-12 w-auto shrink-0"
    />
  )
}

export function DisclosureFooter({ showNonQmIncomeAnalysis }: DisclosureFooterProps) {
  const columns: { heading: string; links: FooterLink[] }[] = [
    {
      heading: "Platform",
      links: [
        { label: "PRO Portal", href: "/pro-portal" },
        { label: "Piper", href: "/piper" },
        { label: "Price a loan", href: PRO_PORTAL_LOGIN_URL, external: true },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Products", href: "/products" },
        { label: "Industry news", href: "/industry-news" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { label: "Resources", href: "/resources" },
        { label: "Non-QM cheat sheet", href: "/resources/cheat-sheets/non-qm" },
        { label: "DSCR cheat sheet", href: "/resources/cheat-sheets/dscr" },
        { label: "Contact", href: "/contact" },
        ...(showNonQmIncomeAnalysis
          ? [{ label: "Non-QM Income Analysis", href: "/non-qm-income-analysis" }]
          : []),
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Licensing", href: "/licensing" },
        { label: "NMLS Consumer Access", href: NMLS_CONSUMER_ACCESS_URL, external: true },
      ],
    },
  ]

  return (
    <footer className="site-footer border-t border-hairline bg-surface-raised py-10 text-ink">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <Image
              src="/images/uff-logo.png"
              alt="United Fidelity Funding Corp"
              width={200}
              height={45}
              className="mb-4 h-10 w-auto"
            />
            <p className="mb-3 text-sm font-semibold text-ink">NMLS #{NMLS_ID}</p>
            <div className="space-y-1 text-sm text-ink-muted">
              <p>
                <a href={`tel:8559532453`} className="hover:text-ink duration-150">
                  {COMPANY_PHONE}
                </a>
              </p>
              <p>
                <a href={`mailto:${COMPANY_SUPPORT_EMAIL}`} className="hover:text-ink duration-150">
                  {COMPANY_SUPPORT_EMAIL}
                </a>
              </p>
              <p>
                {COMPANY_ADDRESS_LINES[0]}
                <br />
                {COMPANY_ADDRESS_LINES[1]}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={PRO_PORTAL_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-[13px] font-semibold text-white duration-150 hover:bg-accent-dark"
              >
                Create your account
              </a>
              <a
                href={PRO_PORTAL_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-hairline bg-surface-raised px-4 py-2 text-[13px] font-semibold text-ink duration-150 hover:bg-muted"
              >
                Log in
              </a>
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <p className="caption mb-3">{column.heading}</p>
              <ul className="space-y-2 text-sm text-ink-muted">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-4 border-t border-hairline pt-8">
          <EqualHousingMark />
          <div>
            <p className="text-sm font-semibold">Equal Housing Lender</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">{FOOTER_LEGAL.equalHousing}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-xs leading-relaxed text-ink-muted">
          <p>{PROFESSIONAL_USE_NOTICE}</p>
          <p>
            <span className="font-semibold text-ink">Corporate Information: </span>
            {FOOTER_LEGAL.corporate} For licensing information, go to{" "}
            <a
              href={NMLS_COMPANY_RECORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-2 hover:text-accent"
            >
              www.nmlsconsumeraccess.org
            </a>
            .
          </p>
          <p>
            <span className="font-semibold text-ink">Important Disclosures: </span>
            {FOOTER_LEGAL.important}
          </p>
          <p>
            <span className="font-semibold text-ink">Consumer Protection: </span>
            {FOOTER_LEGAL.consumerProtection}
          </p>

          <p className="pt-2 font-semibold text-ink">State-Specific Disclosures</p>
          <p>
            <span className="font-semibold text-ink">California: </span>
            {FOOTER_LEGAL.california}
          </p>
          <p>
            <span className="font-semibold text-ink">Colorado: </span>
            {FOOTER_LEGAL.colorado}
          </p>
          <p>
            <span className="font-semibold text-ink">Georgia: </span>
            {FOOTER_LEGAL.georgia}
          </p>
          <p>
            <span className="font-semibold text-ink">Illinois: </span>
            {FOOTER_LEGAL.illinois} For licensing information, go to{" "}
            <a
              href={NMLS_CONSUMER_ACCESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-2 hover:text-accent"
            >
              www.nmlsconsumeraccess.org
            </a>
            .
          </p>
          <p>
            <span className="font-semibold text-ink">Kansas: </span>
            {FOOTER_LEGAL.kansas}
          </p>
          <div className="space-y-2">
            <p>
              <span className="font-semibold text-ink">Texas: </span>
              {FOOTER_LEGAL.texasCompany}
            </p>
            <p className="uppercase">
              CONSUMERS WISHING TO FILE A COMPLAINT AGAINST A COMPANY OR A RESIDENTIAL MORTGAGE LOAN ORIGINATOR SHOULD
              COMPLETE AND SEND A COMPLAINT FORM TO THE TEXAS DEPARTMENT OF SAVINGS AND MORTGAGE LENDING, 2601 NORTH
              LAMAR, SUITE 201, AUSTIN, TEXAS 78705. COMPLAINT FORMS AND INSTRUCTIONS MAY BE OBTAINED FROM THE
              DEPARTMENT&apos;S WEBSITE AT{" "}
              <a
                href={TEXAS_SML_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-2 hover:text-accent"
              >
                WWW.SML.TEXAS.GOV
              </a>
              . A TOLL-FREE CONSUMER HOTLINE IS AVAILABLE AT 1-877-276-5550.
            </p>
            <p className="uppercase">
              THE DEPARTMENT MAINTAINS A RECOVERY FUND TO MAKE PAYMENTS OF CERTAIN ACTUAL OUT OF POCKET DAMAGES
              SUSTAINED BY BORROWERS CAUSED BY ACTS OF LICENSED RESIDENTIAL MORTGAGE LOAN ORIGINATORS. A WRITTEN
              APPLICATION FOR REIMBURSEMENT FROM THE RECOVERY FUND MUST BE FILED WITH AND INVESTIGATED BY THE
              DEPARTMENT PRIOR TO THE PAYMENT OF A CLAIM. FOR MORE INFORMATION ABOUT THE RECOVERY FUND, PLEASE CONSULT
              THE DEPARTMENT&apos;S WEBSITE AT{" "}
              <a
                href={TEXAS_SML_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-2 hover:text-accent"
              >
                WWW.SML.TEXAS.GOV
              </a>
              .
            </p>
          </div>
          <p>
            <span className="font-semibold text-ink">Washington: </span>
            {FOOTER_LEGAL.washington}
          </p>
          <p>
            <span className="font-semibold text-ink">State Licensing (39 states): </span>
            United Fidelity Funding Corp., NMLS #{NMLS_ID}, is licensed in the following states:{" "}
            {LICENSED_STATE_ABBREVS}. Full license numbers and regulators are on{" "}
            <Link href="/licensing" className="text-ink underline underline-offset-2 hover:text-accent">
              Licensing
            </Link>{" "}
            and{" "}
            <a
              href={NMLS_COMPANY_RECORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-2 hover:text-accent"
            >
              NMLS Consumer Access
            </a>
            .
          </p>
          <p>
            <span className="font-semibold text-ink">Consumer Complaints: </span>
            If you have a complaint, first contact United Fidelity Funding Corp. at {COMPANY_PHONE} or{" "}
            <a
              href={`mailto:${COMPANY_COMPLIANCE_EMAIL}`}
              className="text-ink underline underline-offset-2 hover:text-accent"
            >
              {COMPANY_COMPLIANCE_EMAIL}
            </a>
            . You may also contact the Consumer Financial Protection Bureau at{" "}
            <a
              href={CFPB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-2 hover:text-accent"
            >
              www.consumerfinance.gov
            </a>{" "}
            or (855) 411-2372, or your state&apos;s regulatory agency.
          </p>
        </div>

        <div className="mt-8 border-t border-hairline pt-6 text-sm text-ink-muted">
          © {new Date().getFullYear()} United Fidelity Funding Corp. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
