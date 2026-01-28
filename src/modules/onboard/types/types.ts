export type OnboardData = {
  goal: string;
  level: string;
  learningPreference: string;
  constraints: string;
};

export type StepOption = {
  id: string;
  value: string;
  title: string;
  description: string;
};

export type StepConfig = {
  key: keyof OnboardData;
  question: string;
  options: StepOption[];
};

export interface RadioOptionProps {
  option: StepOption;
}

export interface StepContentProps {
  step: StepConfig;
  value: string;
  onChange: (value: string) => void;
}

export interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  isValid: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  loading: boolean;
}
