"use server";

import prisma from "@/utils/db";
import routes from "@/utils/routes";
import {
  CreateNewUserSchema,
  CreateNewUserType,
  LoginSchema,
  RegisterSchema,
  TRegisterType,
} from "@/utils/validationShemas";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { getImageUrl } from "./getImageUrl";
import { UserRole } from "@prisma/client";
import { getTranslations } from "next-intl/server";

export const loginAction = async (
  credentials: Record<"email" | "password", string> | undefined,
  locale: string = "en"
) => {
  const t = await getTranslations({ locale, namespace: "messages" });
  const validation = await getTranslations({ locale, namespace: "validation" });

  const result = LoginSchema(validation).safeParse(credentials);

  if (!result.success) {
    return { message: t("unexpectedError"), status: 400 };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (!user) {
      return { message: t("userNotFound"), status: 400 };
    }

    const isValidPassword = await bcrypt.compare(
      result.data.password,
      user.password
    );

    if (!isValidPassword) {
      return {
        message: t("incorrectPassword"),
        status: 400,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      status: 200,
      message: t("loginSuccessful"),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};

export const SignUpAction = async (
  data: TRegisterType,
  locale: string = "en"
) => {
  const t = await getTranslations({ locale, namespace: "messages" });
  const validation = await getTranslations({ locale, namespace: "validation" });
  const result = RegisterSchema(validation).safeParse(data);

  if (!result.success) {
    return { message: t("unexpectedError"), status: 400 };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (user) {
      return {
        status: 409,
        message: t("userAlreadyExists"),
      };
    }
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const createdUser = await prisma.user.create({
      data: {
        name: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
    });

    revalidatePath(`/${locale}${routes.users}`);
    revalidatePath(`/${locale}${routes.users}/${createdUser.id}/edit`);

    return {
      status: 201,
      message: t("accountCreated"),
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};

//Create New User
export const CreateNewUser = async (
  data: CreateNewUserType,
  locale: string = "en"
) => {
  const t = await getTranslations({ locale, namespace: "messages" });
  const validation = await getTranslations({ locale, namespace: "validation" });
  const result = CreateNewUserSchema(validation).safeParse(data);

  if (!result.success) {
    return { message: t("unexpectedError"), status: 400 };
  }

  const fulldata = result.data;

  const imageUrl =
    fulldata.image instanceof File && fulldata.image.size > 0
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

    if (user) {
      return {
        status: 409,
        message: t("userAlreadyExists"),
      };
    }

    const hashedPassword = await bcrypt.hash(fulldata.password, 10);

    const createdUser = await prisma.user.create({
      data: {
        name: fulldata.name,
        email: fulldata.email,
        password: hashedPassword,
        phone: fulldata.phone ?? "",
        streetAddress: fulldata.streetAddress ?? "",
        postalCode: fulldata.postalCode ?? "",
        city: fulldata.city ?? "",
        country: fulldata.country ?? "",
        image: imageUrl ?? "",
        role: fulldata.admin ? UserRole.ADMIN : UserRole.USER,
      },
    });

    revalidatePath(`/${locale}${routes.users}`);
    revalidatePath(`/${locale}${routes.users}/${createdUser.id}/edit`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = createdUser;
    return {
      status: 201,
      message: t("accountCreated"),
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};

//delete user
export const deleteUser = async (id: string, locale: string = "en") => {
  const t = await getTranslations({ locale, namespace: "messages" });

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/${locale}${routes.users}`);
    revalidatePath(`/${locale}${routes.orders}`);
    revalidatePath(`/${locale}${routes.home}`);

    return {
      status: 200,
      message: t("deleteUserSucess"),
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: t("internalServerError"),
    };
  }
};
