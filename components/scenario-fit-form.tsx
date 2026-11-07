"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { COMPANY_PHONE } from "@/content/disclosures"

type ScenarioFitFormProps = {
  productName: string
  productSlug: string
}

export function ScenarioFitForm({ productName, productSlug }: ScenarioFitFormProps) {
  const router = useRouter()
  const [loanAmount, setLoanAmount] = useState("")
  const [fico, setFico] = useState("")
  const [ltv, setLtv] = useState("")
  const [occupancy, setOccupancy] = useState("Primary")

  const query = useMemo(() => {
    const params = new URLSearchParams({
      topic: "scenario",
      product: productSlug,
      productName,
      loanAmount,
      fico,
      ltv,
      occupancy,
    })
    return params.toString()
  }, [fico, loanAmount, ltv, occupancy, productName, productSlug])

  return (
    <form
      className="panel p-5"
      onSubmit={(event) => {
        event.preventDefault()
        router.push(`/contact?${query}`)
      }}
    >
      <h2 className="text-lg font-semibold tracking-tight">Does this scenario fit?</h2>
      <p className="prose-body mt-2 text-sm">
        Send it to the Kansas City desk. You can also call {COMPANY_PHONE}.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${productSlug}-amount`}>Loan amount</Label>
          <Input
            id={`${productSlug}-amount`}
            inputMode="numeric"
            value={loanAmount}
            onChange={(event) => setLoanAmount(event.target.value)}
            placeholder="450000"
            className="mt-1 font-data"
          />
        </div>
        <div>
          <Label htmlFor={`${productSlug}-fico`}>FICO</Label>
          <Input
            id={`${productSlug}-fico`}
            inputMode="numeric"
            value={fico}
            onChange={(event) => setFico(event.target.value)}
            placeholder="720"
            className="mt-1 font-data"
          />
        </div>
        <div>
          <Label htmlFor={`${productSlug}-ltv`}>LTV</Label>
          <Input
            id={`${productSlug}-ltv`}
            inputMode="numeric"
            value={ltv}
            onChange={(event) => setLtv(event.target.value)}
            placeholder="80"
            className="mt-1 font-data"
          />
        </div>
        <div>
          <Label htmlFor={`${productSlug}-occupancy`}>Occupancy</Label>
          <select
            id={`${productSlug}-occupancy`}
            value={occupancy}
            onChange={(event) => setOccupancy(event.target.value)}
            className="mt-1 flex h-10 w-full border border-input bg-background px-3 text-sm"
          >
            <option>Primary</option>
            <option>Second home</option>
            <option>Investment</option>
          </select>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button type="submit">Send to scenario desk</Button>
        <Button asChild type="button" variant="outline">
          <a href={`tel:8559532453`}>{COMPANY_PHONE}</a>
        </Button>
      </div>
    </form>
  )
}
