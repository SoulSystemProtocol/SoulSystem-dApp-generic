import { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Toolbar, Tooltip, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { DataContext } from 'contexts/data';
import { Web3Context } from 'contexts/Web3Context';
import { nameSoul } from 'utils/converters';
import ConnectButton from 'components/web3/connect/ConnectButton';
import Link from 'components/utils/Link';
import SettingsMenu from './SettingsMenu';
import HeaderLogo from './HeaderLogo';
import { sidebarWidth } from 'constants/theme';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface IHeaderProps {
  open: boolean;
  toggleDrawer: () => void;
  sx?: any;
  links?: [];
}

/**
 * Site Header Component
 */
export default function Header({
  open,
  links = [],
  sx,
  toggleDrawer,
}: IHeaderProps): JSX.Element {
  const { account } = useContext(Web3Context);
  const { accountSoul } = useContext(DataContext);

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: sidebarWidth,
      width: `calc(100% - ${sidebarWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar
      color="primary"
      position="fixed"
      elevation={1}
      open={open}
      sx={{
        zIndex: (theme: any) => theme.zIndex.drawer + 1,
        borderRadius: 0,
        boxShadow: '0px 2px 6px rgba(118, 139, 160, 0.1)',
        ...sx,
      }}
    >
      <Toolbar>
        {process.env.NEXT_PUBLIC_FEATURE_SIDEBAR == 'true' ? (
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
        ) : (
          <HeaderLogo />
        )}
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
            <Typography sx={{ mr: 1 }}>{nameSoul(accountSoul)}</Typography>
          </Link>
        )}
        {!account ? (
          <ConnectButton />
        ) : !accountSoul ? (
          <Tooltip title="Mint yourself a Soul to be represented in the verse">
            <Link href="/soul/create">
              <Button
                variant="outlined"
                size="small"
                sx={{ borderRadius: '16px' }}
                title="Mint yourself a Soul to be represented in the verse"
              >
                Create Profile
              </Button>
            </Link>
          </Tooltip>
        ) : (
          <SettingsMenu profile={accountSoul} />
        )}
      </Toolbar>
    </AppBar>
  );
}
