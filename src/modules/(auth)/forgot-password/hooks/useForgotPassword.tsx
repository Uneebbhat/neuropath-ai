"use client"

import { useState, ChangeEvent, FormEvent } from "react"

interface ForgotPasswordFormData {
  email: string
}

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  })

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset email")
      }

      setSuccess(true)
      setFormData({
        email: "",
      })
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      )
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    success,
    error,
    formData,
    handleOnChange,
    handleOnSubmit,
  }
}

