"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, TLoginType } from "@/utils/validationShemas";
import ButtonSpinner from "@/components/ButtonSpinner";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/forms/Input";
import { signIn } from "next-auth/react";
import routes from "@/utils/routes";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

// Define props type
type SignInFormProps = {
  t: {
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    submit: string;
    loginSuccessful: string;
  };
};

const SignInForm = ({ t }: SignInFormProps) => {
  const router = useRouter();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const validation = useTranslations("validation");

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginType>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema(validation)),
  });

  const formSubmitHandler: SubmitHandler<TLoginType> = async (data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        locale,
        redirect: false,
      });

      if (res?.error) {
        const responseError = JSON.parse(res?.error).responseError;
        if (responseError) {
          toast.error(responseError);
        }
      }
      if (res?.ok) {
        toast.success(t.loginSuccessful);

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
        label={t.emailLabel}
        placeholder={t.emailPlaceholder}
      />
      <Input
        name="password"
        type="password"
        register={register}
        error={errors.password?.message}
        disabled={isLoading}
        label={t.passwordLabel}
        placeholder={t.passwordPlaceholder}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="text-xl text-white bg-red-500 hover:bg-red-600 transition-colors py-2 rounded-lg font-semibold disabled:cursor-not-allowed w-full"
      >
        {isLoading ? <ButtonSpinner /> : t.submit}
      </button>
    </form>
  );
};

export default SignInForm;
