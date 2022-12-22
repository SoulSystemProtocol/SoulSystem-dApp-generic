import { useRouter } from 'next/router';
import { ListSubheader, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Link from 'components/utils/Link';
import * as React from 'react';
import { sidebarWidth } from 'constants/theme';
import MenuIcon from '@mui/icons-material/Menu';

const openedMixin = (theme: Theme): CSSObject => ({
  width: sidebarWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  borderRadius: 0,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: sidebarWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

//Menu Item Type
interface MenuItem {
  label: string;
  route: string;
  icon: JSX.Element;
  hide?: boolean;
}

export default function Sidebar({
  links = [],
  isOpen,
  toggler,
}: {
  links: MenuItem[];
  isOpen: boolean;
  toggler: () => void;
}): JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const renderMenu = links.map(
    ({ label, route, icon, hide }: MenuItem): JSX.Element => {
      if (hide) return <></>;
      const isActive = router.pathname.startsWith(route);
      return (
        <Box key={'item' + label}>
          {route ? (
            <ListItem
              key={'item' + label}
              disablePadding
              sx={{
                display: 'block',
              }}
            >
              <Link
                key={'link' + label}
                href={route}
                sx={{
                  display: 'block',
                  background: isActive ? 'rgba(255, 255, 255, 0.1)' : '',
                  borderRadius: '6%',
                  color: 'inherit',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <ListItemButton
                  key={'button' + label}
                  title={isOpen ? '' : label}
                  sx={{
                    minHeight: 48,
                    justifyContent: isOpen ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isOpen ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{ opacity: isOpen ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ) : (
            <ListSubheader
              key={'sub' + label}
              sx={{
                textAlign: 'center',
              }}
            >
              {label}
            </ListSubheader>
          )}
        </Box>
      );
    },
  );

  return (
    <Drawer variant="permanent" open={isOpen}>
      <DrawerHeader>
        <Box
          sx={{
            display: 'flex',
            width: sidebarWidth,
            flexGrow: 0,
            flexShrink: 0,
            flexDirection: 'row',
            mt: '11px',
            ml: '4px',
          }}
        >
          <IconButton onClick={toggler}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            {/* Logo */}
            &nbsp;
          </Box>
          <Stack
            direction="column"
            sx={{
              mt: '5px',
              flexGrow: 1,
              justifyContent: 'center',
            }}
          >
            <Stack direction="row">
              <Link href="/">
                <Typography>{process.env.NEXT_PUBLIC_APP_NAME}</Typography>
              </Link>
              <Typography
                sx={{
                  color: 'text.secondary',
                  pl: 1,
                }}
              >
                {process.env.NEXT_PUBLIC_VERSION}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </DrawerHeader>
      <Divider />
      <List>{renderMenu}</List>
    </Drawer>
  );
}
