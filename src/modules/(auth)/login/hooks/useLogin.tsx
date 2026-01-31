import { HandleOnSubmit } from "@/types/FormTypes";
import { LoginFormData } from "../../types/types";
import useFormHandler from "@/hooks/useFormHandler";
import { AxiosError } from "axios";
import { toast } from "sonner";
import loginUser from "../../api/loginUser";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";

const useLogin = () => {
  const router = useRouter();
  const { login } = useUserStore();
  const { formData, handleOnChange, loading, setFormData, setLoading } =
    useFormHandler<LoginFormData>({
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
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    try {
      const { data } = await loginUser(sanitizedFormData);
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
        email: "",
        password: "",
      });

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
    loading,
    formData,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useLogin;
