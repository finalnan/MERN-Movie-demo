import { Box } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import { Movie, TV } from '../../types/media';
import AutoSwiper from './AutoSwiper';
import MediaItem from './MediaItem';

interface Props {
  medias: Movie[] | TV[];
  mediaType: string;
}

const RecommendSlide: React.FC<Props> = ({ medias, mediaType }) => {
  return (
    <AutoSwiper>
      {medias.map((media) => (
        <SwiperSlide key={media.id}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendSlide;
