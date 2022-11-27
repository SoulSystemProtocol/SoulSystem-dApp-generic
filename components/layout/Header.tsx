import { useState, useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { DataContext } from 'contexts/data';
import { Web3Context } from 'contexts/Web3Context';
import {
  addressToShortAddress,
  soulToFirstLastNameString,
  soulImage,
} from 'utils/converters';
import ConnectButton from 'components/web3/connect/ConnectButton';
import Link from 'components/utils/Link';

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
  sx?: any;
  links?: [];
}

/**
 * Component with a header.
 */
export default function Header({
  open,
  toggleDrawer,
  links = [],
  sx,
}: IHeaderProps): JSX.Element {
  const { account } = useContext(Web3Context);
  const { accountSoul } = useContext(DataContext);

  return (
    <AppBar
      color="primary"
      position="fixed"
      elevation={1}
      open={open}
      sx={{
        zIndex: (theme: any) => theme.zIndex.drawer + 1,
        boxShadow: '0px 2px 6px rgba(118, 139, 160, 0.1)',
        ...sx,
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
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginRight: '40px',
          }}
        >
          {links.map(({ route, label, hide }, index) => {
            if (hide) return <></>;
            return (
              <Link key={index} href={route}>
                <Typography mr={4} textAlign="center">
                  {label}
                </Typography>
              </Link>
            );
          })}
        </Box>
        {accountSoul && (
          <Link href={`/soul/${accountSoul.id}`}>
            <Typography sx={{ mr: 1 }}>
              {soulToFirstLastNameString(accountSoul)}
            </Typography>
          </Link>
        )}
        {!account && <ConnectButton />}
        {account && <SettingsMenu profile={accountSoul} />}
      </Toolbar>
    </AppBar>
  );
}

/**
 * User Settings Menu
 * Source: https://mui.com/material-ui/react-app-bar/
 */
function SettingsMenu({ profile }: any): JSX.Element {
  const { account } = useContext(Web3Context);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={soulToFirstLastNameString(profile)}
            src={soulImage(profile)}
            sx={{ width: 48, height: 48 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {account && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <Typography>{addressToShortAddress(account)}</Typography>
          </Box>
        )}
        <MenuItem key="disconnect" onClick={handleCloseUserMenu}>
          <ConnectButton />
        </MenuItem>
      </Menu>
    </Box>
  );
}
