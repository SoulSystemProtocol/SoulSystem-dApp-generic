import { useContext } from 'react';
import { Box, Card, Grid, List, Stack, Typography } from '@mui/material';
import { Web3Context } from 'contexts/Web3Context';
import ImageBox from 'components/utils/ImageBox';
import FaucetCallout from 'components/web3/FaucetCallout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HubIcon from '@mui/icons-material/Hub';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SecurityIcon from '@mui/icons-material/Security';

/**
 * Home Page
 */
export default function SolidifyLanding(): JSX.Element {
  const { account } = useContext(Web3Context);

  const listStyle = '🤩';
  const featureIconSX = { fontSize: '70px', fill: 'url(#linearColorsAccent)' };
  const flows = [
    {
      title: 'On-Chain Profiles',
      text: (
        <>
          <List>
            <Typography variant="body2">
              Express yourself with a Soulbound profile NFT (Soul)
            </Typography>
            <li>
              {listStyle}
              Mint yourself a Soul (NFT profile) to represent yourself on the
              blockchain
              <li>{listStyle} Own your data!</li>
              <li>
                {listStyle}
                Take your soul with you everywhere you go and use it on other
                dApps
              </li>
            </li>
          </List>
        </>
      ),
      icon: <AccountBoxIcon sx={featureIconSX} />,
    },
    {
      title: 'Tokenized Communities',
      text: (
        <List>
          <Typography variant="body2">
            Use NFTs to manage members, roles, permissions, and equity
          </Typography>
          <li>{listStyle} Create Commmunities, Organizations, and Services</li>
          <li>{listStyle} Assign NFTs for organization members (roles)</li>
          <li>{listStyle} Manage organization permissions by role NFTs</li>
          <li>
            {listStyle}
            Track experience, reputation, contribution & equity over different
            organizations in one place
          </li>
          <li>
            {listStyle} Create a community token to automatically incentivise
            participation
          </li>
          <li>
            {listStyle} Assign voting power by organization
            contribution/reputation
          </li>
        </List>
      ),
      // '',
      icon: <Diversity3Icon sx={featureIconSX} />,
    },
    {
      title: 'Social Moderation',
      text: (
        <List>
          <Typography variant="body2">
            Community moderation & social recovery
          </Typography>
          <li>{listStyle} Support for key swap</li>
          <li>{listStyle} Remove bad actors</li>
          <li>{listStyle} Recover lost or stolen assets (Safe NFTs)</li>
        </List>
      ),
      icon: <SecurityIcon sx={featureIconSX} />,
    },
  ];
  const features = [
    {
      title: 'Fully Compatible',
      text: 'Connect with all existing services, including payments, votes, treasury, tokens, and more',
      icon: <HubIcon sx={featureIconSX} />,
    },
    {
      title: 'Fully Extensible',
      text: 'Custom extensions - fully composible, extendable, and compatible with all token standards',
      icon: <HubIcon sx={featureIconSX} />,
    },
    // {
    //   title: 'On-Chain Profiles',
    //   text: 'Express yourself and own your data with Soulbound profile NFT (Soul)',
    //   icon: <AccountBoxIcon sx={featureIconSX} />,
    // },
    // {
    //   title: 'Tokenized Communities',
    //   text: 'Use NFTs to manage members, roles, permissions, and equity',
    //   icon: <Diversity3Icon sx={featureIconSX} />,
    // },
    {
      title: 'Automated Incentives',
      text: 'Easily set up procedures and incentives to automate your Organization',
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
            sx={{ fontSize: { sm: '5rem', xs: '2.6rem' } }}
          >
            {/* {APP_CONFIGS.NAME} */}
            SoulSystem Boilerplate
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: '1.2rem', sm: '2.4rem' } }}
            letterSpacing="0.02em"
          >
            {/* All-dApp for the protocol for */}
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
        <Box>
          <Typography>
            In a world where digital interactions play an increasingly
            significant role in our lives, we recognize the need to establish a
            better relationship between communities and technology. Our platform
            harnesses the power of blockchain technology and tokenization to
            democratize the way communities are formed, organized, and
            incentivized.
          </Typography>
          <Typography>
            Imagine a platform where communities are not just virtual spaces,
            but living ecosystems with a transparent value system. Through our
            innovative approach, we enable communities to easily create and
            distribute their unique digital tokens. These tokens can act not
            only as a form of digital currency within the community, but also as
            a representation of their achievements, contributions, and
            collective identity.
          </Typography>
        </Box>
        <FaucetCallout minBalance={0.1} />
        <Box
          sx={{
            textAlign: 'center',
            width: { xs: '100%', sm: '650px' },
            margin: '60px auto 40px',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              mb: 4,
              mt: 10,
              textAlign: 'center',
              fontSize: { sm: '3rem', xs: '3rem' },
            }}
          >
            Quick Demo
          </Typography>
          <iframe
            width="100%"
            height="315"
            style={{ margin: '10px auto' }}
            src="https://www.youtube.com/embed/NTg-EKd4B8Y?si=n2zMPjRNGervXzGJ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              mt: 10,
              textAlign: 'center',
              fontSize: { sm: '3rem', xs: '3rem' },
            }}
          >
            What does it do?
          </Typography>
          <Typography variant="h4">
            {`Community building and management tool that's easy to use, no-code
            required.`}
          </Typography>

          <Box>
            <Grid container spacing={7} sx={{ mt: -4 }}>
              {flows.map((flow) => (
                <Grid
                  item
                  xs={12}
                  // md={6}
                  key={'flow.title'}
                  sx={{ flexDirection: 'row' }}
                >
                  <Card
                    sx={{
                      display: 'flex',
                      p: '15px',
                      flexDirection: 'row',
                    }}
                  >
                    <Box sx={{ mr: 2 }}>{flow.icon}</Box>
                    <Box>
                      <Typography variant="h1">{flow.title}</Typography>
                      {flow.text}
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
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
      </Box>
    </>
  );
}
