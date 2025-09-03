"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface PasswordGateProps {
  children: React.ReactNode
}

// IMPORTANT: For demonstration purposes only.
// In a production environment, passwords should NEVER be hardcoded or handled client-side.
// Implement server-side authentication for secure access control.
const CORRECT_PASSWORD = "uff2025"
const AUTH_KEY = "uff_auth_token"

export function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [error, setError] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // This ensures localStorage is only accessed on the client-side
    setIsClient(true)
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem(AUTH_KEY)
      if (storedAuth === "true") {
        setIsAuthenticated(true)
      }
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
      if (typeof window !== "undefined") {
        localStorage.setItem(AUTH_KEY, "true")
      }
      setError("")
    } else {
      setError("Incorrect password. Please try again.")
    }
  }

  // Render children with conditional blur and overlay
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Content that gets blurred */}
      <div
        className={`${isClient && !isAuthenticated ? "filter blur-sm pointer-events-none" : ""} transition-all duration-300 flex-grow`}
      >
        {children}
      </div>

      {/* Overlay */}
      {isClient && !isAuthenticated && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-red-600">Website Coming Soon!</CardTitle>
              <CardDescription className="text-gray-600">
                This site is currently under construction. Please enter the password to access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="text-center"
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Access Website
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
