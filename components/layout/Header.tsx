import {
  Button,
  Toolbar,
  Link as MuiLink,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import { useContext, useState } from "react";
import { Web3Context } from "contexts/web3";
import {
  addressToShortAddress,
  soulToFirstLastNameString,
} from "utils/converters";
import { DataContext } from "contexts/data";

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
  const [anchorElUser, setAnchorElUser] = useState(null);

  function handleOpenUserMenu(event: any) {
    setAnchorElUser(event.currentTarget);
  }
  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  return (
    <AppBar
      color="primary"
      position="fixed"
      elevation={1}
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "0px 2px 6px rgba(118, 139, 160, 0.1)",
      }}
    >
      <Toolbar>
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
        {/* Logo */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
          <Link href="/" passHref>
            <MuiLink underline="none">
              <Typography>MentorDAO</Typography>
            </MuiLink>
          </Link>
          <Typography
            sx={{
              color: "text.secondary",
              pl: 1,
            }}
          >
            {process.env.NEXT_PUBLIC_VERSION}
          </Typography>
        </Box>
          {/* Connect wallet button */}
          {!account && (
            <Box
              sx={{
                pt: "12px",
                pb: "6px",
                px: "16px",
                display: "flex",
              }}
            >
              <Button
                sx={{ flex: 1 }}
                variant="outlined"
                size="small"
                onClick={() => {
                  handleCloseUserMenu();
                  connectWallet?.();
                }}
              >
                Connect Wallet
              </Button>
            </Box>
          )}
          {/* Account info */}
          {account && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: "15px",
                my: "10px",
                pb: "14px",
                borderBottom: "1px solid gray",
                borderColor: "grey.200",
              }}
            >
              {accountSoul && (
                <Link href={`/soul/${accountSoul.id}`} passHref>
                  <MuiLink underline="none">
                    <Typography>
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
          {/* Disconnect wallet button */}
          {account && (
            <Box
              sx={{
                pt: "12px",
                pb: "6px",
                px: "16px",
                display: "flex",
              }}
            >
              <Button
                sx={{ flex: 1 }}
                variant="outlined"
                size="small"
                onClick={() => disconnectWallet?.()}
              >
                Disconnect Wallet
              </Button>
            </Box>
          )}
      </Toolbar>
    </AppBar>
  );
}
