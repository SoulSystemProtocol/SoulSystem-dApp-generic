import Soul from "classes/Soul";
import LoadingBackdrop from "components/backdrop/LoadingBackdrop";
import useError from "hooks/useError";
import useSoul from "hooks/useSoul";
import { createContext, useContext, useEffect, useState } from "react";
import { Web3Context } from "./web3";

interface IDataContext {
  accountSoul: any;
}

export const DataContext = createContext<Partial<IDataContext>>({});

export function DataProvider({ children }: any) {
  const { isReady: isWebContextReady, account } = useContext(Web3Context);
  const { handleError } = useError();
  const { getSoulByOwner } = useSoul();
  const [isReady, setIsReady] = useState(false);
  const [accountSoul, setAccountSoul] = useState<Soul | null>(null);

  async function updateContext() {
    // Clear context if account not connected
    if (!account) {
      clearContext();
    }
    // Load data if account connected
    else {
      try {
        // Define data
        const accountSoul = await getSoulByOwner(account);
        // Clear context if account does not have soul
        if (!accountSoul) {
          clearContext();
          return;
        }
        // Update states
        setAccountSoul(accountSoul);
      } catch (error: any) {
        handleError(error, false);
      }
    }
  }

  async function clearContext() {
    setAccountSoul(null);
  }

  /**
   * Update context if web3 context is ready.
   */
  useEffect(() => {
    setIsReady(false);
    if (isWebContextReady) {
      updateContext().then(() => setIsReady(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWebContextReady]);

  /**
   * Update context if context is ready and account is changed.
   */
  useEffect(() => {
    if (isReady) {
      updateContext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <DataContext.Provider value={{ accountSoul: accountSoul }}>
      {isReady ? <>{children}</> : <LoadingBackdrop />}
    </DataContext.Provider>
  );
}
