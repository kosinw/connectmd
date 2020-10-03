import { Spinner } from "@chakra-ui/core";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  isSubmitting,
}) => {
  return (
    <button
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      className={`w-full py-3 rounded-lg text-center bg-blue-600 text-white focus:outline-none hover:bg-blue-700 ${
        isSubmitting && "opacity-50 cursor-not-allowed"
      }`}
      type="submit"
    >
      <div className="flex flex-col items-center h-full">
        {isSubmitting ? <Spinner size="md" /> : children}
      </div>
    </button>
  );
};
