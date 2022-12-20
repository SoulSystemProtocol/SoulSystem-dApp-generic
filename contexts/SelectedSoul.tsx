import { createContext, useContext } from 'react';
import useSoulById from 'hooks/useSoulById';
import useSoulByHash from 'hooks/useSoulByOwner';
import { isNumber } from 'hooks/utils';
import { DataContext } from './data';

interface ISelectedSoulContext {
  soul: any;
  loading: boolean;
  error: any;
}

/**
 * Context for Selected Entity (by hash or id)
 */
export const SelectedSoulContext = createContext<Partial<ISelectedSoulContext>>(
  {},
);

/**
 * Wrapper for Soul Context Provider
 */
export function SelectedSoulProvider({ slug, children }: any) {
  const { accountSoul: soul, loading, error } = useContext(DataContext);

  if (slug == soul?.id || slug == soul?.owner) {
    //Current Soul
    return (
      <SelectedSoulContext.Provider value={{ soul, loading, error }}>
        {children}
      </SelectedSoulContext.Provider>
    );
  }

  return isNumber(slug as string) ? (
    <SelectedSoulById id={slug}>{children}</SelectedSoulById>
  ) : (
    <SelectedSoulByHash hash={slug}>{children}</SelectedSoulByHash>
  );
}

/**
 * Context Provider + Single Soul By Id
 */
function SelectedSoulById({ id, children }: any): JSX.Element {
  const { soul, loading, error } = useSoulById(id as string);
  soul && console.log('Selected Soul', soul);
  return (
    <SelectedSoulContext.Provider value={{ soul, loading, error }}>
      {children}
    </SelectedSoulContext.Provider>
  );
}

/**
 * Context Provider + Single Soul By Hash
 */
function SelectedSoulByHash({ hash, children }: any): JSX.Element {
  const { soul, loading, error } = useSoulByHash(hash as string);
  return (
    <SelectedSoulContext.Provider value={{ soul, loading, error }}>
      {children}
    </SelectedSoulContext.Provider>
  );
}
