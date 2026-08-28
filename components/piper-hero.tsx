import Image from "next/image"
import { AlertTriangle, Clock, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { piperActions, piperPrompts } from "@/content/piper"
import { PRO_PORTAL_LOGIN_URL, PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

const ACTION_ICONS = [AlertTriangle, Lock, Clock] as const

export function PiperHero() {
  return (
    <section className="border-b border-hairline bg-surface py-10 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)_auto] lg:gap-8">
          <div>
            <Image
              src="/images/piper-wordmark.png"
              alt="Piper"
              width={1011}
              height={401}
              priority
              className="h-auto w-[10.5rem]"
            />
            <h1 className="display mt-5">Piper moves the file with you</h1>
            <p className="prose-body mt-4">
              Piper is UFF&apos;s AI Pipeline Assistant, built into PRO Portal. She reads the loan you are in and the
              stage it is in, then tells you the next step you own versus what UFF is handling.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                  Create your account
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={PRO_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                  Open PRO Portal
                </a>
              </Button>
            </div>
          </div>

          <div className="panel overflow-hidden">
            <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-positive" aria-hidden />
              <p className="caption !text-ink-secondary">Watching the pipeline</p>
            </div>
            <ul>
              {piperActions.map((item, index) => {
                const Icon = ACTION_ICONS[index]
                return (
                  <li
                    key={item.title}
                    className="flex gap-3 border-b border-hairline px-4 py-3 last:border-0"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-quiet text-accent">
                      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </div>
                    <div>
                      <p className="caption text-accent">{item.urgency}</p>
                      <p className="mt-1 text-sm font-bold tracking-tight text-ink">{item.title}</p>
                      <p className="mt-1 text-sm leading-snug text-ink-muted">{item.detail}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="border-t border-hairline bg-surface px-4 py-3">
              <p className="caption">Try asking</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {piperPrompts.slice(0, 3).map((prompt) => (
                  <li
                    key={prompt}
                    className="rounded-pill border border-hairline bg-surface-raised px-2.5 py-1 text-[12px] font-semibold text-ink-secondary"
                  >
                    {prompt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <figure className="shot-frame mx-auto w-fit shadow-[0_12px_28px_rgba(31,41,46,0.1)] lg:mx-0">
            <Image
              src="/images/piper-chat.png"
              alt="Piper in the PRO Portal nav: ask her, or tell her what to do"
              width={334}
              height={811}
              priority
              className="h-[22rem] w-auto sm:h-[24rem] lg:h-[26rem]"
            />
            <figcaption className="caption border-t border-hairline px-3 py-2">Piper in the PRO Portal nav</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
