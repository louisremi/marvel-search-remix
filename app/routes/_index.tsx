import type { LoaderArgs, V2_MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from '@remix-run/react';
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Text } from '../@designSystem/Text';
import { Flex } from '../@designSystem/Flex';
import { styled } from '../@designSystem/stitches.config';
import { AppContent } from '../layout/AppContent';
import { AppHeader } from '../layout/AppHeader';
import { AppWrapper } from '../layout/AppWrapper';
import { Container } from '../layout/Container';
import { searchCharacters } from '../models/character.server';
import { CharacterCard } from '../components/character/CharacterCard';

const MIN_SEARCH_LENGTH = 3;

export const meta: V2_MetaFunction = () => [{ title: 'Marvel Search Remix' }];

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
  const setSearchParamsDebounced = useMemo(
    () => debounce(setSearchParams, 100),
    [setSearchParams],
  );
  const initialSearch = useMemo(
    () => searchParams.get('search') || '',
    [searchParams],
  );
  const [search, setSearch] = useState(initialSearch);
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();

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
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            setSearchParamsDebounced({ search: e.currentTarget.value });
          }}
        />
      </AppHeader>
      <AppContent>
        <Container>
          {navigation.state === 'loading' ? (
            <Text>Searching…</Text>
          ) : 'skipped' in data ? (
            <Text>
              Type at least 3 letters to search for a Marvel character
            </Text>
          ) : data.results.length === 0 ? (
            <Text>No results for this search</Text>
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
