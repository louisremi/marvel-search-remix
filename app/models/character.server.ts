import { marvelApi } from '../services/marvelApi.js';

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls: string[];
  thumbnail: {
    path: string;
    extension: 'jpg';
  };
}

export interface GenericResponseData<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}

const DEFAULT_LIMIT = 20;

export async function searchCharacters({
  search,
  limit = DEFAULT_LIMIT,
}: {
  search: string;
  limit?: number;
}): Promise<GenericResponseData<Character>> {
  const emptyResponse = {
    offset: 0,
    limit: Number(limit),
    total: 0,
    count: 0,
    results: [],
  };

  try {
    const json = await marvelApi
      .get('characters', {
        searchParams: {
          limit,
          nameStartsWith: search,
        },
      })
      .json<{ data: GenericResponseData<Character> }>();

    return json?.data;

    // TODO: handle errors
  } catch (e) {
    console.error(e);

    return emptyResponse;
  }
}
