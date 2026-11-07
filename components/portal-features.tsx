import Image from "next/image"
import Link from "next/link"
import {
  UserPlus,
  LayoutList,
  Calculator,
  LineChart,
  Lock,
  FilePlus,
  ListChecks,
  FolderOpen,
  Upload,
  ClipboardCheck,
  ArrowLeftRight,
  Timer,
  Activity,
  Receipt,
  Bell,
  MessageSquare,
  Building2,
  DollarSign,
  type LucideIcon,
} from "lucide-react"
import {
  portalFeatureGroups,
  type PortalFeature,
  type PortalFeatureGroup,
  type PortalFeatureIcon,
} from "@/content/portal-features"
import { portalScreenByLabel } from "@/content/portal-screens"

const FEATURE_ICONS: Record<PortalFeatureIcon, LucideIcon> = {
  signup: UserPlus,
  pipeline: LayoutList,
  pricer: Calculator,
  "loan-pricing": LineChart,
  lock: Lock,
  "new-loan": FilePlus,
  overview: ListChecks,
  "loan-file": FolderOpen,
  documents: Upload,
  conditions: ClipboardCheck,
  coc: ArrowLeftRight,
  "post-lock": Timer,
  status: Activity,
  fees: Receipt,
  "action-queue": Bell,
  chat: MessageSquare,
  company: Building2,
  comp: DollarSign,
}

function FeatureCard({ feature }: { feature: PortalFeature }) {
  const Icon = FEATURE_ICONS[feature.icon]
  return (
    <article className="panel p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent-quiet text-accent">
        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
      </div>
      <h3 className="mt-4 text-base font-bold tracking-tight">{feature.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{feature.outcome}</p>
    </article>
  )
}

function WorkspaceShot({ label }: { label: string }) {
  const shot = portalScreenByLabel(label)
  if (!shot) return null
  return (
    <figure className="shot-frame">
      <Image src={shot.src} alt={shot.alt} width={1200} height={720} className="h-auto w-full" />
      <figcaption className="caption border-t border-hairline px-3 py-2">{shot.label}</figcaption>
    </figure>
  )
}

function SectionIntro({
  group,
  more,
}: {
  group: PortalFeatureGroup
  more?: { href: string; label: string }
}) {
  return (
    <div className="mb-6 max-w-[46rem]">
      <p className="caption">{group.label}</p>
      <h2 className="mt-3">{group.title}</h2>
      <p className="prose-body mt-3">{group.intro}</p>
      {more ? (
        <p className="mt-3">
          <Link href={more.href} className="text-sm font-semibold text-accent hover:underline duration-150">
            {more.label}
          </Link>
        </p>
      ) : null}
    </div>
  )
}

function ShotWithTiles({
  shotLabel,
  features,
}: {
  shotLabel: string
  features: PortalFeature[]
}) {
  return (
    <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)]">
      <WorkspaceShot label={shotLabel} />
      <div className="flex flex-col gap-3">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </div>
  )
}

type PortalFeaturesProps = {
  compact?: boolean
}

export function PortalFeatures({ compact = false }: PortalFeaturesProps) {
  const access = portalFeatureGroups.find((group) => group.id === "access")
  const priceLock = portalFeatureGroups.find((group) => group.id === "price-lock")
  const file = portalFeatureGroups.find((group) => group.id === "file")
  const piper = portalFeatureGroups.find((group) => group.id === "piper")
  const shop = compact ? undefined : portalFeatureGroups.find((group) => group.id === "shop")

  const fileLead = file?.features.filter((f) => ["new-loan", "overview", "loan-file"].includes(f.id)) ?? []
  const fileDocs = file?.features.filter((f) => ["documents", "conditions", "coc"].includes(f.id)) ?? []
  const fileRest = file?.features.filter((f) => ["post-lock", "status", "fees"].includes(f.id)) ?? []

  return (
    <section id="features" className="section-pad">
      <div className="container mx-auto space-y-16 px-4">
        {access ? (
          <div>
            <SectionIntro group={access} />
            <ShotWithTiles shotLabel="Pipeline" features={access.features} />
          </div>
        ) : null}

        {priceLock ? (
          <div>
            <SectionIntro group={priceLock} />
            <ShotWithTiles shotLabel="Pricing" features={priceLock.features} />
          </div>
        ) : null}

        {file ? (
          <div>
            <SectionIntro group={file} />
            <div className="space-y-6">
              <ShotWithTiles shotLabel="Overview" features={fileLead} />
              <ShotWithTiles shotLabel="Loan File" features={fileDocs} />
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {fileRest.map((feature) => (
                  <FeatureCard key={feature.id} feature={feature} />
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {piper ? (
          <div>
            <SectionIntro group={piper} more={{ href: "/piper", label: "Learn more about Piper" }} />
            <div className="grid gap-3 sm:grid-cols-2">
              {piper.features.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        ) : null}

        {shop ? (
          <div>
            <SectionIntro group={shop} />
            <div className="grid gap-3 sm:grid-cols-2">
              {shop.features.map((feature) => (
                <FeatureCard key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
