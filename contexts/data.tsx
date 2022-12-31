// import LoadingBackdrop from 'components/backdrop/LoadingBackdrop';
import useError from 'hooks/useError';
import { createContext, useContext, useEffect, useState } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import useSoulByHash from 'hooks/useSoulByOwner';
import { updateSoul } from 'helpers/metadata';
import { genFauxSoul } from 'utils/converters';

interface IDataContext {
  accountSoul: any;
  loading: boolean;
  error: any;
  isReady: boolean;
  metadataUpdate: (metadata: any) => void;
  accountSoulInject: (metadata: any, additional?: any) => void;
}

export const DataContext = createContext<Partial<IDataContext>>({});

export function DataProvider({ children }: any) {
  const { isReady, account } = useContext(Web3Context);
  const [soul, setSoul] = useState<any | null>(null);
  const { handleError } = useError();
  const {
    soul: accountSoul,
    loading,
    error,
  } = useSoulByHash(account?.toLowerCase());

  /**
   * Update context if web3 context is ready.
   */
  useEffect(() => error && handleError(error, false), [error]);

  useEffect(() => setSoul(accountSoul), [accountSoul]);

  /// Inject metadata update [optimistic updates]
  const metadataUpdate = (metadata: any): void =>
    setSoul(updateSoul(soul, metadata));

  /// Inject current account's Soul [optimistic updates]
  const accountSoulInject = (metadata: any, additional: any = {}): void => {
    additional.owner = account;
    const fauxSoul = genFauxSoul(metadata, additional);
    console.warn('Set Faux accountSoul', fauxSoul);
    setSoul(fauxSoul);
  };

  return (
    <DataContext.Provider
      value={{
        isReady,
        accountSoul: soul,
        loading,
        error,
        metadataUpdate,
        accountSoulInject,
      }}
    >
      {/* This waits untill metamask connects */}
      {/* {isReady ? <>{children}</> : <LoadingBackdrop />} */}
      {children}
    </DataContext.Provider>
  );
}
