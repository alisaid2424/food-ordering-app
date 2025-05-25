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

export const loginAction = async (
  credentials: Record<"email" | "password", string> | undefined
) => {
  const result = LoginSchema.safeParse(credentials);

  if (!result.success) {
    return { message: "Invalid Email Or Password", status: 400 };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (!user) {
      return { message: "User Not Found", status: 400 };
    }

    const isValidPassword = await bcrypt.compare(
      result.data.password,
      user.password
    );

    if (!isValidPassword) {
      return {
        message: "User Not Found",
        status: 400,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      status: 200,
      message: "Authenticated",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
};

export const SignUpAction = async (data: TRegisterType) => {
  const result = RegisterSchema.safeParse(data);

  if (!result.success) {
    return { message: "Invalid Data", status: 400 };
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
        message: "User already exists.",
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

    revalidatePath(routes.users);
    revalidatePath(`${routes.users}/${createdUser.id}/edit`);

    return {
      status: 201,
      message: "Account created successfully",
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
      message: "internal server error",
    };
  }
};

//Create New User
export const CreateNewUser = async (data: CreateNewUserType) => {
  const result = CreateNewUserSchema.safeParse(data);

  if (!result.success) {
    return { message: "Invalid Data", status: 400 };
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
        message: "User already exists.",
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

    revalidatePath(routes.users);
    revalidatePath(`${routes.users}/${createdUser.id}/edit`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = createdUser;
    return {
      status: 201,
      message: "Account created successfully",
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
};

//delete user
export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    revalidatePath(routes.users);
    revalidatePath(routes.orders);
    revalidatePath(routes.home);

    return {
      status: 200,
      message: "User deleted successfull",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "internal server error",
    };
  }
};
