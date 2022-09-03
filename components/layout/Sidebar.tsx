import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link as MuiLink, Typography } from '@mui/material';
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
import Link from 'next/link';
import * as React from 'react';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
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

//Menu Item Interface
interface MenuItem {
  label: string;
  route: string;
  icon: JSX.Element;
  hide: Boolean | undefined;
}

export default function Sidebar({
  links = [],
  isOpen,
  toggler,
}: any): JSX.Element {
  const theme = useTheme();
  const renderMenu = links.map(
    ({ label, route, icon, hide }: MenuItem): JSX.Element =>
      !hide ? (
        <ListItem key={label} disablePadding sx={{ display: 'block' }}>
          <Link href={route} passHref>
            <ListItemButton
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
              <ListItemText primary={label} sx={{ opacity: isOpen ? 1 : 0 }} />
            </ListItemButton>
          </Link>
        </ListItem>
      ) : (
        <></>
      ),
  );

  return (
    <Drawer variant="permanent" open={isOpen}>
      <DrawerHeader>
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            {/* Logo */}
            &nbsp;
          </Box>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Link href="/" passHref>
              <MuiLink underline="none">
                <Typography>{process.env.NEXT_PUBLIC_APP_NAME}</Typography>
              </MuiLink>
            </Link>
            <Typography
              sx={{
                color: 'text.secondary',
                pl: 1,
              }}
            >
              {process.env.NEXT_PUBLIC_VERSION}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={toggler}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>{renderMenu}</List>
    </Drawer>
  );
}
