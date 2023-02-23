import { useContext } from 'react';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { Web3Context } from 'contexts/Web3Context';
import ImageBox from 'components/utils/ImageBox';
import FaucetCallout from 'components/web3/FaucetCallout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HubIcon from '@mui/icons-material/Hub';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

/**
 * Home Page
 */
export default function SolidifyLanding(): JSX.Element {
  const { account } = useContext(Web3Context);

  const featureIconSX = { fontSize: '70px', fill: 'url(#linearColorsAccent)' };
  const features = [
    {
      title: 'Fully Compatible',
      text: 'Connect with all existing services, including payments, votes, treasury, tokens, and more',
      icon: <HubIcon sx={featureIconSX} />,
    },
    {
      title: 'Fully Extensible',
      text: 'Everything is supported! Just write only the code you want to add',
      icon: <HubIcon sx={featureIconSX} />,
    },
    {
      title: 'On-Chain Profiles',
      text: 'Express yourself and own your data with Soulbound profile NFT (Soul)',
      icon: <AccountBoxIcon sx={featureIconSX} />,
    },
    {
      title: 'Tokenized Communities',
      text: 'Use NFTs to manage members, roles, permissions, and equity',
      icon: <Diversity3Icon sx={featureIconSX} />,
    },
    {
      title: 'Automated Incentives',
      text: 'Easily set up procedures and incentives to automate your DAO',
      icon: <DirectionsRunIcon sx={featureIconSX} />,
    },
    {
      title: 'Automatic SubGraph',
      text: 'All inclusive data structure to be consumed through a smart semantic SubGraph',
      icon: <HubIcon sx={featureIconSX} />,
    },
    // {
    //   title: 'Access Control',
    // },
  ];

  return (
    <>
      <ImageBox
        src="/images/futuristic_tower1.jpg"
        sx={{
          height: { xs: '160px', md: '260px' },
        }}
      />
      <Box>
        <Box
          sx={{
            textAlign: 'center',
            px: { xs: 2, md: 4 },
            pt: { xs: 2, md: 4 },
          }}
        >
          <Typography
            gutterBottom
            variant="h1"
            fontWeight={700}
            letterSpacing="0.1em"
            sx={{ fontSize: { sm: '5rem', xs: '3rem' } }}
          >
            {/* {APP_CONFIGS.NAME} */}
            SoulSystem Boilerplate
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: '1.2rem', sm: '2.4rem' } }}
            letterSpacing="0.02em"
          >
            {/* A platform for democratizing services */}The protocol for
            protocols
          </Typography>
        </Box>
        {/* {!account && (
          <Box mt={4} textAlign="center">
            <Typography fontSize="1.2em" letterSpacing="0.02em">
              Connect wallet to explore mDAOs <ConnectButton sx={{ ml: 4 }} />
            </Typography>
          </Box>
        )} */}

        <FaucetCallout minBalance={0.1} />
        <Box sx={{ my: 12 }}>
          <Typography
            variant="h1"
            sx={{
              mb: 6,
              mt: 10,
              textAlign: 'center',
              fontSize: { sm: '3rem', xs: '3rem' },
            }}
          >
            Features
          </Typography>

          <Grid container spacing={7} sx={{ mt: -4 }}>
            {features.map((feature) => (
              <Grid item xs={12} md={6} key={feature.title} sx={{}}>
                <Card
                  sx={{
                    display: 'flex',
                    p: '15px',
                    flexDirection: 'column',
                    textAlign: 'center',
                  }}
                >
                  <Box sx={{}}>{feature.icon}</Box>
                  <Box>
                    <Typography variant="h1">{feature.title}</Typography>
                    {feature.text}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h1"
            sx={{
              mb: 6,
              mt: 10,
              textAlign: 'center',
              fontSize: { sm: '3rem', xs: '3rem' },
            }}
          >
            Flow
          </Typography>
          <Typography variant="h4" sx={{ mt: 4 }}>
            Access the magic of composable decentralized socio-economic
            organizations with no-code
          </Typography>
          <ul>
            <li>Mint soulbound profiles as wallet abstraction</li>
            <li>Create Organiztions</li>
            <ul>
              <li>
                Assign NFTs as organizational roles and manage permissions
              </li>
              <li>
                Track experience, reputation, contribution & equity over
                different organizations in one place
              </li>
            </ul>
            <li>Create automated incentives procedures with custom rules</li>
            <ul>
              <li>Set up rules and design a interaction flows</li>
              <li>Automatically reward actions with all kinds of Tokens</li>
            </ul>
            <li>SoulSystem moderation</li>
            <ul>
              <li>Ban bad actors</li>
              <li>recover lost or stolen assets (Safe NFTs)</li>
            </ul>
            <li>
              Fully composible, extendable, and compatible with token standards
            </li>
          </ul>
        </Box>
      </Box>
    </>
  );
}
