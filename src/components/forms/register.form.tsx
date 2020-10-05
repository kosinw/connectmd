import { useToast } from "@chakra-ui/core";
import { Formik, Form, FormikHelpers, Field } from "formik";
import { useAuth } from "hooks/firebase";
import { useRouter } from "next/router";
import { EmailField } from "components/forms/email.field";
import { PasswordField } from "components/forms/password.field";
import { RememberMeField } from "components/forms/remember.me.field";
import { SubmitButton } from "components/forms/submit.button";
import { schema, RegisterFormSchema } from "libs/schema/register";

export const RegisterForm: React.FC<{}> = () => {
  const { register } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const handleFormSubmit = async (
    values: RegisterFormSchema,
    helpers: FormikHelpers<RegisterFormSchema>
  ) => {
    try {
      await register(
        values.email,
        values.password,
        values.displayName,
        values.rememberMe
      );
      router.push("/");
    } catch (ex) {
      toast({
        title: "Registration unsuccessful.",
        description: ex.message,
        isClosable: true,
        status: "error",
      });
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        displayName: "",
        rememberMe: false,
      }}
      validationSchema={schema}
      onSubmit={handleFormSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col w-full space-y-5">
          <div className="flex flex-col w-full space-y-4">
            <fieldset className="w-full">
              <label
                className={`${
                  !!touched.displayName && errors.displayName && "text-red-600"
                }`}
                htmlFor="displayName"
              >
                Display name
              </label>
              <Field
                className={`w-full block form-input ${
                  !!touched.displayName &&
                  errors.displayName &&
                  "border-red-600"
                }`}
                type="text"
                name="displayName"
                autoComplete="displayName"
              />
              <p className="text-sm mt-1 italic leading-5 text-red-600">
                {!!touched.displayName && errors.displayName
                  ? errors.displayName
                  : ""}
              </p>
            </fieldset>
            <EmailField error={touched.email && errors.email} />
            <PasswordField error={touched.password && errors.password} />
          </div>
          <div className="flex flex-row justify-between">
            <RememberMeField />
          </div>
          <SubmitButton isSubmitting={isSubmitting}>Sign up</SubmitButton>
        </Form>
      )}
    </Formik>
  );
};
