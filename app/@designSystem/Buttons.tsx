import { styled } from './stitches.config';

export const Button = styled('button', {
  display: 'flex',
  alignContent: 'center',
  padding: '$1 $1_5',
  cursor: 'pointer',
  borderRadius: '$m',
  border: '1px solid transparent',
  '&:hover': {
    backgroundColor: '$gray6',
  },
});
