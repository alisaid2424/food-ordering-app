import { z } from "zod";
import { useTranslations } from "next-intl";
type T = ReturnType<typeof useTranslations>;

// Create Login Schema
export const LoginSchema = (t: T) => {
  return z.object({
    email: z
      .string({
        required_error: t("email.required"),
        invalid_type_error: t("email.invalid_type"),
      })
      .min(3, { message: t("email.min") })
      .max(200, { message: t("email.max") })
      .email({ message: t("email.invalid_format") }),

    password: z
      .string({
        required_error: t("password.required"),
        invalid_type_error: t("password.invalid_type"),
      })
      .min(6, { message: t("password.min") }),
  });
};

export type TLoginType = z.infer<ReturnType<typeof LoginSchema>>;

// Create Register Schema
export const RegisterSchema = (t: T) => {
  return z
    .object({
      username: z
        .string({
          required_error: t("username.required"),
          invalid_type_error: t("username.invalid_type"),
        })
        .min(3, { message: t("username.min") })
        .max(50, { message: t("username.max") }),

      email: z
        .string({
          required_error: t("email.required"),
          invalid_type_error: t("email.invalid_type"),
        })
        .min(3, { message: t("email.min") })
        .max(200, { message: t("email.max") })
        .email({ message: t("email.invalid_format") }),

      password: z
        .string({
          required_error: t("password.required"),
          invalid_type_error: t("password.invalid_type"),
        })
        .min(6, { message: t("password.min") })
        .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
          message: t("password.special_char"),
        }),

      confirmPassword: z
        .string()
        .min(1, { message: t("confirmPassword.required") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("confirmPassword.mismatch"),
      path: ["confirmPassword"],
    });
};

export type TRegisterType = z.infer<ReturnType<typeof RegisterSchema>>;

// create New User
export const CreateNewUserSchema = (t: T) => {
  return z.object({
    name: z
      .string({
        required_error: t("username.required"),
        invalid_type_error: t("username.invalid_type"),
      })
      .min(3, { message: t("username.min") })
      .max(50, { message: t("username.max") }),

    email: z
      .string({
        required_error: t("email.required"),
        invalid_type_error: t("email.invalid_type"),
      })
      .min(3, { message: t("email.min") })
      .max(200, { message: t("email.max") })
      .email({ message: t("email.invalid_format") }),

    password: z
      .string({
        required_error: t("password.required"),
        invalid_type_error: t("password.invalid_type"),
      })
      .min(6, { message: t("password.min") })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: t("password.special_char"),
      }),

    phone: z
      .string({
        required_error: t("phone.required"),
      })
      .optional()
      .refine((value) => !value || /^\+?[1-9]\d{1,14}$/.test(value), {
        message: t("phone.invalid"),
      }),

    streetAddress: z
      .string({ required_error: t("address.required") })
      .optional(),

    postalCode: z
      .string({ required_error: t("postalCode.required") })
      .optional()
      .refine((value) => !value || /^\d{5,10}$/.test(value), {
        message: t("postalCode.invalid"),
      }),

    city: z.string({ required_error: t("city.required") }).optional(),
    country: z.string({ required_error: t("country.required") }).optional(),
    image: z.instanceof(File).optional(),
    admin: z.boolean().optional(),
  });
};

export type CreateNewUserType = z.infer<ReturnType<typeof CreateNewUserSchema>>;

// Update User Schema
export const UpdateUserSchema = (t: T) => {
  return z.object({
    name: z
      .string({
        required_error: t("username.required"),
        invalid_type_error: t("username.invalid_type"),
      })
      .min(3, { message: t("username.min") })
      .max(50, { message: t("username.max") })
      .optional(),

    email: z
      .string({
        required_error: t("email.required"),
        invalid_type_error: t("email.invalid_type"),
      })
      .min(3, { message: t("email.min") })
      .max(200, { message: t("email.max") })
      .email({ message: t("email.invalid_format") })
      .optional(),

    phone: z
      .string({ required_error: t("phone.required") })
      .optional()
      .refine((value) => !value || /^\+?[1-9]\d{1,14}$/.test(value), {
        message: t("phone.invalid"),
      }),

    streetAddress: z
      .string({ required_error: t("address.required") })
      .optional(),

    postalCode: z
      .string({ required_error: t("postalCode.required") })
      .optional()
      .refine((value) => !value || /^\d{5,10}$/.test(value), {
        message: t("postalCode.invalid"),
      }),

    city: z.string({ required_error: t("city.required") }).optional(),
    country: z.string({ required_error: t("country.required") }).optional(),
    image: z.union([z.instanceof(File), z.string(), z.literal("")]).optional(),
    admin: z.boolean().optional(),
  });
};

export type TUpdateUserType = z.infer<ReturnType<typeof UpdateUserSchema>>;

// Create Category Schema
export const CreateCategorySchema = (t: T) => {
  return z.object({
    name: z
      .string({
        required_error: t("name.required"),
        invalid_type_error: t("name.invalid_type"),
      })
      .min(2, { message: t("name.min") })
      .max(200, { message: t("name.max") }),

    description: z
      .string({
        required_error: t("description.required"),
        invalid_type_error: t("description.invalid_type"),
      })
      .min(10, { message: t("description.min") })
      .max(1000, { message: t("description.max") }),

    image: z.union([z.instanceof(File), z.string(), z.literal("")]).optional(),
  });
};

export type CreateCategoryType = z.infer<
  ReturnType<typeof CreateCategorySchema>
>;

// Update Category Schema
export const UpdateCategorySchema = (t: T) => {
  return z.object({
    id: z.string(),
    name: z
      .string({
        required_error: t("title.required"),
        invalid_type_error: t("title.invalid_type"),
      })
      .min(2, { message: t("title.min") })
      .max(200, { message: t("title.max") })
      .optional(),

    description: z
      .string({
        required_error: t("description.required"),
        invalid_type_error: t("description.invalid_type"),
      })
      .min(10, { message: t("description.min") })
      .max(1000, { message: t("description.max") })
      .optional(),

    image: z.union([z.instanceof(File), z.string(), z.literal("")]).optional(),
  });
};

export type UpdateCategoryType = z.infer<
  ReturnType<typeof UpdateCategorySchema>
>;

// Create Product Schema
export const CreateProductSchema = (t: T) => {
  return z.object({
    name: z
      .string({
        required_error: t("name.required"),
        invalid_type_error: t("name.invalid_type"),
      })
      .min(2, { message: t("name.min") })
      .max(200, { message: t("name.max") }),

    description: z
      .string({
        required_error: t("description.required"),
        invalid_type_error: t("description.invalid_type"),
      })
      .min(10, { message: t("description.min") })
      .max(1000, { message: t("description.max") }),

    image: z.instanceof(File, {
      message: t("image.invalid_type"),
    }),

    basePrice: z.string().min(1, {
      message: t("basePrice.required"),
    }),

    categoryId: z.string().min(1, {
      message: t("category.required"),
    }),

    sizes: z
      .array(
        z.object({
          name: z.string().min(1, { message: t("size.name.required") }),
          price: z.number().nonnegative({
            message: t("size.price.nonnegative"),
          }),
        })
      )
      .optional(),

    extras: z
      .array(
        z.object({
          name: z.string().min(1, { message: t("extra.name.required") }),
          price: z.number().nonnegative({
            message: t("extra.price.nonnegative"),
          }),
        })
      )
      .optional(),
  });
};

export type CreateProductType = z.infer<ReturnType<typeof CreateProductSchema>>;

// Update Product Schema
export const UpdateProductSchema = (t: T) => {
  return z.object({
    id: z.string(),

    name: z
      .string({
        required_error: t("name.required"),
        invalid_type_error: t("name.invalid_type"),
      })
      .min(2, { message: t("name.min") })
      .max(200, { message: t("name.max") })
      .optional(),

    description: z
      .string({
        required_error: t("description.required"),
        invalid_type_error: t("description.invalid_type"),
      })
      .min(10, { message: t("description.min") })
      .max(1000, { message: t("description.max") })
      .optional(),

    image: z
      .union([
        z.instanceof(File, {
          message: t("image.invalid_type"),
        }),
        z.string(),
        z.literal(""),
      ])
      .optional(),

    basePrice: z
      .union([
        z
          .string()
          .min(1, {
            message: t("basePrice.required"),
          })
          .refine((val) => parseFloat(val) > 0, {
            message: t("basePrice.must_be_positive"),
          }),
        z.number().positive({ message: t("basePrice.must_be_positive") }),
      ])
      .optional(),

    categoryId: z
      .string()
      .min(1, { message: t("category.required") })
      .optional(),

    sizes: z
      .array(
        z.object({
          name: z.string().min(1, { message: t("size.name.required") }),
          price: z.number().nonnegative({
            message: t("size.price.nonnegative"),
          }),
        })
      )
      .optional(),

    extras: z
      .array(
        z.object({
          name: z.string().min(1, { message: t("extra.name.required") }),
          price: z.number().nonnegative({
            message: t("extra.price.nonnegative"),
          }),
        })
      )
      .optional(),
  });
};

export type UpdateProductType = z.infer<ReturnType<typeof UpdateProductSchema>>;
