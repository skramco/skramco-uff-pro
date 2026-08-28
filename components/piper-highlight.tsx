import { piperStages } from "@/content/piper"

type PiperHighlightProps = {
  showIntro?: boolean
}

export function PiperHighlight({ showIntro = true }: PiperHighlightProps) {
  return (
    <section id="piper" className="section-pad border-y border-hairline bg-surface-raised">
      <div className="container mx-auto px-4">
        {showIntro ? (
          <div className="mb-10 max-w-[46rem]">
            <h2>The AI that moves the file with you</h2>
            <p className="prose-body mt-4">
              Piper is UFF&apos;s AI Pipeline Assistant, built into PRO Portal for mortgage brokers. She reads the loan you
              are in, the stage it is in, and the dates that can kill a close. Then she tells you the next step you own,
              and what UFF is handling.
            </p>
            <p className="prose-body mt-3">
              Not a generic mortgage chatbot. She is a workflow coach on the file: origination, submit, underwriting,
              clear to close, and funded.
            </p>
          </div>
        ) : null}

        <ol className="grid gap-3 lg:grid-cols-5">
          {piperStages.map((item, index) => (
            <li key={item.stage} className="panel relative overflow-hidden p-4">
              <p className="caption text-accent">
                {String(index + 1).padStart(2, "0")} · {item.stage}
              </p>
              <h3 className="mt-3 text-base font-bold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm text-ink-muted">{item.brokerMove}</p>
              <p className="mt-3 border-t border-hairline pt-3 text-sm text-ink">
                <span className="font-semibold text-accent">Piper: </span>
                {item.piperDoes}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
