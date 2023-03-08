import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '../../api/configs/tmdb.configs';
import NavigationSwiper from './NavigationSwiper';

import type { Video } from '../../types/video';

interface Props {
  videos: Video[];
}
interface VideoProps {
  video: Video;
}

const MediaVideo: React.FC<VideoProps> = ({ video }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);

  return (
    <Box sx={{ height: 'max-content' }}>
      <iframe
        key={video.key}
        src={tmdbConfigs.youtubePath(video.key)}
        ref={iframeRef}
        width="100%"
        title={video.id}
        style={{ border: 0 }}
      />
    </Box>
  );
};

const MediaVideosSlide: React.FC<Props> = ({ videos }) => {
  return (
    <NavigationSwiper>
      {videos.map((video) => (
        <SwiperSlide key={video.key}>
          <MediaVideo video={video} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default MediaVideosSlide;
