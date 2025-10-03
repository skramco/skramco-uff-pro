"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock } from "lucide-react"

interface RateSheetPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

const CORRECT_PASSWORD = "ratesUFF" // Case sensitive

export function RateSheetPasswordModal({ isOpen, onClose }: RateSheetPasswordModalProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Check password (case sensitive)
    if (password === CORRECT_PASSWORD) {
      // Open the rate sheet in a new tab
      window.open("https://uffwest.com/rates/UFF-RatesWest.pdf", "_blank", "noopener,noreferrer")

      // Reset and close
      setPassword("")
      setIsLoading(false)
      onClose()
    } else {
      setError("Incorrect password. Please try again. (Case sensitive)")
      setIsLoading(false)
      setPassword("")
    }
  }

  const handleClose = () => {
    setPassword("")
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Lock className="h-5 w-5" />
            Rate Sheet Access
          </DialogTitle>
          <DialogDescription>Please enter the password to view the current rate sheet.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rate-password">Password</Label>
            <Input
              id="rate-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <p className="text-xs text-gray-500">Password is case sensitive</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-red-600 hover:bg-red-700">
              {isLoading ? "Checking..." : "Access Rate Sheet"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
