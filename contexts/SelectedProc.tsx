import { createContext } from 'react';
import useProcByAddr from 'hooks/useProcByAddr';

interface ISelectedProcContext {
  proc: any;
  loading: boolean;
  error: any;
}

/**
 * Context for Selected Entity (by address)
 */
export const SelectedProcContext = createContext<Partial<ISelectedProcContext>>(
  {},
);

/**
 * Wrapper for Soul Context Provider
 */
export function SelectedProcProvider({ address, children }: any) {
  const { proc, loading, error } = useProcByAddr(address as string);
  return (
    <SelectedProcContext.Provider value={{ proc, loading, error }}>
      {children}
    </SelectedProcContext.Provider>
  );
}
