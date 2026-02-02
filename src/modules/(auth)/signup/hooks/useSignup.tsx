import useFormHandler from "@/hooks/useFormHandler";
import { HandleOnSubmit } from "@/types/FormTypes";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import signupUser from "../../api/signupUser";
import { SignupFormData } from "../../types/types";
import useUserStore from "@/store/useUserStore";

const useSignup = () => {
  const router = useRouter();
  const { login } = useUserStore();
  const { formData, handleOnChange, loading, setFormData, setLoading } =
    useFormHandler<SignupFormData>({
      name: "",
      email: "",
      password: "",
    });

  const handleOnSubmit = async (e: HandleOnSubmit) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    const sanitizedFormData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    try {
      const { data } = await signupUser(sanitizedFormData);
      console.log(data);

      toast.success(data.message);
      // Store user data in zustand store
      login({
        userId: data.data.id,
        token: data.data.token,
        name: data.data.name,
        email: data.data.email,
      });
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      router.push("/onboard");
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
    loading,
    formData,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useSignup;
