import { Box } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '../../api/configs/tmdb.configs';
import type { Image } from '../../types/images';
import AutoSwiper from './AutoSwiper';

interface Props {
  posters: Image[];
}

const BackdropSlide: React.FC<Props> = ({ posters }) => {
  return (
    <AutoSwiper>
      {[...posters].splice(0, 10).map((posters, index) => (
        <SwiperSlide key={`${posters.file_path.split('/')[-1]} ${index}`}>
          <Box
            sx={{
              paddingTop: '160%',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundImage: `url(${tmdbConfigs.posterPath(
                posters.file_path
              )})`,
            }}
          />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default BackdropSlide;
