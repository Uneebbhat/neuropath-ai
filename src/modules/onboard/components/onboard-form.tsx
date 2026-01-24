"use client"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RadioGroup } from "@/components/ui/radio-group"
import { useState } from "react"
import { OnboardData, StepContentProps, StepOption } from "../types/types"
import { ONBOARD_STEPS } from "../data/data"
import { RadioOption } from "./radio-option"
import { NavigationButtons } from "./navigation-buttons"

function StepContent({ step, value, onChange }: StepContentProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{step.question}</h3>
      <RadioGroup value={value} onValueChange={onChange}>
        {step.options.map((option: StepOption) => (
          <RadioOption key={option.id} option={option} />
        ))}
      </RadioGroup>
    </div>
  )
}

export function OnboardForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<OnboardData>({
    goal: "",
    level: "",
    learningPreference: "",
    constraints: "",
  })

  const totalSteps = ONBOARD_STEPS.length
  const currentStepConfig = ONBOARD_STEPS[currentStep - 1]

  const handleValueChange = (value: string) => {
    setFormData({ ...formData, [currentStepConfig.key]: value })
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  const isStepValid = () => {
    return formData[currentStepConfig.key] !== ""
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Let&apos;s personalize your learning experience
          </CardTitle>
          <CardDescription>
            Step {currentStep} of {totalSteps}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <StepContent
              step={currentStepConfig}
              value={formData[currentStepConfig.key]}
              onChange={handleValueChange}
            />
            <NavigationButtons
              currentStep={currentStep}
              totalSteps={totalSteps}
              isValid={isStepValid()}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
