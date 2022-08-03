// import { useState } from 'react';
import {
  PersonOutlineOutlined,
  SchoolOutlined,
  WorkOutlineOutlined,
  TaskAlt,
  VolunteerActivism,
  EmojiEmotions,
  Festival,
} from '@mui/icons-material';
// import { CSSObject, Theme, useTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ArticleIcon from '@mui/icons-material/Article';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import { Container, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import useLocalStorage from 'hooks/useLocalStorage';

//Define Sidemenu Links
const menu_side_links = [
  {
    route: '/souls',
    label: 'Souls',
    icon: <PersonOutlineOutlined color="warning" />,
  },
  {
    route: '/daos',
    label: 'Teams',
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
  // {
  //   route: '/grants',
  //   label: 'Grants',
  //   icon: <VolunteerActivism color="warning" />,
  // },
  {
    route: '/events',
    label: 'Hackathons',
    icon: <Festival color="warning" />,
  },
  // {
  //   route: '/sponsors',
  //   label: 'Sponsors',
  //   icon: <EmojiEmotions color="warning" />,
  // },
];
const footer_links: { route: string; label: string; icon: JSX.Element }[] = [];
const footer_icons: { route: string; label: string; icon: JSX.Element }[] = [
  {
    route: 'https://github.com/MentorDAO/',
    icon: <GitHubIcon />,
    label: 'Code',
  },
  {
    route: 'https://miro.com/app/board/uXjVOH541VI=/',
    icon: <ArchitectureIcon />,
    label: 'Architecture',
  },
  {
    // eslint-disable-next-line prettier/prettier
    route: 'https://virtualbrick.notion.site/Contracts-4e383eb032e34cd08d5f035dee2dd9bb',
    icon: <ArticleIcon />,
    label: 'Docs',
  },
  {
    // eslint-disable-next-line prettier/prettier
    route: 'https://docs.google.com/file/d/1jORzF6hSls2WxYLZeMizbK8pt1UB9RX-/edit?filetype=mspresentation',
    icon: <SlideshowIcon />,
    label: 'Deck',
  },
];

export default function Layout({ children, title }: any) {
  // const theme = useTheme();
  const [isOpen, setIsOpen] = useLocalStorage('isOpen', true);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Head>
        <title>{title || 'MentorDAO'}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Sidebar links={menu_side_links} toggler={toggleDrawer} isOpen={isOpen} />
      <Container sx={{ minHeight: '100vh', m: '0 auto' }} maxWidth="xl">
        <Header open={isOpen} toggleDrawer={toggleDrawer} />
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '100%',
          }}
        >
          <Box sx={{ py: 4 }}>
            <Toolbar />
            {children}
          </Box>
          <Box sx={{ pt: 2 }}>
            <Footer links={footer_links} icons={footer_icons} />
          </Box>
        </Container>
      </Container>
    </Box>
  );
}
