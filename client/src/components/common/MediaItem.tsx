import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tmdbConfigs, { MediaType } from '../../api/configs/tmdb.configs';
import uiConfigs from '../../configs/ui.configs';
import { routesGen } from '../../routes/routes';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularRate from './CicularRate';
import { useAppSelector } from '../../redux/hooks';
import favoriteUtils from '../../utils/favorite.utils';
import { Movie, Person, TV } from '../../types/media';

interface Props {
  media: Movie | TV | Person;
  mediaType: string;
}

const MediaItem: React.FC<Props> = ({ media, mediaType }) => {
  const { listFavorites } = useAppSelector((state) => state.user);
  const [title, setTitle] = useState('');

  const [posterPath, setPosterPath] = useState('');
  const [releaseDate, setReleaseDate] = useState<string | null>(null);
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    setTitle((media as Movie).title || (media as TV).name);

    setPosterPath(
      tmdbConfigs.posterPath(
        (media as TV).poster_path ||
          (media as Movie).backdrop_path ||
          (media as Person).profile_path
      )
    );

    if (mediaType === tmdbConfigs.MediaType.MOVIE) {
      setReleaseDate(
        (media as Movie).release_date &&
          (media as Movie).release_date.split('-')[0]
      );
    } else {
      setReleaseDate(
        (media as TV).first_air_date &&
          (media as TV).first_air_date.split('-')[0]
      );
    }
    setRate((media as TV | Movie).vote_average);
  }, [media, mediaType]);

  return (
    <Link
      to={
        mediaType !== MediaType.People
          ? routesGen.mediaDetail(mediaType, media.id)
          : routesGen.person(media.id)
      }
    >
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(posterPath),
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
        {mediaType !== MediaType.People && (
          <>
            {favoriteUtils.check({
              listFavorites,
              mediaId: String(media.id),
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
                {rate && <CircularRate value={rate} />}
                <Typography>{releaseDate}</Typography>

                <Typography
                  variant="body1"
                  fontWeight={700}
                  sx={{
                    fontSize: '1rem',
                    ...uiConfigs.style.typoLines(1, 'left'),
                  }}
                >
                  {title}
                </Typography>
              </Stack>
            </Box>
          </>
        )}

        {/* people */}
        {mediaType === MediaType.People && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: 'max-content',
              bottom: 0,
              padding: '10px',
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}
          >
            <Typography sx={{ ...uiConfigs.style.typoLines(1, 'left') }}>
              {(media as Person).name}
            </Typography>
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default MediaItem;