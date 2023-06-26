import { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Toolbar, Tooltip, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import { DataContext } from 'contexts/data';
import { Web3Context } from 'contexts/Web3Context';
import { soulName } from 'utils/soul';
import ConnectButton from 'components/web3/connect/ConnectButton';
import Link from 'components/utils/Link';
import SettingsMenu from './SettingsMenu';
import HeaderLogo from './HeaderLogo';
import { sidebarWidth } from 'constants/theme';
import { soulLink } from 'utils/soul';

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
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <HeaderLogo />ss
          </Box>
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
          <Link href={soulLink(accountSoul)}>
            <Typography sx={{ mr: 1 }}>{soulName(accountSoul)}</Typography>
          </Link>
        )}
        {!account ? (
          <ConnectButton />
        ) : !accountSoul ? (
          <Tooltip title="Mint yourself a Soul to act in the verse">
            <span>
              <Link href="/soul/create">
                <Button
                  variant="contained"
                  size="small"
                  sx={{ borderRadius: '16px', px: '26px' }}
                >
                  Claim NFT Profile
                </Button>
              </Link>
            </span>
          </Tooltip>
        ) : (
          <SettingsMenu profile={accountSoul} />
        )}
      </Toolbar>
    </AppBar>
  );
}
