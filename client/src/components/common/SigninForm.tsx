import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import * as yup from 'yup';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import { setUser } from '../../redux/features/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import userApi from '../../api/modules/user.api';

interface Props {
  switchAuthState: () => void;
}

const SigninForm: React.FC<Props> = ({ switchAuthState }) => {
  const dispatch = useAppDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signinForm = useFormik({
    initialValues: {
      password: '',
      username: '',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(8, 'Username minimum 8 characters!')
        .required('Username is required!'),
      password: yup
        .string()
        .min(8, 'Password minimum 8 characters!')
        .required('Password is required!'),
    }),
    onSubmit: async (values) => {
      setIsLoginRequest(true);
      const { response, error } = await userApi.signin(values);
      setIsLoginRequest(false);
      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success('Sign in success!');
      }
      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Username"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="primary"
          error={signinForm.touched.username && !!signinForm.errors.username}
          helperText={signinForm.touched.username && signinForm.errors.username}
        />

        <TextField
          type="password"
          placeholder="Password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="primary"
          error={signinForm.touched.password && !!signinForm.errors.password}
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        Sign In
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: 2 }} onClick={() => switchAuthState()}>
        Sign Up
      </Button>
      {!!errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SigninForm;
