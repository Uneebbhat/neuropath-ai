"use client"

import { UseTogglePasswordProps } from "@/interfaces/interfaces"
import { useState } from "react"

const useTogglePassword = (): UseTogglePasswordProps => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleTogglePassword = (): void => {
    setShowPassword(!showPassword)
  }

  return {
    showPassword,
    handleTogglePassword,
  }
}

export default useTogglePassword