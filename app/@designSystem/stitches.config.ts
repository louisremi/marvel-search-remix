import { gray, red } from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      ...gray,
      ...red,
    },
    space: {
      "0_5": "0.125rem",
      "1": "0.25rem",
      "1_5": "0.375rem",
      "2": "0.5rem",
      "2_5": "0.625rem",
      "3": "0.75rem",
      "3_5": "0.875rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "7": "1.75rem",
      "8": "2rem",
    },
    sizes: {
      "0_5": "0.125rem",
      "1": "0.25rem",
      "1_5": "0.375rem",
      "2": "0.5rem",
      "2_5": "0.625rem",
      "3": "0.75rem",
      "3_5": "0.875rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "7": "1.75rem",
      "8": "2rem",
    },
    fontSizes: {
      1: "1rem",
      1_2: "1.2rem",
      1_5: "1.5rem",
    },
  },
});
