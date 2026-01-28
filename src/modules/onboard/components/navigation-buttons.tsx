import { Button } from "@/components/ui/button";
import { NavigationButtonsProps } from "../types/types";
import { Spinner } from "@/components/ui/spinner";

export function NavigationButtons({
  currentStep,
  totalSteps,
  isValid,
  onPrevious,
  onNext,
  onSubmit,
  loading,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1 || loading}
      >
        {loading ? (
          <>
            <Spinner />
            Previous
          </>
        ) : (
          "Previous"
        )}
      </Button>
      {currentStep < totalSteps ? (
        <Button type="button" onClick={onNext} disabled={!isValid}>
          {loading ? (
            <>
              <Spinner /> Next
            </>
          ) : (
            "Next"
          )}
        </Button>
      ) : (
        <Button type="button" onClick={onSubmit} disabled={!isValid}>
          {loading ? (
            <>
              <Spinner />
              Complete
            </>
          ) : (
            "Complete"
          )}
        </Button>
      )}
    </div>
  );
}
