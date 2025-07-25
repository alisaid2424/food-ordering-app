"use server";

import prisma from "@/utils/db";
import routes from "@/utils/routes";
import { TUpdateUserType, UpdateUserSchema } from "@/utils/validationShemas";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getImageUrl } from "./getImageUrl";
import { getTranslations } from "next-intl/server";

export const updateProfile = async (
  data: TUpdateUserType,
  locale: string = "en"
) => {
  const t = await getTranslations({ locale, namespace: "messages" });
  const validation = await getTranslations({ locale, namespace: "validation" });

  const result = UpdateUserSchema(validation).safeParse(data);

  if (!result.success) {
    return { message: t("unexpectedError"), status: 400 };
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
        message: t("userNotFound"),
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

    revalidatePath(`/${locale}${routes.profile}`);
    revalidatePath(`/${locale}${routes.admin}`);
    revalidatePath(`/${locale}${routes.users}`);
    revalidatePath(`/${locale}${routes.users}/${user.id}/edit`);

    return {
      status: 200,
      message: t("updateProfileSucess"),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};
