"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, TLoginType } from "@/utils/validationShemas";
import ButtonSpinner from "@/components/ButtonSpinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/forms/Input";
import { signIn } from "next-auth/react";
import routes from "@/utils/routes";

const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginType>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });

  const formSubmitHandler: SubmitHandler<TLoginType> = async (data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        const responseError = JSON.parse(res?.error).responseError;
        if (responseError) {
          toast.error(responseError);
        }
      }
      if (res?.ok) {
        toast.success("Login successful");

        router.replace(`${routes.profile}`);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className="flex flex-col space-y-2"
    >
      <Input
        name="email"
        type="email"
        register={register}
        error={errors.email?.message}
        disabled={isLoading}
        label="Email Address"
        placeholder="Enter Your Email"
      />
      <Input
        name="password"
        type="password"
        register={register}
        error={errors.password?.message}
        disabled={isLoading}
        label="Password"
        placeholder="Enter Your Password"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="text-xl text-white bg-red-500 hover:bg-red-600 transition-colors py-2 rounded-lg font-semibold disabled:cursor-not-allowed w-full"
      >
        {isLoading ? <ButtonSpinner /> : "Login"}
      </button>
    </form>
  );
};

export default SignInForm;
