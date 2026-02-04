"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, AlertCircle } from "lucide-react"

interface RatesheetPasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const WEST_PASSWORD = "UFFWEST2026"
const EAST_PASSWORD = "UFFEAST2026"

const WEST_RATESHEET_URL = "https://uffrates.github.io/UFFWest-Ratesheet.pdf"
const EAST_RATESHEET_URL = "https://uffrates.github.io/UFFEast-Ratesheet.pdf"

export function RatesheetPasswordDialog({ open, onOpenChange }: RatesheetPasswordDialogProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate a brief loading state for better UX
    setTimeout(() => {
      const trimmedPassword = password.trim()

      if (trimmedPassword === WEST_PASSWORD) {
        // Open West ratesheet
        window.open(WEST_RATESHEET_URL, '_blank', 'noopener,noreferrer')
        setPassword("")
        setIsLoading(false)
        onOpenChange(false)
      } else if (trimmedPassword === EAST_PASSWORD) {
        // Open East ratesheet
        window.open(EAST_RATESHEET_URL, '_blank', 'noopener,noreferrer')
        setPassword("")
        setIsLoading(false)
        onOpenChange(false)
      } else {
        // Invalid password
        setError("Invalid access code. Please check with your regional manager.")
        setIsLoading(false)
      }
    }, 500)
  }

  const handleClose = () => {
    setPassword("")
    setError("")
    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-red-600" />
            Access Rate Sheet
          </DialogTitle>
          <DialogDescription>
            Enter your regional access code to view the rate sheet. Contact your regional manager if you need assistance.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="password">Access Code</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your access code"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              className="font-mono"
              autoComplete="off"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700"
              disabled={!password.trim() || isLoading}
            >
              {isLoading ? "Verifying..." : "Access Rate Sheet"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t">
          <p className="text-xs text-gray-500 text-center">
            Rate sheets are region-specific and confidential. Do not share your access code.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
