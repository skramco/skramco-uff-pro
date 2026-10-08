import { Button } from "@/components/ui/button"
import { BlendedIncomeCalculator } from "@/components/blended-income/calculator"
import { DtiGauge } from "@/components/blended-income/dti-gauge"
import { pageMetadata } from "@/lib/seo"
import "./blended-income.css"

export const metadata = pageMetadata({
  title: "Non-QM Core: Blended Income with Asset Depletion | UFF Wholesale",
  description:
    "Combine 12-month bank statement or full-doc income with asset depletion over 36 months on Non-QM Core. Built for mortgage professionals.",
  path: "/non-qm/core/blended-income",
})

const ASSET_ROWS = [
  ["Checking, savings, money market", "100%", "Deposit balances"],
  ["Stocks, bonds, mutual funds", "70%", "Marketable securities"],
  ["Retirement (IRA, 401(k), 403(b))", "70%", "Borrower is under 59½, or date of birth is blank"],
  ["Retirement (IRA, 401(k), 403(b))", "100%", "Borrower is 59½ or older as of today"],
  ["Trust (sole beneficiary)", "100%", "Borrower is the sole beneficiary"],
]

const GUIDELINES = [
  "Documented income on the file switches asset depletion to 36 months. Asset depletion alone stays at 84 months.",
  "Any borrower with monthly qualifying income above zero counts as documented income for the whole loan.",
  "Checking, savings, and money market count at 100%. Stocks, bonds, and mutual funds count at 70%.",
  "Retirement accounts count at 100% once that borrower is 59½. Younger borrowers, and a blank date of birth, count at 70%.",
  "Trust assets count at 100% when that borrower is the sole beneficiary.",
  "Maximum DTI is 50%. Loans that use asset depletion are limited to 80% LTV.",
  "Reserves follow the loan amount: 6 months through $2,000,000, 9 months through $2,500,000, and 12 months through $3,500,000. Interest-only loans reserve against the interest-only payment.",
  "No Ratio is available when eligible assets cover the loan amount, required reserves, and 12 months of total payments. Loan amounts run from $100,000 to $3,500,000.",
]

function calendarDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${date.getFullYear()}-${month}-${day}`
}

export default function BlendedIncomePage() {
  const asOf = calendarDate(new Date())

  return (
    <div className="blended-income">
      <section className="border-b-4 border-[var(--bi-brand)]">
        <div className="container mx-auto grid grid-cols-1 items-start gap-10 px-4 py-12 min-[961px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--bi-brand-text)]">Non-QM Core</p>
            <h1 className="mt-3 max-w-[16ch] text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[var(--bi-ink)]">
              Stack income streams. Bring the DTI back under 50%.
            </h1>
            <p className="mt-4 max-w-[62ch] text-[15.5px] leading-relaxed text-[var(--bi-muted)]">
              Pair 12-month bank statement or full-doc income with asset depletion. On Non-QM Core, those assets are
              divided by 36 months instead of 84, which is how a file sitting over 50% DTI gets back under the line.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href="#calculator">Run the numbers</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#guidelines">See the guidelines</a>
              </Button>
            </div>
          </div>

          <aside className="min-w-0 rounded-md border border-[var(--bi-rule)] bg-[var(--bi-wash)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--bi-muted)]">Sample file</p>
            <dl className="mt-4 grid gap-2 text-sm">
              <ExhibitRow label="Borrower" value="$13,550.25" />
              <ExhibitRow label="Co-borrower" value="$6,500.00" />
              <ExhibitRow label="Asset depletion" value="+$5,809.72" />
              <div className="mt-1 flex items-baseline justify-between gap-4 border-t border-[var(--bi-rule)] pt-2">
                <dt className="font-semibold text-[var(--bi-ink)]">Qualifying income</dt>
                <dd className="bi-nums text-lg font-extrabold">$25,859.97</dd>
              </div>
            </dl>
            <DtiGauge before={0.5287} after={0.4099} animate />
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-[var(--bi-muted)]">DTI without depletion</p>
                <p className="bi-nums text-lg font-semibold text-[var(--bi-brand-text)]">52.87%</p>
              </div>
              <div>
                <p className="text-[var(--bi-muted)]">DTI with depletion</p>
                <p className="bi-nums text-lg font-semibold text-[var(--bi-pass)]">40.99%</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--bi-wash)]">
        <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-12 min-[961px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div className="min-w-0">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-[var(--bi-ink)]">
              The divisor is where the income comes from.
            </h2>
            <p className="mt-3 max-w-[48ch] text-[var(--bi-muted)]">
              Same eligible assets. A shorter term. On the sample file, blending documented income with asset depletion
              produces 2.33× the monthly income of asset depletion alone.
            </p>
          </div>
          <div className="min-w-0">
            <div className="mb-1 flex items-baseline justify-between gap-4 text-sm">
              <span>84-month asset depletion only</span>
              <span className="bi-nums font-semibold">$2,489.88/mo</span>
            </div>
            <div className="h-3 rounded-full bg-[var(--bi-rule)]">
              <div className="h-3 w-[43%] rounded-full bg-[var(--bi-muted)]" />
            </div>
            <div className="mb-1 mt-5 flex items-baseline justify-between gap-4 text-sm">
              <span>36-month blended with other income</span>
              <span className="bi-nums font-semibold">$5,809.72/mo</span>
            </div>
            <div className="h-3 rounded-full bg-[var(--bi-brand)]" />
            <p className="mt-3 text-sm font-extrabold tracking-tight text-[var(--bi-brand-text)]">2.33×</p>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-[var(--bi-ink)]">
            What counts, and at what value
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--bi-rule)] text-xs uppercase tracking-[0.08em] text-[var(--bi-muted)]">
                  <th className="py-2 pr-4 font-semibold">Asset</th>
                  <th className="py-2 pr-4 font-semibold">Counted at</th>
                  <th className="py-2 font-semibold">When</th>
                </tr>
              </thead>
              <tbody>
                {ASSET_ROWS.map(([asset, factor, when]) => (
                  <tr key={`${asset}-${factor}`} className="border-b border-[var(--bi-rule)]">
                    <th className="py-3 pr-4 text-left font-medium text-[var(--bi-ink)]">{asset}</th>
                    <td className="bi-nums py-3 pr-4 font-semibold">{factor}</td>
                    <td className="py-3 text-[var(--bi-muted)]">{when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-24 border-t border-[var(--bi-rule)] bg-[var(--bi-wash)]">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-[var(--bi-ink)]">
            Blended income calculator
          </h2>
          <p className="mt-3 max-w-[68ch] text-[var(--bi-muted)]">
            Prefilled with a sample file. Income type is informational, except None, which clears documented income and
            switches the file to the 84-month term.
          </p>
          <div className="mt-8">
            <BlendedIncomeCalculator asOf={asOf} />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto grid grid-cols-1 items-start gap-8 px-4 py-12 min-[961px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="min-w-0">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-[var(--bi-ink)]">
              When the assets cover everything, skip the income.
            </h2>
            <p className="mt-3 text-[var(--bi-muted)]">
              No Ratio does not use DTI. Eligible assets have to cover the note, the reserves, and a year of payments.
            </p>
          </div>
          <ol className="min-w-0 grid gap-3 text-sm">
            <li className="rounded-md border border-[var(--bi-rule)] bg-[var(--bi-paper)] px-4 py-3">
              Eligible assets cover the full loan amount.
            </li>
            <li className="rounded-md border border-[var(--bi-rule)] bg-[var(--bi-paper)] px-4 py-3">
              Add reserves: the tier months times fully amortized PITIA, or the interest-only payment when the loan is
              interest-only.
            </li>
            <li className="rounded-md border border-[var(--bi-rule)] bg-[var(--bi-paper)] px-4 py-3">
              Add 12 months of total payments (housing payment plus other monthly debts).
            </li>
          </ol>
        </div>
      </section>

      <section id="guidelines" className="scroll-mt-24 bg-[var(--bi-wash)]">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight text-[var(--bi-ink)]">
            Guideline notes
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 min-[961px]:grid-cols-2">
            {GUIDELINES.map((rule) => (
              <li
                key={rule}
                className="min-w-0 rounded-md border border-[var(--bi-rule)] bg-[var(--bi-paper)] px-4 py-3 text-sm leading-relaxed"
              >
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--bi-rule)]">
        <div className="container mx-auto px-4 py-8">
          <p className="max-w-[90ch] text-xs leading-relaxed text-[var(--bi-muted)]">
            United Fidelity Funding Corp., NMLS #34381. For mortgage professionals only. This is not a Regulation Z
            advertisement. Non-QM Core guidelines effective 7/15/2026 and subject to change. This calculator is an
            estimate for scenario planning and is not a commitment to lend. Equal Housing Lender.
          </p>
        </div>
      </section>
    </div>
  )
}

function ExhibitRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-[var(--bi-muted)]">{label}</dt>
      <dd className="bi-nums font-semibold">{value}</dd>
    </div>
  )
}
