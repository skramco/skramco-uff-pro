import { notFound } from "next/navigation"
import { CampaignLandingPage } from "@/components/campaign-landing/CampaignLandingPage"
import { listCampaignSlugs, loadCampaignPage } from "@/lib/campaign-pages"

export async function generateStaticParams() {
  return listCampaignSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = loadCampaignPage(slug)
  if (!data) return { title: "Resource not found | UFF PRO" }
  return {
    title: `${data.title} | UFF PRO`,
    description: data.metaDescription,
  }
}

export default async function CampaignLandingRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = loadCampaignPage(slug)
  if (!data) notFound()
  return <CampaignLandingPage data={data} />
}
