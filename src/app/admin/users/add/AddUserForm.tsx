"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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

const AddUserForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const session = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateNewUserType>({
    mode: "onBlur",
    resolver: zodResolver(CreateNewUserSchema),
  });

  const formSubmitHandler: SubmitHandler<CreateNewUserType> = async (data) => {
    if (isLoading) return;
    try {
      setIsLoading(true);

      const res = await CreateNewUser(data);
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
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
          disabled={isLoading}
          label="Password"
          placeholder="Enter Your Password"
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
          {isLoading ? <ButtonSpinner /> : "Add User"}
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
