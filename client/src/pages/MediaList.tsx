import { Box, Button, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState, useMemo } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useParams } from 'react-router-dom';
import tmdbConfigs, {
  MediaCategory,
  MediaType,
} from '../api/configs/tmdb.configs';
import mediaApi from '../api/modules/media.api';
import uiConfigs from '../configs/ui.configs';
import HeroSilde from '../components/common/HeroSilde';
import MediaGrid from '../components/common/MediaGrid';
import { setAppState } from '../redux/features/appStateSlice';
import { Media, Movie, TV } from '../types/media';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { toast } from 'react-toastify';

const MediaList = () => {
  const { mediaType } = useParams();

  const [medias, setMedias] = useState<Media[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrpage] = useState(1);

  const dispatch = useAppDispatch();

  const category = ['Popular', 'Top rated'];

  const mediaCategories = useMemo(
    () => [MediaCategory.POPULAR, MediaCategory.TOPRATED],
    []
  );

  useEffect(() => {
    dispatch(setAppState(mediaType!));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    if (!mediaType) return;
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);

      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage,
      });

      setMediaLoading(false);
      dispatch(setGlobalLoading(false));
      if (error) toast.error(error.message);
      if (response) {
        if (currPage !== 1) setMedias((m) => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
    };

    getMedias();
  }, [mediaType, currCategory, currPage, mediaCategories, dispatch]);

  const handleCategoryChange = (categoryIndex: number) => {
    if (currCategory === categoryIndex) return;
    setMedias([]);
    setCurrpage(1);
    setCurrCategory(categoryIndex);
  };

  const loadMore = () => setCurrpage(currPage + 1);

  return (
    <>
      <HeroSilde
        mediaType={mediaType!}
        mediaCategory={mediaCategories[currCategory]}
      />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 2 }}
        >
          <Typography fontWeight={700} variant="h5">
            {mediaType === tmdbConfigs.MediaType.MOVIE ? 'Movies' : 'TV Series'}
          </Typography>
          <Stack direction="row" spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={`${cate}${index}`}
                size="large"
                variant={currCategory === index ? 'contained' : 'text'}
                sx={{
                  color:
                    currCategory === index
                      ? 'primary.contrastText'
                      : 'text.primary',
                }}
                onClick={() => handleCategoryChange(index)}
              >
                {cate}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid
          medias={
            mediaType === MediaType.MOVIE
              ? (medias as Movie[])
              : (medias as TV[])
          }
          mediaType={mediaType!}
        />
        <LoadingButton
          sx={{ marginTop: 8 }}
          fullWidth
          color="primary"
          loading={mediaLoading}
          onClick={loadMore}
        >
          Load more
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;
