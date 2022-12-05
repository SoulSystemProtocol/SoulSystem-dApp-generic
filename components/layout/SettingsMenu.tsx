import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  Typography,
  MenuItem,
} from '@mui/material';
import ConnectButton from 'components/web3/connect/ConnectButton';
import { Web3Context } from 'contexts/Web3Context';
import { useContext, useState } from 'react';
import {
  soulToFirstLastNameString,
  soulImage,
  addressToShortAddress,
} from 'utils/converters';

/**
 * User Settings Menu
 * Source: https://mui.com/material-ui/react-app-bar/
 */
export default function SettingsMenu({ profile }: any): JSX.Element {
  const { account } = useContext(Web3Context);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt={soulToFirstLastNameString(profile)}
            src={soulImage(profile)}
            sx={{ width: 48, height: 48 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {account && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <Typography>{addressToShortAddress(account)}</Typography>
          </Box>
        )}
        <MenuItem key="disconnect" onClick={handleCloseUserMenu}>
          <ConnectButton />
        </MenuItem>
      </Menu>
    </Box>
  );
}
