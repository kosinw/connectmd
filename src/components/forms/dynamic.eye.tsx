import Eye from "vectors/eye.icon.svg";
import EyeOff from "vectors/eye.off.icon.svg";

interface DyanmicEyeProps {
  hidden: boolean;
  [x: string]: any;
}

export const DynamicEye: React.FC<DyanmicEyeProps> = ({
  hidden,
  ...restProps
}) => {
  return hidden ? <EyeOff {...restProps} /> : <Eye {...restProps} />;
};
