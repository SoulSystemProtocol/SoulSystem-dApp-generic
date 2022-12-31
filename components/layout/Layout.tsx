import { useState } from 'react';
import {
  PersonOutlineOutlined,
  SchoolOutlined,
  WorkOutlineOutlined,
  TaskAlt,
  AcUnit,
} from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import LockIcon from '@mui/icons-material/Lock';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { Container, Typography, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import Footer from './Footer';
import { nameEntity } from 'helpers/utils';
import NavBar from './NavBar';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import Link from 'components/utils/Link';

interface MenuLink {
  route: string;
  label: string;
  icon: JSX.Element;
  hide?: boolean;
}

const top_links: MenuLink[] = [
  // { label: 'Hackathons', route: 'hackathons' },
  // { label: 'Grants', route: 'grants' },
  {
    route: '/mdao',
    label: nameEntity('mdao', true),
    icon: <SchoolOutlined color="warning" />,
  },
  {
    route: '/projects',
    label: nameEntity('project', true),
    icon: <WorkOutlineOutlined color="warning" />,
    hide: process.env.NEXT_PUBLIC_FEATURE_PROJECT == 'false',
  },
  {
    route: '/tasks',
    label: nameEntity('task', true),
    icon: <TaskAlt color="warning" />,
    hide: process.env.NEXT_PUBLIC_FEATURE_SOUL == 'false',
  },
];

/** [DISABLED]
 * Define Sidemenu Links
 */
const menu_side_links = [
  {
    route: '/souls',
    label: nameEntity('', true),
    icon: (
      <PersonOutlineOutlined
        color="warning"
        sx={{ fill: 'url(#linearColors)' }}
      />
    ),
    hide: process.env.NEXT_PUBLIC_FEATURE_SOUL == 'false',
  },
  // {
  //   label: 'dOrgs',
  // },
  // {
  //   route: '/daos',
  //   label: nameEntity('DAO', true),
  //   icon: <GroupWork color="warning" sx={{ fill: 'url(#linearColors)' }} />,
  // },

  // {
  //   route: '/grants',
  //   label: 'Grants',
  //   icon: <VolunteerActivism color="warning" sx={{ fill: 'url(#linearColors)' }} />,
  // },
  // {
  //   route: '/events',
  //   label: 'Hackathons',
  //   icon: <Festival color="warning" sx={{ fill: 'url(#linearColors)' }} />,
  // },
  // {
  //   route: '/sponsors',
  //   label: 'Sponsors',
  //   icon: <EmojiEmotions color="warning" sx={{ fill: 'url(#linearColors)' }} />,
  // },
  {
    label: 'SafeNFT',
    route: '/erc',
    hide: process.env.NEXT_PUBLIC_FEATURE_NFT == 'false',
    icon: <LockIcon color="warning" sx={{ fill: 'url(#linearColors)' }} />,
  },
  {
    label: 'Action Repo',
    route: '/actions',
    icon: (
      <DirectionsRunIcon color="warning" sx={{ fill: 'url(#linearColors)' }} />
    ),
    hide: process.env.NEXT_PUBLIC_FEATURE_DEV != 'false',
  },
];
const footer_links: MenuLink[] = [];
const footer_icons: MenuLink[] = [
  {
    route: '/souls',
    label: 'Souls',
    icon: <EmojiPeopleIcon sx={{ fill: 'url(#linearColors)' }} />,
  },
  {
    route: 'https://github.com/SoulSystemProtocol',
    label: 'Code',
    icon: <GitHubIcon sx={{ fill: 'url(#linearColors)' }} />,
  },
  {
    route: 'https://miro.com/app/board/uXjVOH541VI=/',
    icon: <ArchitectureIcon sx={{ fill: 'url(#linearColors)' }} />,
    label: 'Architecture',
  },
  {
    // eslint-disable-next-line prettier/prettier
    route:
      'https://virtualbrick.notion.site/Contracts-4e383eb032e34cd08d5f035dee2dd9bb',
    icon: <ArticleIcon sx={{ fill: 'url(#linearColors)' }} />,
    label: 'Docs',
  },
  {
    // eslint-disable-next-line prettier/prettier
    route:
      'https://thegraph.com/hosted-service/subgraph/toledoroy/solidify_mumbai',
    icon: <AcUnit sx={{ fill: 'url(#linearColors)' }} />,
    label: 'SubGraph',
  },

  {
    label: 'SafeNFT',
    route: '/erc',
    hide: process.env.NEXT_PUBLIC_FEATURE_NFT == 'false',
    icon: <LockIcon color="warning" sx={{ fill: 'url(#linearColors)' }} />,
  },
  {
    label: 'Action Repo',
    route: '/actions',
    icon: (
      <DirectionsRunIcon color="warning" sx={{ fill: 'url(#linearColors)' }} />
    ),
    hide: process.env.NEXT_PUBLIC_FEATURE_DEV != 'false',
  },
];

export default function Layout({ children, title }: any) {
  // const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

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

      <>
        <svg width={0} height={0}>
          <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
            {/* <stop offset={0} stopColor="#4776E6" />
            <stop offset={1} stopColor="#8E54E9" /> */}
            <stop offset={0} stopColor="rgba(241,184,74,1)" />
            <stop offset={1} stopColor="rgba(207,113,8,1)" />
          </linearGradient>
        </svg>
        {/* <TaskAlt sx={{ fill: 'url(#linearColors)' }} /> */}
      </>
      {/* {process.env.NEXT_PUBLIC_FEATURE_SIDEBAR == 'true' ? (
        <Sidebar
          toggler={toggleDrawer}
          isOpen={isOpen}
          links={menu_side_links}
        />
      ) : null} */}
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          minHeight: '100vh',
        }}
      >
        {/* <Header open={isOpen} toggleDrawer={toggleDrawer} links={top_links} /> */}
        <NavBar links={top_links} />

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
