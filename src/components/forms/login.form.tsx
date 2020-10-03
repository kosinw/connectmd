import { useToast } from "@chakra-ui/core";
import { Formik, Form, FormikHelpers } from "formik";
import { useAuth } from "hooks/firebase";
import { useRouter } from "next/router";
import { EmailField } from "components/forms/email.field";
import { PasswordField } from "components/forms/password.field";
import { RememberMeField } from "components/forms/remember.me.field";
import { SubmitButton } from "components/forms/submit.button";
import { schema, LoginFormSchema } from "libs/schema/login";

import Link from "next/link";

export const LoginForm: React.FC<{}> = () => {
  const { login } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const handleFormSubmit = async (
    values: LoginFormSchema,
    helpers: FormikHelpers<LoginFormSchema>
  ) => {
    try {
      await login(values.email, values.password, values.rememberMe);
      router.push("/");
    } catch (ex) {
      if (ex.code.includes("auth")) {
        toast({
          title: "Sign in unsuccessful.",
          description: "Invalid email or password.",
          isClosable: true,
          status: "error",
        });
      } else {
        toast({
          title: "Sign in unsuccessful.",
          description: ex.message,
          isClosable: true,
          status: "error",
        });
      }
    }
  };

  return (
    <Formik
      initialValues={{}}
      validationSchema={schema}
      onSubmit={handleFormSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col w-full space-y-5">
          <div className="flex flex-col w-full space-y-4">
            <EmailField error={touched.email && errors.email} />
            <PasswordField error={touched.password && errors.password} />
          </div>
          <div className="flex flex-row justify-between">
            <RememberMeField />
            <Link href="/auth/forgot">
              <a className="w-auto text-sm font-medium leading-5 text-blue-600">
                Forgot your password?
              </a>
            </Link>
          </div>
          <SubmitButton isSubmitting={isSubmitting}>Sign in</SubmitButton>
        </Form>
      )}
    </Formik>
  );
};
