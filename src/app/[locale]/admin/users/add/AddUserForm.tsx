"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/forms/Input";
import ButtonSpinner from "@/components/ButtonSpinner";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import UploadImage from "@/components/UploadImage";
import {
  CreateNewUserSchema,
  CreateNewUserType,
} from "@/utils/validationShemas";
import { CreateNewUser } from "@/server/actions/auth";
import routes from "@/utils/routes";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

const AddUserForm = () => {
  const router = useRouter();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const session = useSession();
  const t = useTranslations("profile.form");
  const validation = useTranslations("validation");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateNewUserType>({
    mode: "onBlur",
    resolver: zodResolver(CreateNewUserSchema(validation)),
  });

  const formSubmitHandler: SubmitHandler<CreateNewUserType> = async (data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const res = await CreateNewUser(data, locale);
      if (res.status && res.message) {
        if (res.status === 201) {
          toast.success(res.message);
          router.push(`${routes.users}?pageNumber=1`);
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

  const handleToggleIsAdmin = () => {
    setIsAdmin((prev) => !prev);
    setValue("admin", !isAdmin);
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className="flex flex-col md:flex-row gap-10"
    >
      <UploadImage<CreateNewUserType>
        currentImage=""
        altImage="New User"
        setValue={setValue}
        errors={errors}
        name="image"
      />

      <div className="flex flex-col space-y-3 flex-1">
        <Input
          name="name"
          type="text"
          register={register}
          error={errors.name?.message}
          disabled={isLoading}
          label={t("name.label")}
          placeholder={t("name.placeholder")}
        />

        <Input
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
          disabled={isLoading}
          label={t("email.label")}
          placeholder={t("email.placeholder")}
        />

        <Input
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
          disabled={isLoading}
          label={t("password.label")}
          placeholder={t("password.placeholder")}
        />

        <Input
          name="phone"
          type="text"
          register={register}
          error={errors.phone?.message}
          disabled={isLoading}
          label={t("phone.label")}
          placeholder={t("phone.placeholder")}
        />

        <Input
          name="streetAddress"
          type="text"
          register={register}
          error={errors.streetAddress?.message}
          disabled={isLoading}
          label={t("address.label")}
          placeholder={t("address.placeholder")}
        />

        <Input
          name="postalCode"
          type="text"
          register={register}
          error={errors.postalCode?.message}
          disabled={isLoading}
          label={t("postalCode.label")}
          placeholder={t("postalCode.placeholder")}
        />

        <Input
          name="city"
          type="text"
          register={register}
          error={errors.city?.message}
          disabled={isLoading}
          label={t("city.label")}
          placeholder={t("city.placeholder")}
        />

        <Input
          name="country"
          type="text"
          register={register}
          error={errors.country?.message}
          disabled={isLoading}
          label={t("country.label")}
          placeholder={t("country.placeholder")}
        />

        {session.data?.user.role === UserRole.ADMIN && (
          <Input
            name="admin"
            type="checkbox"
            className="control-checkbox border-0 px-0 space-x-0"
            checked={isAdmin}
            register={register}
            onChange={handleToggleIsAdmin}
            label={t("admin")}
          />
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="text-xl text-white bg-red-500 hover:bg-red-600 transition-colors py-2 rounded-lg font-semibold disabled:cursor-not-allowed w-full"
        >
          {isLoading ? <ButtonSpinner /> : t("save")}
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
