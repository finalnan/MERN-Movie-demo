import MenuIcon from '@mui/icons-material/Menu';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import { useState, cloneElement } from 'react';
import { Link } from 'react-router-dom';
import menuConfigs from '../../configs/menu.configs';
import { ThemeModes } from '../../configs/theme.configs';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setThemeMode } from '../../redux/features/themeModeSlice';
import Logo from './Logo';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import UserMenu from './UserMenu';
import Sidebar from './Sidebar';

interface Props {
  children: React.ReactElement;
  window?: () => Window;
}

const ScrollAppBar: React.FC<Props> = ({ children, window }) => {
  const { themeMode } = useAppSelector((state) => state.themeMode);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? 'text.primary'
        : themeMode === ThemeModes.DARK
        ? 'primary.contrastText'
        : 'text.primary',
      backgroundColor: trigger
        ? 'background.paper'
        : themeMode === ThemeModes.DARK
        ? 'transparent'
        : 'background.paper',
    },
  });
};

const Topbar = () => {
  const { user } = useAppSelector((state) => state.user);
  const { appState } = useAppSelector((state) => state.appState);
  const { themeMode } = useAppSelector((state) => state.themeMode);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useAppDispatch();

  const onSwitchTheme = () => {
    const theme =
      themeMode === ThemeModes.DARK ? ThemeModes.LIGHT : ThemeModes.DARK;

    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen((prevState) => !prevState);

  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 1000 }}>
          <Toolbar
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: 'none' } }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
                <Logo />
              </Box>
            </Stack>

            {/* main menu */}
            <Box
              flex={1}
              alignItems="center"
              display={{ xs: 'none', md: 'flex' }}
            >
              <Box sx={{ marginRight: '30px' }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((item, index) => (
                <Button
                  component={Link}
                  to={item.path}
                  variant={appState.includes(item.state) ? 'contained' : 'text'}
                  key={index}
                  sx={{
                    color: appState.includes(item.state)
                      ? 'primary.contrastText'
                      : 'inherit',
                    mr: 2,
                  }}
                >
                  {item.display}
                </Button>
              ))}
              <IconButton sx={{ color: 'inherit' }} onClick={onSwitchTheme}>
                {themeMode === ThemeModes.DARK ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <WbSunnyOutlinedIcon />
                )}
              </IconButton>
            </Box>
            {/* main menu */}

            {/* user menu */}
            <Stack spacing={3} direction="row" alignItems="center">
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  sign in
                </Button>
              )}
            </Stack>

            {!!user && <UserMenu />}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;
