import { Field } from "formik";
import { useState } from "react";
import { DynamicEye } from "components/forms/dynamic.eye";

interface PasswordFieldProps {
  error?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({ error }) => {
  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <fieldset className="w-full">
      <label className={`${!!error && "text-red-600"}`} htmlFor="password">
        Password
      </label>
      <div className="relative">
        <Field
          className={`w-full block form-input pr-10 ${
            !!error && "border-red-600"
          }`}
          type={hidden ? "password" : "text"}
          name="password"
          autoComplete="password"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
          <button
            onClick={(e) => setHidden(!hidden)}
            type="button"
            className="p-1 focus:outline-none"
          >
            <DynamicEye hidden={hidden} className="w-auto h-5 fill-current" />
          </button>
        </span>
      </div>
      <p className="text-sm mt-1 italic leading-5 text-red-600">
        {!!error ? error : ""}
      </p>
    </fieldset>
  );
};
