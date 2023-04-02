import { ChevronLeftIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import type { LoaderArgs } from '@remix-run/node';
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useRouteError,
} from '@remix-run/react';
import { json } from '@remix-run/server-runtime';
import { Avatar } from 'app/@designSystem/Avatar';
import { Box } from 'app/@designSystem/Box';
import { useParseCharacterName } from 'app/components/character/useParseCharacterName';
import { useMemo } from 'react';
import invariant from 'tiny-invariant';

import { Button } from '../@designSystem/Buttons';
import { Flex } from '../@designSystem/Flex';
import { Text } from '../@designSystem/Text';
import { AppContent } from '../layout/AppContent';
import { AppHeader } from '../layout/AppHeader';
import { AppWrapper } from '../layout/AppWrapper';
import { Container } from '../layout/Container';
import { getCharacter } from '../models/character.server';

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.characterId, 'missing characterId parameter');
  const data = await getCharacter(params.characterId);

  if (!data.results.length) {
    throw new Response('Not Found', { status: 404 });
  }
  return json({ character: data.results[0] });
}

export default function CharacterDetailsPage() {
  const { character } = useLoaderData<typeof loader>();
  const { fullname, disambiguation } = useParseCharacterName(character.name);
  const detailsUrl = useMemo(
    () =>
      character.urls.find(({ type }) => type === 'details') ||
      character.urls[0],
    [character.urls],
  );
  const navigate = useNavigate();

  return (
    <AppWrapper>
      <AppHeader>
        <Flex direction="row" align="center" gap="2">
          <Button onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </Button>
          <Text>{character.name}</Text>
        </Flex>
      </AppHeader>
      <AppContent>
        <Container>
          <Flex direction="row" gap="4">
            <Avatar
              src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`}
              size="l"
            />
            <Flex direction="column" gap="1">
              <Text variant="title">{fullname}</Text>
              <Text colorVariant="muted">{disambiguation}</Text>
              {detailsUrl && (
                <Text
                  as="a"
                  href={detailsUrl.url}
                  target="_blank"
                  css={{ color: 'inherit' }}
                >
                  Official page{' '}
                  <ExternalLinkIcon style={{ verticalAlign: 'middle' }} />
                </Text>
              )}
            </Flex>
          </Flex>
        </Container>

        <Container>
          <Text as="h5" css={{ margin: 0, fontWeight: '$semibold' }}>
            Description
          </Text>
          {character.description ? (
            <Text>{character.description}</Text>
          ) : (
            <Text colorVariant="muted" css={{ fontStyle: 'italic' }}>
              No description
            </Text>
          )}
        </Container>
        <Container>
          <Text as="h5" css={{ margin: 0, fontWeight: '$semibold' }}>
            External links
          </Text>
          <Box as="ul" css={{ margin: 0 }}>
            {character.urls.map(({ type, url }) => (
              <li key={url}>
                <Text as="a" href={url} target="_blank">
                  {type}
                </Text>{' '}
                <ExternalLinkIcon style={{ verticalAlign: 'middle' }} />
              </li>
            ))}
          </Box>
        </Container>
      </AppContent>
    </AppWrapper>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Character not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
