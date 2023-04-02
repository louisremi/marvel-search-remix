import { Link } from '@remix-run/react';
import { styled } from 'app/@designSystem/stitches.config';
import type { FC } from 'react';

import { Avatar } from '../../@designSystem/Avatar';
import { Flex } from '../../@designSystem/Flex';
import { Text } from '../../@designSystem/Text';
import type { Character } from '../../models/character.server';
import { useParseCharacterName } from './useParseCharacterName';

export const CharacterCard: FC<{ character: Character }> = ({ character }) => {
  const { fullname, disambiguation } = useParseCharacterName(character.name);

  return (
    <StyledLink to={`/characters/${character.id}`}>
      <CardWrapper direction="row" gap="3" role="listitem">
        <Avatar
          src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`}
          size="m"
        />
        <Flex direction="column" gap="1">
          <Text variant="title">{fullname}</Text>
          <Text colorVariant="muted">{disambiguation || ''}</Text>
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
