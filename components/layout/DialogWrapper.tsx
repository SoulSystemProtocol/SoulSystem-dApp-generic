import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ReactElement, useContext, useState } from 'react';
import { DialogContext } from 'contexts/dialog';

/**
 * A Generic Dialog Wrapper
 */
export default function DialogWrapper({
  isClose = true,
  onClose = () => {}, //Custom onClose function
  children,
  maxWidth, // = 'xs',
  title,
}: {
  isClose: boolean;
  onClose: () => void;
  children?: ReactElement;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  title?: string;
}): ReactElement {
  // const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(!isClose);
  const { closeDialog } = useContext(DialogContext);

  async function close() {
    // if(isLoading) return;
    // setIsLoading(false);
    setIsOpen(false);
    onClose(); // setFormData({});
    closeDialog();
  }

  return (
    <Dialog open={isOpen} onClose={close} maxWidth={maxWidth} fullWidth>
      {title && <DialogTitle sx={{ pb: 0 }}>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
