import { Button } from "@/components/ui/button";
import { NavigationButtonsProps } from "../types/types";

export function NavigationButtons({
  currentStep,
  totalSteps,
  isValid,
  onPrevious,
  onNext,
  onSubmit,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
      >
        Previous
      </Button>
      {currentStep < totalSteps ? (
        <Button type="button" onClick={onNext} disabled={!isValid}>
          Next
        </Button>
      ) : (
        <Button type="button" onClick={onSubmit} disabled={!isValid}>
          Complete
        </Button>
      )}
    </div>
  )
}