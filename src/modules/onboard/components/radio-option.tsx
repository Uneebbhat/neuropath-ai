import { Field, FieldContent, FieldDescription, FieldTitle } from "@/components/ui/field";

import { FieldLabel } from "@/components/ui/field";
import { RadioOptionProps } from "../types/types";
import { RadioGroupItem } from "@/components/ui/radio-group";

export function RadioOption({ option }: RadioOptionProps) {
  return (
    <FieldLabel htmlFor={option.id}>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>{option.title}</FieldTitle>
          <FieldDescription>{option.description}</FieldDescription>
        </FieldContent>
        <RadioGroupItem value={option.value} id={option.id} />
      </Field>
    </FieldLabel>
  )
}