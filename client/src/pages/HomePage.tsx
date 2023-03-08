import HeroSilde from '../components/common/HeroSilde';
import tmdbConfigs from '../api/configs/tmdb.configs';
import { Box } from '@mui/material';
import uiConfigs from '../configs/ui.configs';
import Container from '../components/common/Container';
import MediaSlide from '../components/common/MediaSlide';

const HomePage = () => {
  return (
    <div>
      <HeroSilde
        mediaType={tmdbConfigs.MediaType.MOVIE}
        mediaCategory={tmdbConfigs.MediaCategory.POPULAR}
      />

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="popular movies">
          <MediaSlide
            mediaType={tmdbConfigs.MediaType.MOVIE}
            mediaCategory={tmdbConfigs.MediaCategory.POPULAR}
          />
        </Container>

        <Container header="popular series">
          <MediaSlide
            mediaType={tmdbConfigs.MediaType.TV}
            mediaCategory={tmdbConfigs.MediaCategory.POPULAR}
          />
        </Container>

        <Container header="top rated movies">
          <MediaSlide
            mediaType={tmdbConfigs.MediaType.MOVIE}
            mediaCategory={tmdbConfigs.MediaCategory.TOPRATED}
          />
        </Container>

        <Container header="top rated series">
          <MediaSlide
            mediaType={tmdbConfigs.MediaType.TV}
            mediaCategory={tmdbConfigs.MediaCategory.TOPRATED}
          />
        </Container>
      </Box>
    </div>
  );
};

export default HomePage;
