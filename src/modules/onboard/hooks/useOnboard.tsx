import useFormHandler from "@/hooks/useFormHandler";
import { OnboardData } from "../types/types";
import { HandleOnSubmit } from "@/types/FormTypes";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useOnboard = () => {
  const router = useRouter();
  const {
    formData,
    handleOnChange,
    loading,
    setFormData,
    setLoading,
    handleValueChange,
  } = useFormHandler<OnboardData>({
    goal: "",
    level: "",
    learningPreference: "",
    constraints: "",
  });

  const handleOnSubmit = async (e?: HandleOnSubmit) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/onboard", formData);

      console.log(data);

      toast.success(data.message || "Onboarding completed successfully");

      router.push("/chat");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || error.message);
      } else {
        toast.error(`An unexpected error occurred`);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleOnChange,
    loading,
    handleOnSubmit,
    setFormData,
    handleValueChange,
  };
};

export default useOnboard;
