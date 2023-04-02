import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import type { VariantProps } from '@stitches/react';
import type { FC } from 'react';
import { useEffect, useMemo, useRef } from 'react';

import { Text } from '../@designSystem/Text';
import { Flex } from '../@designSystem/Flex';
import { styled } from '../@designSystem/stitches.config';
import { AppContent } from '../layout/AppContent';
import { AppHeader } from '../layout/AppHeader';
import { AppWrapper } from '../layout/AppWrapper';
import { Container } from '../layout/Container';
import type { Character } from '../models/character.server';
import { searchCharacters } from '../models/character.server';

const MIN_SEARCH_LENGTH = 3;

export const meta: V2_MetaFunction = () => [{ title: 'Remix Notes' }];

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';

  return json(
    search.length >= MIN_SEARCH_LENGTH
      ? await searchCharacters({ search })
      : { skipped: true },
  );
}

export default function Index() {
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = useMemo(
    () => searchParams.get('search') || '',
    [searchParams],
  );
  const data = useLoaderData<typeof loader>();

  // focus SearchBox
  useEffect(() => searchBoxRef.current?.focus(), [searchBoxRef]);

  return (
    <AppWrapper>
      <AppHeader>
        <SearchBox
          ref={searchBoxRef}
          placeholder="Who's you favorite hero?"
          type="text"
          value={search}
          onChange={(e) => setSearchParams({ search: e.currentTarget.value })}
        />
      </AppHeader>
      <AppContent>
        <Container>
          {'skipped' in data ? (
            'Type at least 3 letters to search for a Marvel character'
          ) : data.results.length === 0 ? (
            'No results for this search'
          ) : (
            <Flex direction="column" role="list">
              {data.results.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </Flex>
          )}
        </Container>
      </AppContent>
    </AppWrapper>
  );
}

const SearchBox = styled('input', {
  width: '100%',
  padding: '$2',
});

const CharacterCard: FC<{ character: Character }> = ({ character }) => {
  const [name, subtitle] = useMemo(
    () =>
      character.name.split('(').map((part) => part.replace(/\)$/, '').trim()),
    [character.name],
  );

  return (
    <Flex direction="row" gap="3" css={{ padding: '$2' }} role="listitem">
      <Avatar
        src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`}
      />
      <Flex direction="column" gap="1">
        <Text variant="title">{name}</Text>
        <Text colorVariant="muted">{subtitle}</Text>
      </Flex>
    </Flex>
  );
};

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

const Avatar: FC<{ src: string } & VariantProps<typeof StyledImage>> = ({
  src,
  size,
}) => <StyledImage src={src} size={size} />;
