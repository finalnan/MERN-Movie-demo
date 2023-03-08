import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, TextField, Toolbar } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { MediaType } from '../api/configs/tmdb.configs';
import mediaApi from '../api/modules/media.api';
import MediaGrid from '../components/common/MediaGrid';
import uiConfigs from '../configs/ui.configs';
import { Media, Person } from '../types/media';

let timer: NodeJS.Timeout;
const timeout = 5000;

const mediaTypes = ['movie', 'tv', 'people'];

const MediaSearch = () => {
  const [query, setQuery] = useState('');
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(MediaType.MOVIE);
  const [medias, setMedias] = useState<Media[] | Person[]>([]);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    if (query.trim().length <= 0) return;
    setOnSearch(true);

    const { response, error } = await mediaApi.search({
      mediaType,
      query,
      page,
    });
    setOnSearch(false);
    if (error) toast.error(error.message);
    if (response) {
      if (page > 1)
        setMedias((media) => [...media, ...(response as any).results]);
      else setMedias([...response.results]);
    }
  }, [mediaType, query, page]);

  useEffect(() => {
    if (query.trim().length <= 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  const handleCategoryChange = (selectedCategory: MediaType) =>
    setMediaType(selectedCategory);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            {mediaTypes.map((type) => (
              <Button
                key={type}
                size="large"
                variant={mediaType === type ? 'contained' : 'text'}
                sx={{
                  color:
                    mediaType === type
                      ? 'primary.contrastText'
                      : 'text.primary',
                }}
                onClick={() => handleCategoryChange(type as MediaType)}
              >
                {type}
              </Button>
            ))}
          </Stack>
          <TextField
            color="primary"
            placeholder="Search..."
            sx={{
              width: '100%',
            }}
            autoFocus
            onChange={handleQueryChange}
          />

          <MediaGrid medias={medias as any} mediaType={mediaType} />
          {medias.length > 0 && (
            <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
              Load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
