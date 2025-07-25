"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, TRegisterType } from "@/utils/validationShemas";
import ButtonSpinner from "@/components/ButtonSpinner";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/forms/Input";
import routes from "@/utils/routes";
import { SignUpAction } from "@/server/actions/auth";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

type SignUpFormProps = {
  t: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    submit: string;
  };
};

const SignUpForm = ({ t }: SignUpFormProps) => {
  const router = useRouter();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const validation = useTranslations("validation");

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterType>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema(validation)),
  });

  const formSubmitHandler: SubmitHandler<TRegisterType> = async (data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const res = await SignUpAction(data, locale);
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
        label={t.nameLabel}
        placeholder={t.namePlaceholder}
      />

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

      <Input
        name="confirmPassword"
        type="password"
        register={register}
        error={errors.confirmPassword?.message}
        disabled={isLoading}
        label={t.confirmPasswordLabel}
        placeholder={t.confirmPasswordPlaceholder}
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

export default SignUpForm;
