import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Link, Toolbar, Menu, MenuItem, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

//SearchBar
// import { styled, alpha } from '@mui/material/styles';
// import SearchIcon from '@mui/icons-material/Search';
import ConnectButton from '../web3/connect/ConnectButton';
import { DataContext } from 'contexts/data';
import { Web3Context } from 'contexts/Web3Context';
import HeaderLogo from './HeaderLogo';
import SettingsMenu from './SettingsMenu';

/**
 * Main Naviation Bar
 */
export default function ResponsiveAppBar({
  links,
}: {
  links: any[];
}): JSX.Element {
  const { account } = useContext(Web3Context);
  const { accountSoul } = useContext(DataContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  /* Possible Search Stuff   https://mui.com/components/app-bar/
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        },
    }));
*/
  const linkSX = {
    // fontWeight: '600',
    // background: 'linear-gradient(to right bottom, #8c9eff, #4776E6)',
    // WebkitBackgroundClip: 'text',
    // WebkitTextFillColor: 'transparent',
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        // boxShadow: 'none',
        wdith: '100%',
        borderRadius: 0,
        boxShadow: '0px 2px 6px rgba(118, 139, 160, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{ mr: 6, display: { xs: 'none', md: 'flex' }, flexShrink: 1 }}
          >
            <HeaderLogo />
          </Typography>

          {/*
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {links.map(({ route, label, hide }: any, index: number) => {
                if (hide) return <></>;
                return (
                  <MenuItem key={label} onClick={handleCloseNavMenu}>
                    <Link key={label} href={route}>
                      <Typography textAlign="center">{label}</Typography>
                    </Link>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <HeaderLogo />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {links.map(({ route, label, hide }: any, index: number) => {
              if (hide) return <></>;
              return (
                <Link key={index} href={route}>
                  <Typography mr={4} textAlign="center" sx={linkSX}>
                    {label}
                  </Typography>
                </Link>
              );
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!account ? (
              <ConnectButton />
            ) : !accountSoul ? (
              <Tooltip title="Mint yourself a Soul to act in the verse">
                <span>
                  <Link href="/soul/create">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: '16px',
                        whiteSpace: 'nowrap',
                        px: { sm: '15px', md: '26px' },
                      }}
                    >
                      Claim NFT Profile
                    </Button>
                  </Link>
                </span>
              </Tooltip>
            ) : (
              <SettingsMenu profile={accountSoul} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
