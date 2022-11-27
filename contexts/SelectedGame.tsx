import { createContext } from 'react';
import useGameByHash from 'hooks/useGameByHash';

interface ISelectedGameContext {
  game: any;
  loading: boolean;
  error: any;
}

/**
 * Context for Selected Entity (by hash or id)
 */
export const SelectedGameContext = createContext<Partial<ISelectedGameContext>>(
  {},
);

/**
 * Wrapper for Soul Context Provider
 */
export function SelectedGameProvider({ hash, children }: any) {
  const { game, loading, error } = useGameByHash(hash as string);
  // console.log('SelectedGameProvider() Selected Game: ', game);
  return (
    <SelectedGameContext.Provider value={{ game, loading, error }}>
      {children}
    </SelectedGameContext.Provider>
  );
}
