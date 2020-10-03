import { Field } from "formik";

export const RememberMeField: React.FC<{}> = ({}) => {
  return (
    <fieldset className="flex flex-row items-center w-auto space-x-2">
      <Field
        type="checkbox"
        className="form-checkbox text-blue-600 cursor-pointer"
        name="rememberMe"
      />
      <label htmlFor="rememberMe" className="text-sm leading-5 text-gray-800">
        Remember me
      </label>
    </fieldset>
  );
};
