import { useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';

import { useAppDispatch } from '../../redux/hooks';
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice';
import { routesGen } from '../../routes/routes';
import uiConfigs from '../../configs/ui.configs';
import CircularRate from './CicularRate';
import genreApi from '../../api/modules/genre.api';
import mediaApi from '../../api/modules/media.api';
import tmdbConfigs from '../../api/configs/tmdb.configs';

import type { Genre } from '../../types/genre';
import type { Movie } from '../../types/media';

interface Props {
  mediaType: string;
  mediaCategory: string;
}

const HeroSilde: React.FC<Props> = ({ mediaType, mediaCategory }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const theme = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) {
        setMovies(response.results);
      }
      if (error) toast.error(error.message);

      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await genreApi.getList({ mediaType });

      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (error) {
        toast.error(error.message);
        setGlobalLoading(false);
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box
      sx={{
        position: 'relative',
        color: 'primary.contrastText',
        '&::before': {
          content: '""',
          width: '100%',
          height: '30%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: 'none',
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: '100%', height: 'max-content' }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Box
              sx={{
                paddingTop: {
                  xs: '130%',
                  sm: '80%',
                  md: '60%',
                  lg: '45%',
                },
                backgroundPosition: 'top',
                backgroundSize: 'cover',
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  movie.backdrop_path
                )})`,
              }}
            />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                ...uiConfigs.style.horizontalGradientBgImage[
                  theme.palette.mode
                ],
              }}
            />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                paddingX: { sm: '10px', md: '5rem', lg: '10rem' },
                top: 0,
                left: 0,
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  paddingX: '30px',
                  color: 'text.primary',
                  width: { sm: 'unset', md: '30%', lg: '40%' },
                }}
              >
                <Stack spacing={4} direction="column" alignItems="center">
                  <Typography
                    variant="h4"
                    fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
                    fontWeight={700}
                    sx={{
                      ...uiConfigs.style.typoLines(2, 'left'),
                    }}
                  >
                    {movie.title}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <CircularRate value={movie.vote_average} />

                    <Divider orientation="vertical" />

                    {[...movie.genre_ids].splice(0, 2).map((genreId, index) => (
                      <Chip
                        key={`${genreId}-${index}`}
                        variant="filled"
                        color="primary"
                        label={
                          genres.find((genre) => genre.id === genreId) &&
                          genres.find((genre) => genre.id === genreId)?.name
                        }
                      />
                    ))}
                  </Stack>

                  <Typography
                    variant="body1"
                    sx={{ ...uiConfigs.style.typoLines(3) }}
                  >
                    {movie.overview}
                  </Typography>

                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={routesGen.mediaDetail(mediaType, movie.id)}
                    sx={{ width: 'max-content' }}
                  >
                    Watch Now
                  </Button>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSilde;
