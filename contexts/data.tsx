// import LoadingBackdrop from 'components/backdrop/LoadingBackdrop';
import useError from 'hooks/useError';
import useSoul from 'hooks/useSouls';
import { createContext, useContext, useEffect, useState } from 'react';
import { Web3Context } from 'contexts/Web3Context';
import useSoulByHash from 'hooks/useSoulByOwner';

interface IDataContext {
  accountSoul: any;
}

export const DataContext = createContext<Partial<IDataContext>>({});

export function DataProvider({ children }: any) {
  const { isReady: isWebContextReady, account } = useContext(Web3Context);
  const { handleError } = useError();
  const {
    soul: accountSoul,
    loading,
    error,
  } = useSoulByHash(account?.toLowerCase());

  /**
   * Update context if web3 context is ready.
   */
  useEffect(() => {
    error && handleError(error, false);
  }, [error]);

  return (
    <DataContext.Provider value={{ accountSoul }}>
      {/* This waits untill metamask connects */}
      {/* {isReady ? <>{children}</> : <LoadingBackdrop />} */}
      {children}
    </DataContext.Provider>
  );
}
