import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import CircularRate from '../components/common/CicularRate';
import Container from '../components/common/Container';
import ImageHeader from '../components/common/ImageHeader';

import uiConfigs from '../configs/ui.configs';
import tmdbConfigs from '../api/configs/tmdb.configs';
import mediaApi from '../api/modules/media.api';
import favoriteApi from '../api/modules/favorite.api';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { addFavorite, removeFavorite } from '../redux/features/userSlice';

import { Genre } from '../types/genre';
import { Media } from '../types/media';
import { isMovie } from '../utils/isMovie.utils';
import CastSlide from '../components/common/CastSlide';
import MediaVideosSlide from '../components/common/MediaVideosSlide';
import BackdropSlide from '../components/common/BackdropSlide';
import PosterSlide from '../components/common/PosterSlide';
import RecommendSlide from '../components/common/RecommendSlide';
import MediaSlide from '../components/common/MediaSlide';
import MediaReview from '../components/common/MediaReview';

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();

  const { user, listFavorites } = useAppSelector((state) => state.user);

  const [media, setMedia] = useState<Media | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);

  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLDivElement | null>(null);

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    if (!media) {
      setOnRequest(false);
      return;
    }

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name!,
      mediaType: mediaType!,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };
    const { response, error } = await favoriteApi.add(body);

    setOnRequest(false);
    if (error) toast.error(error.message);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success('Add favorite success');
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const favorite = listFavorites.find(
      (favorite) => favorite.mediaId.toString() === media?.id.toString()
    );

    if (!favorite) return;

    const { response, error } = await favoriteApi.remove({
      favoriteId: favorite.id,
    });
    setOnRequest(false);

    if (error) toast.error(error.message);
    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success('Remove favorite success!');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      if (!mediaType || !mediaId) {
        setGlobalLoading(false);
        return;
      }

      const { response, error } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      dispatch(setGlobalLoading(false));

      if (!!response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));
      }

      if (error) {
        toast.error(error.message);
      }
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  if (!media) return null;

  return (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.poster_path || media.backdrop_path
        )}
      />
      <Box
        sx={{ color: 'primary.contrastText', ...uiConfigs.style.mainContent }}
      >
        <Box
          sx={{
            marginTop: {
              xs: '-10rem',
              md: '-15rem',
              lg: '-20rem',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: '70%',
                  sm: '50%',
                  md: '40%',
                },
                margin: {
                  xs: '0 auto 2rem',
                  md: '0 2rem 0 0',
                },
              }}
            >
              <Box
                sx={{
                  paddingTop: '140%',
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(
                      media.poster_path || media.backdrop_path
                    )
                  ),
                }}
              />
            </Box>

            <Box
              sx={{
                width: {
                  xs: '100%',
                  md: '60%',
                },
                color: 'text.primary',
              }}
            >
              <Stack spacing={5}>
                {/* title */}
                <Typography
                  variant="h4"
                  fontWeight={700}
                  fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
                  sx={{ ...uiConfigs.style.typoLines(2, 'left') }}
                >
                  {isMovie(media)
                    ? `${media.title} ${media.release_date.split('-')[0]}`
                    : `${media.name} ${media.first_air_date.split('-')[0]}`}
                </Typography>

                {/* rate and genres */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularRate value={media.vote_average} />
                  <Divider orientation="vertical" />
                  {genres.map((genre) => (
                    <Chip
                      key={`${genre.name} ${genre.id}`}
                      label={genre.name}
                      variant="filled"
                      color="primary"
                    />
                  ))}
                </Stack>
                {/* overview */}
                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {media.overview}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: 'max-content',
                      '& .MuiButton-startIcon': {
                        marginRight: 0,
                      },
                    }}
                    size="large"
                    startIcon={
                      isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition="start"
                    loading={onRequest}
                    onClick={onFavoriteClick}
                  />
                  <Button
                    variant="contained"
                    sx={{ width: 'max-content' }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => videoRef.current?.scrollIntoView()}
                  >
                    Watch Now
                  </Button>
                </Stack>

                {/* cast */}
                <Container header="Cast">
                  <CastSlide casts={media.credits.cast} />
                </Container>
              </Stack>
            </Box>
          </Box>
        </Box>

        {/* videos */}
        <div ref={videoRef} style={{ paddingTop: '2rem' }}>
          <Container header="Videos">
            <MediaVideosSlide videos={[...media.videos.results].splice(0, 5)} />
          </Container>
        </div>

        {/* backdrops */}
        {media.images.backdrops.length > 0 && (
          <Container header="Backdrops">
            <BackdropSlide backdrops={media.images.backdrops} />
          </Container>
        )}

        {/* posters */}
        {media.images.posters.length > 0 && (
          <Container header="Posters">
            <PosterSlide posters={media.images.posters} />
          </Container>
        )}

        {/* review */}
        <MediaReview
          reviews={media.reviews}
          mediaType={mediaType!}
          media={media}
        />

        {/* Recommendation */}
        <Container header="You may also like">
          {media.recommend.length > 0 ? (
            <RecommendSlide medias={media.recommend} mediaType={mediaType!} />
          ) : (
            <MediaSlide
              mediaType={mediaType!}
              mediaCategory={tmdbConfigs.MediaCategory.TOPRATED}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

export default MediaDetail;
