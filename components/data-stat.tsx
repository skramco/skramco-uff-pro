type DataStatProps = {
  value: string
  label: string
  asOf: string | null
}

export function DataStat({ value, label, asOf }: DataStatProps) {
  return (
    <div className="panel px-4 py-4">
      <p className="caption">{label}</p>
      <p className="data-num mt-2 text-2xl font-extrabold tracking-tight text-ink">{value}</p>
      {asOf ? <p className="mt-2 text-xs text-ink-muted">As of {asOf}</p> : null}
    </div>
  )
}
