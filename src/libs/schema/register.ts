import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email is invalid.")
    .required("Email cannot be blank."),
  password: yup
    .string()
    .min(6, "Password is too short (minimum is 6 characters).")
    .required("Password cannot be blank."),
  displayName: yup.string().required("Display name cannot be blank."),
  rememberMe: yup.boolean(),
});

export type RegisterFormSchema = yup.InferType<typeof schema>;
