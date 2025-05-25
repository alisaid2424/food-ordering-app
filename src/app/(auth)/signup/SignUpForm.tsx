"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, TRegisterType } from "@/utils/validationShemas";
import ButtonSpinner from "@/components/ButtonSpinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/forms/Input";
import routes from "@/utils/routes";
import { SignUpAction } from "@/server/actions/auth";

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterType>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
  });

  const formSubmitHandler: SubmitHandler<TRegisterType> = async (data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const res = await SignUpAction(data);
      if (res.status && res.message) {
        if (res.status === 201) {
          toast.success(res.message);
          router.replace(routes.login);
        } else {
          toast.error(res.message);
        }
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
        name="username"
        type="text"
        register={register}
        error={errors.username?.message}
        disabled={isLoading}
        label="Username"
        placeholder="Enter Your Username"
      />

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

      <Input
        name="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword?.message}
        disabled={isLoading}
        label="Confirm Password"
        placeholder="Enter Confirm Password"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="text-xl text-white bg-red-500 hover:bg-red-600 transition-colors py-2 rounded-lg font-semibold disabled:cursor-not-allowed w-full"
      >
        {isLoading ? <ButtonSpinner /> : "Register"}
      </button>
    </form>
  );
};

export default SignUpForm;
