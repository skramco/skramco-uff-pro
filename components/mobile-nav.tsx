'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PRO_PORTAL_LOGIN_URL } from '@/lib/pro-portal-url'
import { calculators } from '@/content/calculators'
import { cheatSheets } from '@/content/cheat-sheets'

const linkClassName =
  'flex min-h-11 items-center px-1 text-nav text-ink-muted duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'

type MobileNavProps = {
  showNonQmIncomeAnalysis: boolean
}

export function MobileNav({ showNonQmIncomeAnalysis }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-11 w-11 shrink-0 p-0"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto pt-12">
        <SheetHeader className="sr-only">
          <SheetTitle>Site navigation</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1" aria-label="Main navigation">
          <SheetClose asChild>
            <Link href="/" className={linkClassName}>
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/products" className={linkClassName}>
              Products
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/pro-portal" className={linkClassName}>
              PRO Portal
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/piper" className={linkClassName}>
              Piper
            </Link>
          </SheetClose>
          <p className="mt-2 px-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Resources
          </p>
          <SheetClose asChild>
            <Link href="/resources" className={linkClassName}>
              Resource library
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/industry-news" className={linkClassName}>
              Industry news
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/licensing" className={linkClassName}>
              Licensing
            </Link>
          </SheetClose>
          {showNonQmIncomeAnalysis ? (
            <SheetClose asChild>
              <Link href="/non-qm-income-analysis" className={linkClassName}>
                Non-QM Income Analysis
              </Link>
            </SheetClose>
          ) : null}
          <p className="mt-2 px-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Cheat Sheets
          </p>
          {cheatSheets.map((sheet) => (
            <SheetClose key={sheet.href} asChild>
              <Link href={sheet.href} className={linkClassName}>
                {sheet.label}
              </Link>
            </SheetClose>
          ))}
          <p className="mt-2 px-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Calculators
          </p>
          {calculators.map((calculator) => (
            <SheetClose key={calculator.href} asChild>
              <Link href={calculator.href} className={linkClassName}>
                {calculator.label}
              </Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Link href="/contact" className={`${linkClassName} mt-2`}>
              Contact
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <a
              href={PRO_PORTAL_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              Log in
            </a>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  )
}