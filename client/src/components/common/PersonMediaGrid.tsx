import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MediaType } from '../../api/configs/tmdb.configs';
import personApi from '../../api/modules/person.api';
import { Cast } from '../../types/cast';
import { TV } from '../../types/media';
import MediaItem from './MediaItem';

interface Props {
  personId: string;
}

const PersonMediaGrid: React.FC<Props> = ({ personId }) => {
  const [medias, setMedias] = useState<Cast[]>([]);
  const [filteredMedias, setFilteredMedias] = useState<Cast[]>([]);
  const [page, setPage] = useState(1);
  const skip = 8;

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await personApi.medias({ personId });

      if (error) toast.error(error.message);
      if (response) {
        const mediasSorted = response.cast.sort(
          (a, b) => getReleaseDate(b) - getReleaseDate(a)
        );
        setMedias([...mediasSorted]);
        setFilteredMedias([...mediasSorted].splice(0, skip));
      }
    };
    getMedias();
  }, [personId]);

  const getReleaseDate = (media: Cast) => {
    const date =
      media.media_type === MediaType.MOVIE
        ? new Date(media.release_date)
        : new Date((media as any as TV).first_air_date);

    return date.getTime();
  };

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  return (
    <>
      <Grid container spacing={1} sx={{ marginRight: '-8px !important' }}>
        {medias.map((media) => (
          <Grid item xs={6} sm={4} md={3} key={media.id}>
            <MediaItem media={media as any} mediaType={media.media_type} />
          </Grid>
        ))}
      </Grid>
      {filteredMedias.length < medias.length && (
        <Button onClick={onLoadMore}>Load More</Button>
      )}
    </>
  );
};

export default PersonMediaGrid;
