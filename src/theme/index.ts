import { extendTheme } from "@chakra-ui/core";
import defaultTheme from "@chakra-ui/theme";

const overrides = {
  fonts: {
    body: `Inter, ${defaultTheme.fonts.body}`,
    heading: `Inter, ${defaultTheme.fonts.heading}`,
  },
  colors: {
    brand: "#0062FF",
  },
};

export const theme = extendTheme(overrides);
