import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { toast } from 'react-toastify';
import Container from '../components/common/Container';
import uiConfigs from '../configs/ui.configs';
import favoriteApi from '../api/modules/favorite.api';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { removeFavorite } from '../redux/features/userSlice';
import { Favorite } from '../types/favorite';
import FavoriteMedia from '../components/common/FavoriteItem';

interface FavoriteItemProps {
  media: Favorite;
  onRemoved: (id: string) => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ media, onRemoved }) => {
  const dispatch = useAppDispatch();
  const [onRequest, setOnRequest] = useState(false);
  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, error } = await favoriteApi.remove({
      favoriteId: media.id!,
    });
    setOnRequest(false);

    if (error) toast(error.message);
    if (response) {
      toast.success('Remove favorite success');
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media.id!);
    }
  };

  return (
    <>
      <FavoriteMedia media={media} />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loading={onRequest}
        loadingPosition="start"
        onClick={onRemove}
      />
    </>
  );
};

const FavoriteList = () => {
  const [medias, setMedias] = useState<Favorite[]>([]);
  const [filteredMedias, setFilteredMedias] = useState<Favorite[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useAppDispatch();

  const skip = 8;

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));
      if (error) toast.error(error.message);
      if (response) {
        setCount(response.length);
        setMedias([...response]);
        setFilteredMedias([...response.splice(0, skip)]);
      }
    };

    getFavorites();
  }, [dispatch]);

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id: string) => {
    const newMedias = [...medias].filter((media) => media.id !== id);
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your favorites (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: '-8px !important' }}>
          {filteredMedias.map((media: any) => (
            <Grid item xs={6} sm={4} md={3} key={media.id}>
              <FavoriteItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button onClick={onLoadMore}>Load More</Button>
        )}
      </Container>
    </Box>
  );
};

export default FavoriteList;
