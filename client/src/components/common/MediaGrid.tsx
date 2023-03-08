import { Grid } from '@mui/material';
import { TV, Movie } from '../../types/media';
import MediaItem from './MediaItem';

interface Props {
  medias: TV[] | Movie[];
  mediaType: string;
}

const MediaGrid: React.FC<Props> = ({ medias, mediaType }) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: '-8px !important' }}>
      {medias.map((media) => (
        <Grid item xs={6} sm={4} md={3} key={media.id}>
          <MediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaGrid;
