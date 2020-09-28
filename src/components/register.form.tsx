import { useToast } from "@chakra-ui/core";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useAuth } from "hooks/firebase";
import { useRouter } from "next/router";
import { useState } from "react";

import Eye from "vectors/eye.icon.svg";
import EyeOff from "vectors/eye.off.icon.svg";

interface RegisterFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const RegisterForm: React.FC<{}> = () => {
  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const { register } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [hidden, setHidden] = useState<boolean>(true);

  const handleFormSubmit = async (
    values: RegisterFormValues,
    helpers: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      await register(values.email, values.password, values.rememberMe);
      router.push("/");
    } catch (ex) {
      toast({
        title: "Registration unsuccessful.",
        description: ex.message,
        duration: 4000,
        isClosable: true,
        status: "error",
      });
    }
  };

  const CurrentEye: React.FC<{ [x: string]: any }> = ({ ...restProps }) => {
    return hidden ? <Eye {...restProps} /> : <EyeOff {...restProps} />;
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-full space-y-5">
            <div className="flex flex-col w-full space-y-4">
              <fieldset className="w-full">
                <label htmlFor="email">Email address</label>
                <Field
                  className="w-full block form-input"
                  type="email"
                  name="email"
                />
              </fieldset>
              <fieldset className="w-full">
                <label htmlFor="password">Password</label>
                <div className="relative">
                  <Field
                    className="w-full block form-input pr-10"
                    type={hidden ? "password" : "text"}
                    name="password"
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <button
                      onClick={(e) => setHidden(!hidden)}
                      type="button"
                      className="p-1 focus:outline-none"
                    >
                      <CurrentEye className="w-auto h-5 fill-current" />
                    </button>
                  </span>
                </div>
              </fieldset>
            </div>
            <div className="flex flex-row justify-between">
              <fieldset className="flex flex-row items-center w-auto space-x-2">
                <Field
                  type="checkbox"
                  className="form-checkbox text-blue-600 cursor-pointer"
                  name="rememberMe"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm leading-5 text-gray-800"
                >
                  Remember me
                </label>
              </fieldset>
            </div>

            <button
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg text-center bg-blue-600 text-white focus:outline-none hover:bg-blue-700 ${
                isSubmitting && "opacity-50 cursor-not-allowed"
              }`}
              type="submit"
            >
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
