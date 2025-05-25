"use server";

import prisma from "@/utils/db";
import routes from "@/utils/routes";
import { TUpdateUserType, UpdateUserSchema } from "@/utils/validationShemas";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getImageUrl } from "./getImageUrl";

export const updateProfile = async (data: TUpdateUserType) => {
  const result = UpdateUserSchema.safeParse(data);

  if (!result.success) {
    return { message: "Invalid Data", status: 400 };
  }

  const fulldata = result.data;

  const imageUrl =
    typeof fulldata.image === "string"
      ? fulldata.image
      : fulldata.image instanceof File && fulldata.image.size > 0
      ? await getImageUrl({
          imageFile: fulldata.image,
          publicId: fulldata.image.name,
          pathName: "profile_images",
        })
      : undefined;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: fulldata.email,
      },
    });
    if (!user) {
      return {
        message: "User Not Found",
        status: 401,
      };
    }

    const { admin, ...rest } = fulldata;
    await prisma.user.update({
      where: { email: user.email },
      data: {
        ...rest,
        image: imageUrl ?? user.image,
        role: admin ? UserRole.ADMIN : UserRole.USER,
      },
    });

    revalidatePath(routes.profile);
    revalidatePath(routes.admin);
    revalidatePath(routes.users);
    revalidatePath(`${routes.users}/${user.id}/edit`);

    return {
      status: 200,
      message: "Profile updated successfull",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
};
