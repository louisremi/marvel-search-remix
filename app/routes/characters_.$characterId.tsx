import { ChevronLeftIcon } from '@radix-ui/react-icons';
import type { LoaderArgs } from '@remix-run/node';
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigate,
  useRouteError,
} from '@remix-run/react';
import { json } from '@remix-run/server-runtime';
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
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <AppWrapper>
      <AppHeader>
        <Flex direction="row" gap="2">
          <Button onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </Button>
          <Text variant="title">{data.character.name}</Text>
        </Flex>
      </AppHeader>
      <AppContent>
        <Container>Character</Container>
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
