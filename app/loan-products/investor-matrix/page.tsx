import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { EligibilityTable } from "@/components/nqm/eligibility-table"
import { GuidelineList } from "@/components/nqm/guideline-list"
import { OverlayCard } from "@/components/nqm/overlay-card"
import { PrintButton } from "@/components/nqm/print-button"
import { ProgramTabs } from "@/components/nqm/program-tabs"
import {
  DSCR_GUIDELINES,
  DSCR_OVERLAYS,
  DSCR_TABLE_NOTE,
  DSCR_TAGS,
  DSCR_TIERS,
  EFFECTIVE_DATE,
  formatDateMdY,
  REVISED_DATE,
  FULL_DOC_GUIDELINES,
  FULL_DOC_OVERLAYS,
  FULL_DOC_TABLE_NOTE,
  FULL_DOC_TAGS,
  FULL_DOC_TIERS,
  PRODUCT_NAME,
} from "@/lib/data/nqm-matrix"
import { PRO_PORTAL_LOGIN_URL } from "@/lib/pro-portal-url"

export const metadata: Metadata = {
  title: `Investor Eligibility Matrix | ${PRODUCT_NAME} | United Fidelity Funding Corp`,
  description:
    "UFF Non-QM Core investor eligibility matrix for DSCR and Full Doc investment property programs — max LTV grids, overlays, and program guidelines for mortgage professionals.",
  openGraph: {
    title: `Investor Eligibility Matrix | ${PRODUCT_NAME} | United Fidelity Funding Corp`,
    description:
      "DSCR and Full Doc investment property programs in one place: max LTV, overlays, and Non-QM Core guidelines.",
    type: "website",
  },
}

export default function InvestorMatrixPage() {
  return (
    <div className="bg-[#F3F3F4] text-[15px] leading-normal text-uff-ink antialiased">
      <div className="border-b-4 border-uff-red bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-3 px-6 py-3 min-[640px]:gap-[22px]">
          <Image
            src="/images/uff-logo.png"
            alt="United Fidelity Funding Corp"
            width={180}
            height={38}
            className="hidden h-[38px] w-auto print:block"
          />
          <span className="hidden h-[34px] w-px bg-[#E3E3E6] print:block" />
          <span className="font-archivo text-xs font-bold uppercase tracking-[0.16em] text-uff-ink">
            Wholesale <span className="text-uff-red">·</span> {PRODUCT_NAME}
          </span>
          <span className="flex-1" />
          <span className="whitespace-nowrap rounded-[2px] border border-[#E3E3E6] px-[11px] py-[7px] font-plex text-[11.5px] tracking-[0.03em] text-[#6B6B71]">
            Effective <b className="font-semibold text-uff-ink">{formatDateMdY(EFFECTIVE_DATE)}</b>
            {` · Rev. ${formatDateMdY(REVISED_DATE)}`}
          </span>
          <PrintButton />
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid grid-cols-1 items-end gap-[30px] pb-5 pt-10 min-[901px]:grid-cols-[1fr_auto]">
          <div>
            <div className="font-plex text-[11px] font-semibold uppercase tracking-[0.18em] text-uff-red">
              Investment Property Lending
            </div>
            <h1 className="mb-3.5 mt-3 font-archivo text-[clamp(32px,5vw,50px)] font-extrabold leading-[1.02] tracking-[-0.025em]">
              Investor Eligibility Matrix
              <br />
              <em className="not-italic text-uff-red">&amp;</em> Program Guidelines
            </h1>
            <p className="m-0 max-w-[62ch] text-[15.5px] text-[#6B6B71]">
              Both UFF {PRODUCT_NAME} paths for investment property in one place: <strong>DSCR</strong> qualification
              on the property&apos;s own rents, and <strong>Full Doc</strong> qualification on borrower income. Pick a
              program, find the max LTV, and read the rules that move it.
            </p>
          </div>
          <Image
            src="/images/uff-icon.png"
            alt=""
            width={108}
            height={66}
            className="mark hidden h-[66px] w-auto opacity-95 min-[901px]:block"
          />
        </div>

        <ProgramTabs dscrPanel={<DscrProgram />} fullPanel={<FullDocProgram />} />

        <div className="mb-7 grid grid-cols-1 items-center gap-6 rounded-[3px] border border-[#E3E3E6] border-l-4 border-l-uff-red bg-white px-[22px] py-5 shadow-[0_1px_2px_rgba(19,19,19,.05),0_8px_22px_rgba(19,19,19,.06)] print:break-inside-avoid print:shadow-none min-[901px]:grid-cols-[1fr_auto]">
          <div>
            <h3 className="mb-1.5 mt-0 font-archivo text-lg font-extrabold tracking-[-0.01em]">
              Run the scenario, not the spreadsheet
            </h3>
            <p className="m-0 max-w-[70ch] text-[13.5px] text-[#6B6B71]">
              Register the loan, price it, and lock it in PRO Portal — and ask Piper when a scenario sits between two
              boxes.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-[22px]">
            <Link href={PRO_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer">
              <Image src="/images/pro-portal.png" alt="PRO Portal" width={244} height={48} className="h-[26px] w-auto" />
            </Link>
            <Image src="/images/piper.png" alt="Piper" width={125} height={48} className="h-[26px] w-auto" />
          </div>
        </div>
      </div>

      <footer className="nqm-disclosures hidden border-t-4 border-uff-red bg-uff-ink text-[#9C9CA3] print:block">
        <div className="mx-auto max-w-[1180px] px-6 pb-9 pt-[30px]">
          <Image
            src="/images/uff-logo.png"
            alt="United Fidelity Funding Corp"
            width={180}
            height={34}
            className="nqm-knock mb-4 h-[34px] w-auto brightness-0 invert"
          />
          <div className="mb-[18px] flex flex-wrap gap-[26px] font-plex text-[11.5px] text-[#DEDEE2]">
            <span>NMLS ID #34381</span>
            <span>(855) 95-EAGLE</span>
            <span>support@uff.loans</span>
            <span>1300 NW Briarcliff Pkwy #275, Kansas City, MO 64116</span>
          </div>
          <h4 className="mb-2 mt-0 font-archivo text-[10.5px] uppercase tracking-[0.16em] text-white">Disclosures</h4>
          <p className="mb-2.5 max-w-[104ch] text-[11.5px] leading-[1.65]">
            For mortgage professionals only — not for distribution to consumers. This matrix is a summary of program
            parameters and does not replace the full UFF {PRODUCT_NAME} program guidelines, which govern in the event of
            any conflict. Programs, rates, terms and conditions are subject to change without notice. This is not a
            commitment to lend. All loans are subject to underwriting approval, credit and collateral approval, and
            property eligibility. Not all products are available in all states. Restrictions may apply.
          </p>
          <p className="mb-2.5 max-w-[104ch] text-[11.5px] leading-[1.65]">
            United Fidelity Funding Corp. is an Equal Housing Lender. Source of record: Residential &amp; Investor NQM
            program matrices, effective 07/22/2026. Submit and manage scenarios in{" "}
            <Link href={PRO_PORTAL_LOGIN_URL} className="text-[#FF8C86]">
              PRO Portal
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  )
}

function DscrProgram() {
  return (
    <section className="mb-11 print:break-inside-avoid">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="m-0 font-archivo text-[27px] font-extrabold tracking-[-0.02em]">
          DSCR <i className="text-uff-red">—</i> Investor NQM
        </h2>
        {DSCR_TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#E3E3E6] bg-white px-[11px] py-[5px] font-plex text-[10.5px] uppercase tracking-[0.1em] text-[#6B6B71]"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 items-start gap-[22px] min-[901px]:grid-cols-[1.55fr_1fr]">
        <EligibilityTable variant="dscr" tiers={DSCR_TIERS} note={DSCR_TABLE_NOTE} />
        <OverlayCard data={DSCR_OVERLAYS} />
      </div>
      <GuidelineList blocks={DSCR_GUIDELINES} />
    </section>
  )
}

function FullDocProgram() {
  return (
    <section className="mb-11 print:break-inside-avoid">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="m-0 font-archivo text-[27px] font-extrabold tracking-[-0.02em]">
          Full Doc <i className="text-uff-red">—</i> Residential NQM
        </h2>
        {FULL_DOC_TAGS.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#E3E3E6] bg-white px-[11px] py-[5px] font-plex text-[10.5px] uppercase tracking-[0.1em] text-[#6B6B71]"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 items-start gap-[22px] min-[901px]:grid-cols-[1.55fr_1fr]">
        <EligibilityTable variant="full" tiers={FULL_DOC_TIERS} note={FULL_DOC_TABLE_NOTE} />
        <OverlayCard data={FULL_DOC_OVERLAYS} />
      </div>
      <GuidelineList blocks={FULL_DOC_GUIDELINES} />
    </section>
  )
}
