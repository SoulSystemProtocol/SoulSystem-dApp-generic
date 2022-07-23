import MenuIcon from '@mui/icons-material/Menu';
import { Button, Link as MuiLink, Toolbar, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { DataContext } from 'contexts/data';
import { Web3Context } from 'contexts/web3';
import Link from 'next/link';
import { useContext } from 'react';
import {
  addressToShortAddress,
  soulToFirstLastNameString,
} from 'utils/converters';

import { styled } from '@mui/material/styles';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface IHeaderProps {
  open: boolean;
  toggleDrawer: () => void;
}

/**
 * Component with a header.
 */
export default function Header({ open, toggleDrawer }: IHeaderProps) {
  const { account, connectWallet, disconnectWallet } = useContext(Web3Context);
  const { accountSoul } = useContext(DataContext);

  return (
    <AppBar
      color="primary"
      position="fixed"
      elevation={1}
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: '0px 2px 6px rgba(118, 139, 160, 0.1)',
      }}
    >
      <Toolbar>
        {/* Menu button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        {/* Left */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
          {/* <Link href="/" passHref>
            <MuiLink underline="none">
              <Typography>MentorDAO</Typography>
            </MuiLink>
          </Link>
          <Typography
            sx={{
              color: 'text.secondary',
              pl: 1,
            }}
          >
            {process.env.NEXT_PUBLIC_VERSION}
          </Typography> */}
        </Box>
        {/* Account info */}
        {account && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              mr: 2,
            }}
          >
            {accountSoul && (
              <Link href={`/souls/${accountSoul.id}`} passHref>
                <MuiLink underline="none">
                  <Typography sx={{ mr: 1 }}>
                    {soulToFirstLastNameString(accountSoul)}
                  </Typography>
                </MuiLink>
              </Link>
            )}
            <Typography variant="body2">
              {addressToShortAddress(account)}
            </Typography>
          </Box>
        )}
        {/* Connect wallet button */}
        {!account && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              connectWallet?.();
            }}
          >
            Connect Wallet
          </Button>
        )}
        {/* Disconnect wallet button */}
        {account && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => disconnectWallet?.()}
          >
            Disconnect Wallet
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
