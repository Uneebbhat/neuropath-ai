"use client";

import { useState } from "react";
import { HandleOnChange, HandleOnFileChange } from "@/types/FormTypes";
import { StepConfig } from "@/modules/onboard/types/types";

const useFormHandler = <T,>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnChange = (e: HandleOnChange) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleValueChange = (value: string, currentStepConfig?: StepConfig) => {
    setFormData({ ...formData, [currentStepConfig!.key]: value });
  };

  const handleOnFileChange = (e: HandleOnFileChange) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  return {
    loading,
    formData,
    setLoading,
    setFormData,
    handleOnChange,
    handleValueChange,
    handleOnFileChange,
  };
};

export default useFormHandler;
