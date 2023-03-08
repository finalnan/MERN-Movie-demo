import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import AutoSwiper from './AutoSwiper';
import mediaApi from '../../api/modules/media.api';
import { toast } from 'react-toastify';
import { Movie, Person, TV } from '../../types/media';
import MediaItem from './MediaItem';

interface Props {
  mediaType: string;
  mediaCategory: string;
}

const MediaSlide: React.FC<Props> = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState<Movie[] | TV[] | Person[]>([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMedias(response.results);
      if (error) toast.error(error.message);
    };

    getMedias();
  }, [mediaCategory, mediaType]);

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

export default MediaSlide;
