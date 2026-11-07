function pinLeft(ratio: number): string {
  const clamped = Math.min(Math.max(ratio / 0.75, 0), 1)
  return `${clamped * 100}%`
}

function pinTone(ratio: number): "pass" | "fail" {
  return ratio <= 0.5 ? "pass" : "fail"
}

type DtiGaugeProps = {
  before: number | null
  after: number | null
  animate?: boolean
  onDark?: boolean
}

export function DtiGauge({ before, after, animate = false, onDark = false }: DtiGaugeProps) {
  const afterLeft = after === null ? "0%" : pinLeft(after)
  const beforeLeft = before === null ? afterLeft : pinLeft(before)

  return (
    <div className={onDark ? "bi-gauge on-dark" : "bi-gauge"} aria-hidden="true">
      <div className="bi-gauge-hatch" />
      <div className="bi-gauge-cap">
        <span>50% max</span>
      </div>
      {before !== null ? (
        <div
          className={`bi-pin is-before is-${pinTone(before)}`}
          style={{ left: beforeLeft }}
        />
      ) : null}
      {after !== null ? (
        <div
          className={`bi-pin is-${pinTone(after)}${animate ? " is-after-animate" : ""}`}
          style={
            animate
              ? { left: afterLeft, ["--pin-from" as string]: beforeLeft, ["--pin-to" as string]: afterLeft }
              : { left: afterLeft }
          }
        />
      ) : null}
    </div>
  )
}
