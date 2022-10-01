// import { useState } from 'react';
import {
  PersonOutlineOutlined,
  SchoolOutlined,
  WorkOutlineOutlined,
  TaskAlt,
  VolunteerActivism,
  EmojiEmotions,
  Festival,
  AcUnit,
} from '@mui/icons-material';
// import { CSSObject, Theme, useTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
// import SlideshowIcon from '@mui/icons-material/Slideshow';
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
import { GAME_NAME } from 'constants/contracts';

const top_links: any = [
  // ...((account && [{ label: 'Dashboards', route: 'daos' }]) || []),
  // { label: 'Hackathons', route: 'hackathons' },
  // { label: 'Grants', route: 'grants' },
  {
    label: 'SafeNFT',
    route: 'erc',
    hide: process.env.NEXT_PUBLIC_FEATURE_NFT == 'false',
    //TODO: Support Hiding
  },
  {
    label: 'Event Explorer',
    route: 'explorer',
    hide: process.env.NEXT_PUBLIC_FEATURE_EXPLORER == 'false',
    //TODO: Support Hiding
  },
  {
    label: 'Action Repo',
    route: 'actions',
    //TODO: Support Hiding
  },
];

//Define Sidemenu Links
const menu_side_links = [
  {
    route: '/souls',
    label: 'Free Agents',
    icon: <PersonOutlineOutlined color="warning" />,
    hide: process.env.NEXT_PUBLIC_FEATURE_SOUL == 'false',
  },
  {
    route: '/daos',
    label: GAME_NAME.dao,
    icon: <SchoolOutlined color="warning" />,
  },
  {
    route: '/mdao',
    label: GAME_NAME.mdao,
    icon: <SchoolOutlined color="warning" />,
  },
  {
    route: '/projects',
    label: GAME_NAME.project,
    icon: <WorkOutlineOutlined color="warning" />,
    hide: process.env.NEXT_PUBLIC_FEATURE_PROJECT == 'false',
  },
  {
    route: '/tasks',
    label: GAME_NAME.tasks,
    icon: <TaskAlt color="warning" />,
    hide: process.env.NEXT_PUBLIC_FEATURE_SOUL == 'false',
  },
  // {
  //   route: '/grants',
  //   label: 'Grants',
  //   icon: <VolunteerActivism color="warning" />,
  // },
  // {
  //   route: '/events',
  //   label: 'Hackathons',
  //   icon: <Festival color="warning" />,
  // },
  // {
  //   route: '/sponsors',
  //   label: 'Sponsors',
  //   icon: <EmojiEmotions color="warning" />,
  // },
];
const footer_links: { route: string; label: string; icon: JSX.Element }[] = [];
const footer_icons: { route: string; label: string; icon: JSX.Element }[] = [
  {
    route: 'https://github.com/SolidifyETH',
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
    route: 'https://thegraph.com/hosted-service/subgraph/toledoroy/bountyprotocol',
    icon: <AcUnit />,
    label: 'SubGraph',
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
        <title>{title || process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Sidebar links={menu_side_links} toggler={toggleDrawer} isOpen={isOpen} />
      <Container sx={{ minHeight: '100vh', m: '0 auto' }} maxWidth="xl">
        <Header open={isOpen} toggleDrawer={toggleDrawer} links={top_links} />
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
