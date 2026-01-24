"use client"

import { useState, ChangeEvent, FormEvent } from "react"

interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

export const useResetPassword = (token: string) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: "",
    confirmPassword: "",
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
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password")
      }

      setSuccess(true)
      setFormData({
        password: "",
        confirmPassword: "",
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

