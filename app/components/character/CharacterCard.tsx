import { Link } from '@remix-run/react';
import { styled } from 'app/@designSystem/stitches.config';
import type { FC } from 'react';
import { useMemo } from 'react';

import { Avatar } from '../../@designSystem/Avatar';
import { Flex } from '../../@designSystem/Flex';
import { Text } from '../../@designSystem/Text';
import type { Character } from '../../models/character.server';

export const CharacterCard: FC<{ character: Character }> = ({ character }) => {
  const [name, subtitle] = useMemo(
    () =>
      character.name.split('(').map((part) => part.replace(/\)$/, '').trim()),
    [character.name],
  );

  return (
    <StyledLink to={`/characters/${character.id}`}>
      <CardWrapper direction="row" gap="3" role="listitem">
        <Avatar
          src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`}
        />
        <Flex direction="column" gap="1">
          <Text variant="title">{name}</Text>
          <Text colorVariant="muted">{subtitle}</Text>
        </Flex>
      </CardWrapper>
    </StyledLink>
  );
};

const StyledLink = styled(Link, {
  color: 'inherit',
  textDecoration: 'inherit',
  '&:hover > *': {
    backgroundColor: '$gray4',
  },
});

const CardWrapper = styled(Flex, {
  padding: '$2',
  borderRadius: '$s',
});
