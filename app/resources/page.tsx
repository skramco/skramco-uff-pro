"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Download,
  Users,
  TrendingUp,
  Search,
  Shield,
  Home,
  Building,
  File,
  Star,
  Edit3,
  ExternalLink,
  Table2,
} from "lucide-react"
import Link from "next/link"
import { PRO_PORTAL_LOGIN_URL } from "@/lib/pro-portal-url"
import { FHACaseNumberForm } from "@/components/fha-case-number-form"
import { PageHero } from "@/components/page-hero"
import { formSections } from "@/content/forms"
import { resourceGuides } from "@/content/resource-guides"

const SECTION_ICONS = {
  general: FileText,
  disclosure: Shield,
  fha: Users,
  va: Star,
  appraisal: Home,
  condo: Building,
  nonqm: TrendingUp,
  other: File,
} as const

export default function ResourcesPage() {
  const [isFHAFormOpen, setIsFHAFormOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleDownload = (url: string, formName: string, source: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handlePDFDownload = (apiUrl: string, formName: string) => {
    // Open API-generated PDF in a new tab
    window.open(apiUrl, "_blank", "noopener,noreferrer")
  }

  const handleFormClick = (formName: string) => {
    if (formName === "FHA Case Number Request Form") {
      setIsFHAFormOpen(true)
    }
  }

  const query = searchQuery.toLowerCase()

  const filteredGuides = resourceGuides.filter(
    (guide) => guide.name.toLowerCase().includes(query) || guide.description.toLowerCase().includes(query),
  )

  const filteredSections = formSections
    .map((section) => ({
      ...section,
      forms: section.forms.filter(
        (form) => form.name.toLowerCase().includes(query) || form.description.toLowerCase().includes(query),
      ),
    }))
    .filter((section) => section.forms.length > 0)

  return (
    <div className="min-h-screen">
      <PageHero eyebrow="Broker resources" title="Forms & guides">
        <p>
          Product cheat sheets, forms, and documents for processing loans, including official agency sources and UFF
          PDFs.
        </p>
      </PageHero>

      <section className="section-pad">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl">
            <div className="relative mb-10 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <Input
                type="text"
                placeholder="Search forms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-8">
              {filteredGuides.length > 0 ? (
                <Card className="overflow-hidden">
                  <CardHeader className="border-b border-hairline bg-surface">
                    <CardTitle className="flex items-center gap-3 text-lg font-medium">
                      <Table2 className="h-5 w-5 text-accent" />
                      Cheat Sheets
                      <Badge variant="outline" className="ml-auto">
                        {filteredGuides.length} {filteredGuides.length === 1 ? "sheet" : "sheets"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {filteredGuides.map((guide) => (
                        <div
                          key={guide.href}
                          className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors gap-4"
                        >
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <Table2 className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium text-gray-900">{guide.name}</p>
                                <Badge variant="outline" className="text-xs flex-shrink-0">
                                  UFF
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">{guide.description}</p>
                              <p className="caption mt-1">Updated {guide.lastUpdated}</p>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <Button size="sm" asChild className="bg-red-600 hover:bg-red-700">
                              <Link href={guide.href}>Open guide</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              {filteredSections.map((section) => {
                const IconComponent = SECTION_ICONS[section.id as keyof typeof SECTION_ICONS] ?? FileText
                return (
                  <Card key={section.id} className="overflow-hidden">
                    <CardHeader className="border-b border-hairline bg-surface">
                      <CardTitle className="flex items-center gap-3 text-lg font-medium">
                        <IconComponent className="h-5 w-5 text-accent" />
                        {section.title}
                        <Badge variant="outline" className="ml-auto">
                          {section.forms.length} forms
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {section.forms.map((form, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors gap-4"
                          >
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium text-gray-900">{form.name}</p>
                                  {form.source && (
                                    <Badge variant="outline" className="text-xs flex-shrink-0">
                                      {form.source}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">{form.description}</p>
                                {form.lastUpdated ? (
                                  <p className="caption mt-1">Updated {form.lastUpdated}</p>
                                ) : null}
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              {form.isForm ? (
                                <Button
                                  size="sm"
                                  onClick={() => handleFormClick(form.name)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Edit3 className="mr-2 h-4 w-4" />
                                  Fill Out Form
                                </Button>
                              ) : form.apiUrl ? (
                                <Button
                                  size="sm"
                                  onClick={() => handlePDFDownload(form.apiUrl!, form.name)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                              ) : form.url ? (
                                <Button
                                  size="sm"
                                  onClick={() => handleDownload(form.url!, form.name, form.source!)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {filteredGuides.length === 0 && filteredSections.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No forms found</h3>
                  <p className="text-gray-500">Try adjusting your search query</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="band-nav">
        <div className="container mx-auto px-4">
          <h2 className="text-white">Need something else?</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Contact support</Link>
            </Button>
            <Button asChild variant="outline" className="btn-on-dark">
              <a href={PRO_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                Log in to PRO Portal
              </a>
            </Button>
          </div>
        </div>
      </section>

      <FHACaseNumberForm isOpen={isFHAFormOpen} onClose={() => setIsFHAFormOpen(false)} />
    </div>
  )
}
