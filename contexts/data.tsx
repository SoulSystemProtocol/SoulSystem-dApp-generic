// import LoadingBackdrop from 'components/backdrop/LoadingBackdrop';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSouls';
import { createContext, useContext, useEffect, useState } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import useSoulByHash from 'hooks/useSoulByOwner';
import { updateSoul } from 'helpers/metadata';

interface IDataContext {
  accountSoul: any;
  loading: boolean;
  error: any;
  metadataUpdate: (metadata: any) => void;
}

export const DataContext = createContext<Partial<IDataContext>>({});

export function DataProvider({ children }: any) {
  const { isReady, account } = useContext(Web3Context);
  const { handleError } = useError();
  const {
    soul: accountSoul,
    loading,
    error,
  } = useSoulByHash(account?.toLowerCase());

  const [soul, setSoul] = useState<any | null>(null);
  useEffect(() => {
    setSoul(accountSoul);
  }, [accountSoul]);

  const metadataUpdate = (metadata: any): void => {
    setSoul(updateSoul(soul, metadata));
  };

  /**
   * Update context if web3 context is ready.
   */
  useEffect(() => {
    error && handleError(error, false);
  }, [error]);

  return (
    <DataContext.Provider
      value={{
        accountSoul,
        loading,
        error,
        metadataUpdate,
      }}
    >
      {/* This waits untill metamask connects */}
      {/* {isReady ? <>{children}</> : <LoadingBackdrop />} */}
      {children}
    </DataContext.Provider>
  );
}
