"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useState } from "react";
import Input from "./Input";
import ButtonSpinner from "../ButtonSpinner";
import { TUpdateUserType, UpdateUserSchema } from "@/utils/validationShemas";
import { updateProfile } from "@/server/actions/profile";
import { toast } from "react-toastify";
import { UserRole } from "@prisma/client";
import UploadImage from "../UploadImage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import routes from "@/utils/routes";

interface EditUserFormProps {
  user: Session["user"];
}

const EditUserForm = ({ user }: EditUserFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(user.role === UserRole.ADMIN);
  const session = useSession();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TUpdateUserType>({
    mode: "onBlur",
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      streetAddress: user.streetAddress ?? "",
      postalCode: user.postalCode ?? "",
      city: user.city ?? "",
      country: user.country ?? "",
      image: user.image ?? "",
    },
  });

  const formSubmitHandler: SubmitHandler<TUpdateUserType> = async (data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const res = await updateProfile(data);
      if (res.status && res.message) {
        if (res.status === 200) {
          if (session.data?.user.role === UserRole.ADMIN) {
            router.push(`${routes.users}?pageNumber=1`);
          } else {
            router.push(routes.profile);
          }
          toast.success(res.message);
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
      <UploadImage<TUpdateUserType>
        currentImage={user.image ?? ""}
        altImage={user.name ?? "User"}
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
          label="Name"
          placeholder="Enter Your Username"
        />

        <Input
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
          disabled={isLoading}
          label="Email"
          placeholder="Enter Your Email"
        />

        <Input
          name="phone"
          type="text"
          register={register}
          error={errors.phone?.message}
          disabled={isLoading}
          label="Phone"
          placeholder="Enter Your Phone Number"
        />

        <Input
          name="streetAddress"
          type="text"
          register={register}
          error={errors.streetAddress?.message}
          disabled={isLoading}
          label="Street Address"
          placeholder="Enter Your Address"
        />

        <Input
          name="postalCode"
          type="text"
          register={register}
          error={errors.postalCode?.message}
          disabled={isLoading}
          label="Postal Code"
          placeholder="Enter Your Postal Code"
        />

        <Input
          name="city"
          type="text"
          register={register}
          error={errors.city?.message}
          disabled={isLoading}
          label="City"
          placeholder="Enter Your City"
        />

        <Input
          name="country"
          type="text"
          register={register}
          error={errors.country?.message}
          disabled={isLoading}
          label="Country"
          placeholder="Enter Your Country"
        />

        {session.data?.user.role === UserRole.ADMIN && (
          <Input
            name="admin"
            type="checkbox"
            className="control-checkbox border-0 px-0 space-x-0"
            checked={isAdmin}
            register={register}
            onChange={handleToggleIsAdmin}
            label="Admin"
          />
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="text-xl text-white bg-red-500 hover:bg-red-600 transition-colors py-2 rounded-lg font-semibold disabled:cursor-not-allowed w-full"
        >
          {isLoading ? <ButtonSpinner /> : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
