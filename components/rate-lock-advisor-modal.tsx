"use client"

import { Lock, LockOpen, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

const INDICATORS = [
  { label: "10yr Treasury", meaning: "The benchmark the advisor watches first" },
  { label: "30yr Mortgage", meaning: "Where consumer rates have been moving" },
  { label: "Fed Funds Rate", meaning: "Policy backdrop for the next 30 days" },
  { label: "CPI", meaning: "Inflation pressure on the curve" },
  { label: "Volatility", meaning: "How jumpy the tape is before you float" },
] as const

type RateLockAdvisorModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RateLockAdvisorModal({ open, onOpenChange }: RateLockAdvisorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-accent" />
            Rate Lock Advisor
          </DialogTitle>
          <DialogDescription>
            The same lock-or-float dashboard brokers open from the PRO Portal header. Live FRED tape, a confidence
            score, and a call you can act on.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="rounded-card border border-accent p-5 text-center">
            <p className="caption">Market direction</p>
            <p className="mt-2 text-lg font-bold tracking-tight">Rates are moving. Lock or float on the file.</p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-extrabold tracking-wide text-white">
                <Lock className="h-4 w-4" />
                LOCK
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-4 py-2 text-sm font-extrabold tracking-wide text-ink">
                <LockOpen className="h-4 w-4" />
                FLOAT
              </span>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-pill bg-muted">
              <div className="h-full w-[72%] bg-accent" />
            </div>
            <p className="mt-2 text-sm font-semibold">Confidence score on every call</p>
            <p className="mt-3 text-sm text-ink-muted">
              Set days to close and risk tolerance. The advisor reads Treasury, mortgage rates, Fed funds, CPI, and
              volatility, then tells you lock or float.
            </p>
          </div>

          <div className="rounded-card border border-hairline">
            <p className="caption border-b border-hairline px-4 py-3">Market indicators</p>
            <ul>
              {INDICATORS.map((row) => (
                <li
                  key={row.label}
                  className="flex items-start justify-between gap-3 border-b border-hairline px-4 py-2.5 last:border-0"
                >
                  <span className="text-sm font-semibold text-ink">{row.label}</span>
                  <span className="max-w-[16rem] text-right text-xs text-ink-muted">{row.meaning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-[11px] text-ink-muted">
          Rate recommendations are informational only and do not constitute financial advice. Data from FRED. Live
          numbers run inside PRO Portal after you create an account.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
              Create your account and open it live
            </a>
          </Button>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
