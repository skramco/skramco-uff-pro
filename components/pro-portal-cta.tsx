"use client"

import { Button } from "@/components/ui/button"
import { PRO_PORTAL_LOGIN_URL } from "@/lib/pro-portal-url"

interface ProPortalCTAProps {
  variant?: "default" | "floating" | "banner" | "compact"
  className?: string
}

export function ProPortalCTA({ variant = "default", className = "" }: ProPortalCTAProps) {
  const loginLinkProps = {
    href: PRO_PORTAL_LOGIN_URL,
    target: "_blank" as const,
    rel: "noopener noreferrer" as const,
  }

  if (variant === "floating") {
    return (
      <div className={`panel fixed bottom-6 right-6 z-50 p-4 ${className}`}>
        <p className="caption">Partner access</p>
        <Button asChild size="sm" className="mt-2">
          <a {...loginLinkProps}>Log in to PRO Portal</a>
        </Button>
      </div>
    )
  }

  if (variant === "banner") {
    return (
      <div className={`border-y border-hairline bg-nav py-2 text-white ${className}`}>
        <div className="container mx-auto flex items-center justify-between px-4">
          <span className="text-sm">Existing partners: access PRO Portal</span>
          <Button asChild size="sm">
            <a {...loginLinkProps}>Log in</a>
          </Button>
        </div>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={`panel flex items-center justify-between p-4 ${className}`}>
        <p className="text-sm font-semibold">Log in to PRO Portal</p>
        <Button asChild size="sm">
          <a {...loginLinkProps}>Log in</a>
        </Button>
      </div>
    )
  }

  return (
    <div className={`panel p-6 ${className}`}>
      <h3 className="text-lg font-bold tracking-tight">Log in to PRO Portal</h3>
      <p className="mt-2 text-sm text-ink-muted">Originate through funded from your pipeline.</p>
      <Button asChild className="mt-4">
        <a {...loginLinkProps}>Log in</a>
      </Button>
    </div>
  )
}
