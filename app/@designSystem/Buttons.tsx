import { styled } from './stitches.config';

export const Button = styled('button', {
  cursor: 'pointer',
  borderRadius: '$m',
  border: '1px solid transparent',
  '&:hover': {
    backgroundColor: '$gray6',
  },
});
