import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import uiConfigs from '../../configs/ui.configs';
import { useAppSelector } from '../../redux/hooks';
import { routesGen } from '../../routes/routes';
import { Favorite } from '../../types/favorite';
import favoriteUtils from '../../utils/favorite.utils';

import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CircularRate from './CicularRate';

interface Props {
  media: Favorite;
}

const FavoriteMedia: React.FC<Props> = ({ media }) => {
  const { listFavorites } = useAppSelector((state) => state.user);

  const { mediaType, mediaId, mediaPoster, mediaTitle, mediaRate } = media;

  const mediaPosterUrl = `https://image.tmdb.org/t/p/w500/${mediaPoster}`;

  return (
    <Link to={routesGen.mediaDetail(mediaType, Number(mediaId))}>
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(mediaPosterUrl),
          paddingTop: '160%',
          '&:hover .media-info': {
            opacity: 1,
            bottom: 0,
          },
          '&:hover .media-back-drop, &:hover .media-play-btn': {
            opacity: 1,
          },
          color: 'primary.contrastText',
        }}
      >
        <Box>
          {favoriteUtils.check({
            listFavorites,
            mediaId: String(mediaId),
          }) && (
            <FavoriteIcon
              color="primary"
              sx={{
                position: 'absolute',
                top: 2,
                right: 2,
                fontSize: '2rem',
              }}
            />
          )}
          <Box
            className="media-back-drop"
            sx={{
              opacity: { xs: 1, md: 0 },
              transition: 'all 0.3s ease',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundImage:
                'linear-gradient(to top, rgba(0,0,0,1),rgba(0,0,0,0))',
            }}
          />
          <Button
            className="media-play-btn"
            variant="contained"
            startIcon={<PlayArrowIcon />}
            sx={{
              display: { xs: 'none', md: 'flex' },
              opacity: 0,
              transition: 'all 0.3s ease',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              '& .MuiButton-startIcon': {
                marginRight: '-4px',
              },
            }}
          />
          <Box
            className="media-info"
            sx={{
              transition: 'all 0.3s ease',
              opacity: {
                xs: 1,
                md: 0,
              },
              position: 'absolute',
              bottom: {
                xs: '0',
                md: '-20px',
              },
              width: '100%',
              height: 'max-content',
              boxSizing: 'border-box',
              padding: { xs: '10px', md: '2rem 1rem' },
            }}
          >
            <Stack spacing={{ xs: 1, md: 2 }}>
              {mediaRate && <CircularRate value={mediaRate} />}
              <Typography>{mediaRate}</Typography>
              <Typography
                variant="body1"
                fontWeight={700}
                sx={{
                  fontSize: '1rem',
                  ...uiConfigs.style.typoLines(1, 'left'),
                }}
              >
                {mediaTitle}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default FavoriteMedia;
