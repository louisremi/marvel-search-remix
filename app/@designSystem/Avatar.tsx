import type { VariantProps } from '@stitches/react';
import type { FC } from 'react';

import { styled } from './stitches.config';

export const Avatar: FC<{ src: string } & VariantProps<typeof StyledImage>> = ({
  src,
  size,
}) => <StyledImage src={src} size={size} />;

const StyledImage = styled('img', {
  flexShrink: 0,
  borderRadius: '$m',
  variants: {
    size: {
      m: { size: '50px' },
    },
  },
  defaultVariants: { size: 'm' },
});
