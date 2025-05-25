import { z } from "zod";

// Create Login Schema
export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email should be of type string",
    })
    .min(3, { message: "email should be at least 3 characters long" })
    .max(200, { message: "email should be less 200 characters" })
    .email({ message: "email is not valid" }),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password should be of type string",
    })
    .min(6, { message: "password should be at least 6 characters long" }),
});

export type TLoginType = z.infer<typeof LoginSchema>;

// Create Register Schema
export const RegisterSchema = z
  .object({
    username: z
      .string({
        required_error: "username is required",
        invalid_type_error: "username should be of type string",
      })
      .min(3, { message: "username should be at least 3 characters long" })
      .max(50, { message: "username should be less 50 characters" }),
    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "email should be of type string",
      })
      .min(3, { message: "email should be at least 3 characters long" })
      .max(200, { message: "email should be less 200 characters" })
      .email({ message: "email is not valid" }),
    password: z
      .string({
        required_error: "password is required",
        invalid_type_error: "password should be of type string",
      })
      .min(6, { message: "password should be at least 6 characters long" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Password should contain at least 1 special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Password and Confirm Password does not match",
    path: ["confirmPassword"],
  });

export type TRegisterType = z.infer<typeof RegisterSchema>;

// create New User
export const CreateNewUserSchema = z.object({
  name: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username should be of type string",
    })
    .min(3, { message: "username should be at least 3 characters long" })
    .max(50, { message: "username should be less 50 characters" }),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email should be of type string",
    })
    .min(3, { message: "email should be at least 3 characters long" })
    .max(200, { message: "email should be less 200 characters" })
    .email({ message: "email is not valid" }),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password should be of type string",
    })
    .min(6, { message: "password should be at least 6 characters long" })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: "Password should contain at least 1 special character",
    }),
  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .trim()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return /^\+?[1-9]\d{1,14}$/.test(value);
      },
      {
        message: "Please enter a valid phone number",
      }
    ),
  streetAddress: z
    .string({
      required_error: "Address is required",
    })
    .optional(),
  postalCode: z
    .string({
      required_error: "Postal code is required",
    })
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return /^\d{5,10}$/.test(value);
      },
      {
        message: "Please enter a valid postal code",
      }
    ),
  city: z
    .string({
      required_error: "City is required",
    })
    .optional(),
  country: z
    .string({
      required_error: "Country is required",
    })
    .optional(),
  image: z.instanceof(File).optional(),
  admin: z.boolean().optional(),
});

export type CreateNewUserType = z.infer<typeof CreateNewUserSchema>;

// Update User Schema
export const UpdateUserSchema = z.object({
  name: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username should be of type string",
    })
    .min(3, { message: "username should be at least 3 characters long" })
    .max(50, { message: "username should be less 50 characters" })
    .optional(),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email should be of type string",
    })
    .min(3, { message: "email should be at least 3 characters long" })
    .max(200, { message: "email should be less 200 characters" })
    .email({ message: "email is not valid" })
    .optional(),
  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .trim()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return /^\+?[1-9]\d{1,14}$/.test(value);
      },
      {
        message: "Please enter a valid phone number",
      }
    ),
  streetAddress: z
    .string({
      required_error: "Address is required",
    })
    .optional(),
  postalCode: z
    .string({
      required_error: "Postal code is required",
    })
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        return /^\d{5,10}$/.test(value);
      },
      {
        message: "Please enter a valid postal code",
      }
    ),
  city: z
    .string({
      required_error: "City is required",
    })
    .optional(),
  country: z
    .string({
      required_error: "Country is required",
    })
    .optional(),
  image: z.union([z.instanceof(File), z.string(), z.literal("")]).optional(),
  admin: z.boolean().optional(),
});

export type TUpdateUserType = z.infer<typeof UpdateUserSchema>;

// Create Category Schema
export const CreateCategorySchema = z.object({
  name: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be of type string",
    })
    .min(2, { message: "title should be at least 2 characters long" })
    .max(200, { message: "title should be less 200 characters" }),
  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description should be of type string",
    })
    .min(10)
    .max(1000),
  image: z.union([z.instanceof(File), z.string(), z.literal("")]).optional(),
});

export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;

// Update Category Schema
export const UpdateCategorySchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be of type string",
    })
    .min(2, { message: "title should be at least 2 characters long" })
    .max(200, { message: "title should be less 200 characters" })
    .optional(),
  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description should be of type string",
    })
    .min(10)
    .max(1000)
    .optional(),
  image: z.union([z.instanceof(File), z.string(), z.literal("")]).optional(),
});

export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>;

// Create Product Schema
export const CreateProductSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name should be of type string",
    })
    .min(2, { message: "Name should be at least 2 characters long" })
    .max(200, { message: "Name should be less 200 characters" }),
  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description should be of type string",
    })
    .min(10)
    .max(1000),
  image: z.instanceof(File),
  basePrice: z.string().min(1, {
    message: "Base Price is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
  sizes: z
    .array(
      z.object({
        name: z.string().min(1),
        price: z.number().nonnegative(),
      })
    )
    .optional(),
  extras: z
    .array(
      z.object({
        name: z.string().min(1),
        price: z.number().nonnegative(),
      })
    )
    .optional(),
});

export type CreateProductType = z.infer<typeof CreateProductSchema>;

// Update Product Schema
export const UpdateProductSchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name should be of type string",
    })
    .min(2, { message: "Name should be at least 2 characters long" })
    .max(200, { message: "Name should be less 200 characters" })
    .optional(),
  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description should be of type string",
    })
    .min(10)
    .max(1000)
    .optional(),
  image: z.union([z.instanceof(File), z.string(), z.literal("")]).optional(),
  basePrice: z.union([z.string(), z.number()]).optional(),
  categoryId: z
    .string()
    .min(1, {
      message: "Category is required",
    })
    .optional(),
  sizes: z
    .array(
      z.object({
        name: z.string().min(1),
        price: z.number().nonnegative(),
      })
    )
    .optional(),
  extras: z
    .array(
      z.object({
        name: z.string().min(1),
        price: z.number().nonnegative(),
      })
    )
    .optional(),
});

export type UpdateProductType = z.infer<typeof UpdateProductSchema>;
