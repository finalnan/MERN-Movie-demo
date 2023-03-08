import { Box } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '../../api/configs/tmdb.configs';
import type { Image } from '../../types/images';
import NavigationSwiper from './NavigationSwiper';

interface Props {
  backdrops: Image[];
}

const BackdropSlide: React.FC<Props> = ({ backdrops }) => {
  return (
    <NavigationSwiper>
      {[...backdrops].splice(0, 10).map((backdrop, index) => (
        <SwiperSlide key={`${backdrop.file_path.split('/')[-1]} ${index}`}>
          <Box
            sx={{
              paddingTop: '60%',
              backgroundPosition: 'top',
              backgroundSize: 'cover',
              backgroundImage: `url(${tmdbConfigs.backdropPath(
                backdrop.file_path
              )})`,
            }}
          />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default BackdropSlide;
