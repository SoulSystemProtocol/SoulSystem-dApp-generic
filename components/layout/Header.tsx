import { MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Link as MuiLink,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useContext, useState } from "react";
import { Web3Context } from "contexts/web3";
import {
  addressToShortAddress,
  soulToFirstLastNameString,
} from "utils/converters";
import { DataContext } from "contexts/data";

/**
 * Component with a header.
 */
export default function Header() {
  const { account, connectWallet, disconnectWallet } = useContext(Web3Context);
  const { accountSoul } = useContext(DataContext);
  const [anchorElUser, setAnchorElUser] = useState(null);

  function handleOpenUserMenu(event: any) {
    setAnchorElUser(event.currentTarget);
  }
  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  return (
    <AppBar
      color="inherit"
      position="fixed"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "0px 2px 6px rgba(118, 139, 160, 0.1)",
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
          <Link href="/" passHref>
            <MuiLink underline="none">
              <Typography>MentorDAO</Typography>
            </MuiLink>
          </Link>
          <Typography
            sx={{
              color: "text.secondary",
              pl: 1,
            }}
          >
            v{process.env.NEXT_PUBLIC_VERSION}
          </Typography>
        </Box>

        {/* Menu button */}
        <Tooltip title="Open Menu">
          <IconButton onClick={handleOpenUserMenu} sx={{ ml: 1, p: "6px" }}>
            <MenuOutlined />
          </IconButton>
        </Tooltip>

        {/* Menu */}
        <Menu
          sx={{
            mt: "45px",
            padding: "15px",
            [`& .MuiPaper-root`]: {
              padding: 0,
              borderRadius: "15px",
              overflow: "hidden",
            },
            [`& .MuiBackdrop-root`]: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {/* Connect wallet button */}
          {!account && (
            <Box
              sx={{
                pt: "12px",
                pb: "6px",
                px: "16px",
                display: "flex",
              }}
            >
              <Button
                sx={{ flex: 1 }}
                variant="outlined"
                size="small"
                onClick={() => {
                  handleCloseUserMenu();
                  connectWallet?.();
                }}
              >
                Connect Wallet
              </Button>
            </Box>
          )}
          {/* Account info */}
          {account && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: "15px",
                my: "10px",
                pb: "14px",
                borderBottom: "1px solid gray",
                borderColor: "grey.200",
              }}
            >
              {accountSoul && (
                <Link href={`/soul/${accountSoul.id}`} passHref>
                  <MuiLink underline="none">
                    <Typography>
                      {soulToFirstLastNameString(accountSoul)}
                    </Typography>
                  </MuiLink>
                </Link>
              )}
              <Typography variant="body2">
                {addressToShortAddress(account)}
              </Typography>
            </Box>
          )}
          {/* Create own profile button */}
          {account && !accountSoul && (
            <Link href="/soul/create" passHref>
              <Box
                sx={{
                  pt: "6px",
                  pb: "12px",
                  px: "16px",
                  display: "flex",
                }}
              >
                <Button
                  sx={{ flex: 1 }}
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    handleCloseUserMenu();
                  }}
                >
                  Create Soul
                </Button>
              </Box>
            </Link>
          )}
          {/* Home link */}
          <Link href="/" passHref>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography>Home</Typography>
            </MenuItem>
          </Link>
          {/* Souls link */}
          {/* TODO: Use correct href */}
          <Link href="/souls" passHref>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography>Souls</Typography>
            </MenuItem>
          </Link>
          {/* Projects link */}
          {/* TODO: Use correct href */}
          <Link href="/projects" passHref>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography>Projects</Typography>
            </MenuItem>
          </Link>
          {/* Bounties link */}
          {/* TODO: Use correct href */}
          <Link href="/bounties" passHref>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography>Bounties</Typography>
            </MenuItem>
          </Link>
          {/* Disconnect wallet button */}
          {account && (
            <Box
              sx={{
                pt: "12px",
                pb: "6px",
                px: "16px",
                display: "flex",
              }}
            >
              <Button
                sx={{ flex: 1 }}
                variant="outlined"
                size="small"
                onClick={() => disconnectWallet?.()}
              >
                Disconnect Wallet
              </Button>
            </Box>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
