import { Box, Toolbar, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PersonMediaGrid from '../components/common/PersonMediaGrid';
import tmdbConfigs from '../api/configs/tmdb.configs';
import uiConfigs from '../configs/ui.configs';
import Container from '../components/common/Container';
import personApi from '../api/modules/person.api';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../redux/hooks';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { Person } from '../types/media';

const PersonDetail = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState<Person | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getPerson = async () => {
      if (!personId) return;
      dispatch(setGlobalLoading(true));
      const { response, error } = await personApi.detail({ personId });
      setGlobalLoading(false);
      if (error) toast.error(error.message);
      if (response) setPerson(response);
    };

    getPerson();
  }, [personId]);

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
              }}
            >
              <Box
                sx={{
                  width: { xs: '50%', md: '20%' },
                }}
              >
                <Box
                  sx={{
                    paddingTop: '160%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'darkgrey',
                    backgroundImage: `url(${tmdbConfigs.posterPath(
                      person.profile_path
                    )})`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: {
                    xs: '100%',
                    md: '80%',
                  },
                  padding: {
                    xs: '1rem 0',
                    md: '1rem 2rem',
                  },
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight={700}>
                    {`${person.name} (${person.birthday?.split('-')[0]}`}
                    {person.deathday && `- ${person.deathday.split('-')[0]}`}
                    {')'}
                  </Typography>
                  <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                    {person.biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Container header="Medias">
              <PersonMediaGrid personId={personId!} />
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default PersonDetail;
