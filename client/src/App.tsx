import { ThemeProvider, PaletteMode, CssBaseline } from '@mui/material';
import { useAppSelector } from './redux/hooks';
import { ToastContainer, Theme } from 'react-toastify';

import themeConfigs from './configs/theme.configs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import routes from './routes/routes';
import PageWrapper from './components/common/PageWrapper';

import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const App = () => {
  const { themeMode } = useAppSelector((state) => state.themeMode);

  return (
    <ThemeProvider
      theme={themeConfigs.custom({ mode: themeMode as PaletteMode })}
    >
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        theme={themeMode as Theme}
      />
      <CssBaseline />

      {/* app routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) =>
              route.index ? (
                <Route
                  index
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              )
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
