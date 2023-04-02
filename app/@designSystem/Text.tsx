import { styled } from './stitches.config';

export const Text = styled('span', {
  variants: {
    variant: {
      title: {
        fontWeight: '$medium',
        fontSize: '$title',
        lineHeight: '$title',
        fontFamily: '$title',
      },
      textRegular: {
        fontWeight: '$regular',
        fontSize: '$text',
        lineHeight: '$text',
        fontFamily: '$text',
      },
      textMedium: {
        fontWeight: '$medium',
        fontSize: '$text',
        lineHeight: '$text',
        fontFamily: '$text',
      },
      caption: {
        fontSize: '$caption',
        letterSpacing: '$caption',
        lineHeight: '$caption',
        color: '$gray10',
      },
    },
    colorVariant: {
      default: {},
      muted: {
        color: '$gray10',
      },
    },
    truncate: {
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
  },
  defaultVariants: {
    variant: 'textRegular',
  },
});
