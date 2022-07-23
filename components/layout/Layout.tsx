import {
  PersonOutlineOutlined,
  SchoolOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Container, Toolbar, Link as MuiLink, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import Header from './Header';

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

const LINK_CONFIGS = [
  {
    route: '/souls',
    label: 'Souls',
    icon: <PersonOutlineOutlined color="warning" />,
  },
  {
    route: '/daos',
    label: 'mDAOs',
    icon: <SchoolOutlined color="warning" />,
  },
  {
    route: '/projects',
    label: 'Projects',
    icon: <WorkOutlineOutlined color="warning" />,
  },
];

export default function Layout({ children, title }: any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const renderMenu = LINK_CONFIGS.map(({ label, route, icon }) => {
    return (
      <ListItem key={label} disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {icon}
          </ListItemIcon>
          <Link href={route} passHref>
            <ListItemText
              onClick={() => console.log('clicked')}
              primary={label}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </Link>
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Head>
        <title>{title || 'MentorDAO'}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Header open={open} toggleDrawer={toggleDrawer} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              {/* Logo */}
              &nbsp;
            </Box>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Link href="/" passHref>
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
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={toggleDrawer}>
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
      <Container maxWidth="md">
        <Toolbar />
        <Box sx={{ py: 4 }}>{children}</Box>
      </Container>
    </Box>
  );
}
