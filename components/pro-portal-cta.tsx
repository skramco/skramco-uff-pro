"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Zap } from "lucide-react"
import { ProPortalLoginModal } from "./pro-portal-login-modal"

interface ProPortalCTAProps {
  variant?: "default" | "floating" | "banner" | "compact"
  className?: string
}

export function ProPortalCTA({ variant = "default", className = "" }: ProPortalCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  if (variant === "floating") {
    return (
      <>
        <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
          <Card className="bg-gradient-to-r from-red-600 to-red-500 border-none shadow-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Quick Access</p>
                  <Button
                    onClick={handleLoginClick}
                    size="sm"
                    className="bg-white text-red-600 hover:bg-red-50 font-semibold mt-1"
                  >
                    PRO Portal →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <ProPortalLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    )
  }

  if (variant === "banner") {
    return (
      <>
        <div className={`bg-gradient-to-r from-red-600 to-red-500 text-white py-3 ${className}`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5" />
                <span className="font-semibold">Existing Partners: Access your PRO Portal</span>
              </div>
              <Button
                onClick={handleLoginClick}
                size="sm"
                className="bg-white text-red-600 hover:bg-red-50 font-semibold"
              >
                Login <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        <ProPortalLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    )
  }

  if (variant === "compact") {
    return (
      <>
        <div className={`p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200 ${className}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-red-800">Partner Access</p>
              <p className="text-sm text-red-600">Login to PRO Portal</p>
            </div>
            <Button
              onClick={handleLoginClick}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full"
            >
              Login →
            </Button>
          </div>
        </div>
        <ProPortalLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </>
    )
  }

  return (
    <>
      <Card className={`bg-gradient-to-r from-red-600 to-red-500 border-none text-white ${className}`}>
        <CardContent className="p-6 text-center">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">🚀 Access PRO Portal</h3>
          <p className="text-red-100 mb-4">Login to your loan management dashboard</p>
          <Button
            onClick={handleLoginClick}
            className="bg-white text-red-600 hover:bg-red-50 font-bold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Login Now <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      <ProPortalLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
