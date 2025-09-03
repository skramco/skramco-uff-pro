"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface CaptchaProps {
  onCaptchaChange: (isValid: boolean) => void
  className?: string
}

export function Captcha({ onCaptchaChange, className }: CaptchaProps) {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [operator, setOperator] = useState<"+" | "-">("+")
  const [userAnswer, setUserAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [message, setMessage] = useState("")

  const generateCaptcha = useCallback(() => {
    const n1 = Math.floor(Math.random() * 10) + 1 // Numbers between 1 and 10
    const n2 = Math.floor(Math.random() * 10) + 1
    const op = Math.random() > 0.5 ? "+" : "-" // Randomly choose + or -

    setNum1(n1)
    setNum2(n2)
    setOperator(op)
    setUserAnswer("")
    setMessage("")
    // Do not reset isCorrect or parent's state here to avoid wiping correct answers
  }, [])

  useEffect(() => {
    generateCaptcha()
  }, [generateCaptcha])

  useEffect(() => {
    let correctResult: number
    if (operator === "+") {
      correctResult = num1 + num2
    } else {
      correctResult = num1 - num2
    }

    const parsedAnswer = Number.parseInt(userAnswer, 10)

    if (userAnswer === "") {
      setIsCorrect(false)
      setMessage("")
      onCaptchaChange(false)
    } else if (!isNaN(parsedAnswer) && parsedAnswer === correctResult) {
      setIsCorrect(true)
      setMessage("Correct!")
      onCaptchaChange(true)
    } else {
      setIsCorrect(false)
      setMessage("Incorrect. Try again.")
      onCaptchaChange(false)
    }
  }, [userAnswer, num1, num2, operator, onCaptchaChange])

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor="captcha-input">
        What is {num1} {operator} {num2}? *
      </Label>
      <Input
        id="captcha-input"
        type="number"
        placeholder="Your answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className={cn({
          "border-green-500 focus-visible:ring-green-500": isCorrect && userAnswer !== "",
          "border-red-500 focus-visible:ring-red-500": !isCorrect && userAnswer !== "" && message !== "",
        })}
        required
        disabled={isCorrect} // Disable input when correct
      />
      {message && (
        <p className={cn("text-sm", { "text-green-600": isCorrect, "text-red-600": !isCorrect })}>{message}</p>
      )}
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          setIsCorrect(false)
          onCaptchaChange(false)
          generateCaptcha()
        }}
        className="text-sm bg-transparent"
      >
        Generate New CAPTCHA
      </Button>
    </div>
  )
}
