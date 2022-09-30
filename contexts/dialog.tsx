import { createContext, useState } from 'react';

export interface IDialogContext {
  showDialog: Function;
  closeDialog: any;
}

export const DialogContext = createContext<Partial<IDialogContext>>({});

export function DialogProvider({ children }: any) {
  const [dialog, setDialog] = useState(null);

  function showDialog(dialog: any) {
    setDialog(dialog);
  }

  function closeDialog() {
    setDialog(null);
  }

  return (
    <DialogContext.Provider
      value={{
        showDialog,
        closeDialog,
      }}
    >
      {children}
      {dialog}
    </DialogContext.Provider>
  );
}
