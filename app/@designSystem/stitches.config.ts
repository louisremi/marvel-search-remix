import { gray, red } from '@radix-ui/colors';
import { createStitches } from '@stitches/react';

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
      '0_5': '0.125rem',
      '1': '0.25rem',
      '1_5': '0.375rem',
      '2': '0.5rem',
      '2_5': '0.625rem',
      '3': '0.75rem',
      '3_5': '0.875rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
    },
    sizes: {
      '0_5': '0.125rem',
      '1': '0.25rem',
      '1_5': '0.375rem',
      '2': '0.5rem',
      '2_5': '0.625rem',
      '3': '0.75rem',
      '3_5': '0.875rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
    },
    radii: {
      s: '10%',
      m: '20%',
      l: '50%',
    },
    fonts: {
      title: '"Anton", sans-serif',
      text: '"Inter", sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSizes: {
      title: '20px',
      text: '13px',
      caption: '12px',
    },
    fontWeights: {
      thin: '100',
      extralight: '200',
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeights: {
      title: '30px',
      button: '19px',
      text: '18px',
      caption: '16px',
    },
  },
  utils: {
    size: (value: string) => ({
      width: value,
      height: value,
    }),
  },
});
