"use client"

import { useState, type ReactNode } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LtvWorksheet } from "@/components/nqm/ltv-worksheet"
import type { ProgramId } from "@/lib/data/nqm-matrix"

type Props = {
  dscrPanel: ReactNode
  fullPanel: ReactNode
}

export function ProgramTabs({ dscrPanel, fullPanel }: Props) {
  const [program, setProgram] = useState<ProgramId>("dscr")

  return (
    <>
      <Tabs
        value={program}
        onValueChange={(value) => setProgram(value as ProgramId)}
        className="nqm-tabs print:hidden"
      >
        <TabsList
          aria-label="Program"
          className="h-auto w-full justify-start gap-0 rounded-none border-b border-hairline bg-transparent p-0 mt-7"
        >
          <TabsTrigger
            id="tab-dscr"
            value="dscr"
            aria-controls="p-dscr"
            className="mr-8 inline-flex h-auto flex-col items-start rounded-none border-b-[3px] border-transparent bg-transparent px-0 py-3 text-left text-sm font-bold tracking-[0.02em] text-ink-muted shadow-none ring-offset-0 data-[state=active]:border-uff-red data-[state=active]:bg-transparent data-[state=active]:text-uff-ink data-[state=active]:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-uff-red focus-visible:ring-0"
          >
            DSCR — Investor NQM
            <span className="mt-[3px] block text-[11px] font-normal uppercase tracking-[0.04em] text-ink-muted">
              No income · No employment
            </span>
          </TabsTrigger>
          <TabsTrigger
            id="tab-full"
            value="full"
            aria-controls="p-full"
            className="mr-8 inline-flex h-auto flex-col items-start rounded-none border-b-[3px] border-transparent bg-transparent px-0 py-3 text-left text-sm font-bold tracking-[0.02em] text-ink-muted shadow-none ring-offset-0 data-[state=active]:border-uff-red data-[state=active]:bg-transparent data-[state=active]:text-uff-ink data-[state=active]:shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-uff-red focus-visible:ring-0"
          >
            Full Doc — Residential NQM
            <span className="mt-[3px] block text-[11px] font-normal uppercase tracking-[0.04em] text-ink-muted">
              Primary, second home &amp; investment
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <LtvWorksheet program={program} />

      <div
        id="p-dscr"
        role="tabpanel"
        aria-labelledby="tab-dscr"
        className={program === "dscr" ? "nqm-panel" : "nqm-panel hidden print:!block"}
      >
        {dscrPanel}
      </div>
      <div
        id="p-full"
        role="tabpanel"
        aria-labelledby="tab-full"
        className={program === "full" ? "nqm-panel" : "nqm-panel hidden print:!block"}
      >
        {fullPanel}
      </div>
    </>
  )
}
