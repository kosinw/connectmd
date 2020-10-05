import { Field } from "formik";

interface EmailFieldProps {
  error?: string;
}

export const EmailField: React.FC<EmailFieldProps> = ({ error }) => {
  return (
    <fieldset className="w-full">
      <label className={`${!!error && "text-red-600"}`} htmlFor="email">
        Email
      </label>
      <Field
        className={`w-full block form-input ${!!error && "border-red-600"}`}
        type="text"
        name="email"
        autoComplete="email"
      />
      <p className="text-sm mt-1 italic leading-5 text-red-600">
        {!!error ? error : ""}
      </p>
    </fieldset>
  );
};
