import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email is invalid.")
    .required("Email cannot be blank."),
  password: yup.string().required("Password cannot be blank."),
  rememberMe: yup.boolean(),
});

export type LoginFormSchema = yup.InferType<typeof schema>;
