import { useMemo } from 'react';

export const useParseCharacterName = (
  name: string,
): { fullname: string; disambiguation?: string } => {
  return useMemo(() => {
    const [fullname, disambiguation] = name
      .split('(')
      .map((part) => part.replace(/\)$/, '').trim());

    return { fullname, disambiguation: disambiguation || undefined };
  }, [name]);
};
