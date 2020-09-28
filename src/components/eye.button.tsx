import Eye from "vectors/eye.icon.svg";
import EyeOff from "vectors/eye.off.icon.svg";

export const EyeButton: (hidden) => React.FC<{ [x: string]: any }> = (
  hidden
) => ({ ...restProps }) => {
  return hidden ? <EyeOff {...restProps} /> : <Eye {...restProps} />;
};
