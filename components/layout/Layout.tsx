import { useState } from 'react';
import {
  PersonOutlineOutlined,
  SchoolOutlined,
  WorkOutlineOutlined,
  TaskAlt,
} from '@mui/icons-material';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import LockIcon from '@mui/icons-material/Lock';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { Container, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import Footer from './Footer';
import { nameEntity } from 'helpers/utils';
import NavBar from './NavBar';
import PageHead from './PageHead';
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
    route: '/projects',
    label: nameEntity('project', true),
    icon: <WorkOutlineOutlined color="warning" />,
    hide: process.env.NEXT_PUBLIC_FEATURE_PROJECT == 'false',
  },
  {
    route: '/mdao',
    label: nameEntity('mdao', true),
    icon: <SchoolOutlined color="warning" />,
  },
  {
    route: '/tasks',
    label: nameEntity('task', true),
    icon: <TaskAlt color="warning" />,
    hide: process.env.NEXT_PUBLIC_FEATURE_SOUL == 'false',
  },
  {
    route: '/souls',
    // label: 'Souls',
    // label: 'People',
    label: nameEntity('', true),
    icon: <EmojiPeopleIcon sx={{ fill: 'url(#linearColors)' }} />,
  },
];

/** [DISABLED]
 * Define Sidemenu Links
 */
const menu_side_links: MenuLink[] = [
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
    hide: process.env.NEXT_PUBLIC_FEATURE_DEV == 'true',
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
    route: 'https://github.com/SoulSystemProtocol',
    label: 'Code',
    icon: <GitHubIcon sx={{ fill: 'url(#linearColors)' }} />,
  },
  {
    route:
      'https://miro.com/app/board/uXjVOH541OI=/?share_link_id=612732936883',
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
      'https://thegraph.com/hosted-service/subgraph/toledoroy/soulsystem_aurora',
    icon: <SensorOccupiedIcon sx={{ fill: 'url(#linearColors)' }} />,
    label: 'SubGraph',
  },

  {
    label: 'SafeNFT',
    route: '/erc',
    hide: process.env.NEXT_PUBLIC_FEATURE_NFT != 'true',
    icon: <LockIcon color="warning" sx={{ fill: 'url(#linearColors)' }} />,
  },
  {
    label: 'Action Repo',
    route: '/actions',
    icon: (
      <DirectionsRunIcon color="warning" sx={{ fill: 'url(#linearColors)' }} />
    ),
    hide: process.env.NEXT_PUBLIC_FEATURE_DEV != 'true',
  },
];

export default function Layout({ children, title }: any) {
  // const theme = useTheme();
  // const toggleDrawer = () => setIsOpen(!isOpen);
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <svg width={0} height={0}>
        <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor="rgba(241,184,74,1)" />
          <stop offset={1} stopColor="rgba(207,113,8,1)" />
        </linearGradient>
      </svg>
      <svg width={0} height={0}>
        <linearGradient id="linearColorsAccent" x1={0} y1={0} x2={1} y2={1}>
          <stop offset={0} stopColor="#8c9eff" />
          <stop offset={0.8} stopColor="#4776E6" />
        </linearGradient>
      </svg>
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
