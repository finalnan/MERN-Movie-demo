import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AuthModal from '../common/AuthModal';
import Footer from '../common/Footer';
import GlobalLoading from '../common/GlobalLoading';
import Topbar from '../common/Topbar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import userApi from '../../api/modules/user.api';
import favoriteApi from '../../api/modules/favorite.api';
import { setListFavorites, setUser } from '../../redux/features/userSlice';

const MainLayout = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      const { response, error } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (error) dispatch(setUser(null));
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, error } = await favoriteApi.getList();
      if (response) dispatch(setListFavorites(response));
      if (error) toast.error(error.message);
    };

    if (user) getFavorites();
    if (!user) dispatch(setListFavorites([]));
  }, [user, dispatch]);

  return (
    <>
      <GlobalLoading />
      {/* login modal */}
      <AuthModal />

      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar />
        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>
      {/* footer */}
      <Footer />
    </>
  );
};

export default MainLayout;
