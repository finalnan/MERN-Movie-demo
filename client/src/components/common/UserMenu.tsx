import { useState } from 'react';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import menuConfigs from '../../configs/menu.configs';
import { setUser } from '../../redux/features/userSlice';

const UserMenu = () => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);

  return (
    <>
      {user && (
        <>
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer', userSelect: 'none' }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {user.displayName}
          </Typography>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
            <ListItemButton
              sx={{ borderRadius: '10px' }}
              onClick={() => dispatch(setUser(null))}
            >
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform="uppercase">sign out</Typography>
                }
              />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
