import React from 'react';
import {
  PersonOutlineOutlined,
  SchoolOutlined,
  WorkOutlineOutlined,
  TaskAlt,
} from '@mui/icons-material';
import { Container, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import Header from './Header';
import Sidebar from './Sidebar';

//Define Sidemenu Links
const menu_side_links = [
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
  {
    route: '/tasks',
    label: 'Bounties',
    icon: <TaskAlt color="warning" />,
  },
];

export default function Layout({ children, title }: any) {
  // const theme = useTheme();
  const [isOpen, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!isOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Head>
        <title>{title || 'MentorDAO'}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Header open={isOpen} toggleDrawer={toggleDrawer} />
      <Sidebar links={menu_side_links} toggler={toggleDrawer} isOpen={isOpen} />
      <Container maxWidth="md">
        <Toolbar />
        <Box sx={{ py: 4 }}>{children}</Box>
      </Container>
    </Box>
  );
}
