// import LoadingBackdrop from 'components/backdrop/LoadingBackdrop';
import useError from 'hooks/useError';
import { createContext, useContext, useEffect, useState } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import useSoulByHash from 'hooks/useSoulByOwner';
import { updateSoul } from 'helpers/metadata';
import { genFauxSoul } from 'utils/soul';

interface IDataContext {
  accountSoul: any;
  loading: boolean;
  error: any;
  injectMetadata: (metadata: any) => void;
  injectSoul: (metadata: any, additional?: any) => void;
}

export const DataContext = createContext<Partial<IDataContext>>({});

export function DataProvider({ children }: any) {
  const { account } = useContext(Web3Context);
  const [soul, setSoul] = useState<any | null>();
  const { handleError } = useError();
  const {
    soul: accountSoul,
    loading,
    error,
  } = useSoulByHash(account?.toLowerCase());

  useEffect(() => error && handleError(error, false), [error]);
  useEffect(() => {
    !loading && setSoul(accountSoul);
  }, [accountSoul, loading]);

  /// Inject metadata update [optimistic updates]
  const injectMetadata = (metadata: any): void =>
    setSoul(updateSoul(soul, metadata));

  /// Inject current account's Soul [optimistic updates]
  const injectSoul = (metadata: any, additional: any = {}): void => {
    additional.owner = account;
    const fauxSoul = genFauxSoul(metadata, additional);
    console.warn('Set Faux accountSoul', fauxSoul);
    setSoul(fauxSoul);
  };

  return (
    <DataContext.Provider
      value={{
        accountSoul: soul,
        loading,
        error,
        injectMetadata,
        injectSoul,
      }}
    >
      {/* This waits untill metamask connects */}
      {/* {isReady ? <>{children}</> : <LoadingBackdrop />} */}
      {children}
    </DataContext.Provider>
  );
}
