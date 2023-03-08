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

const SignupForm: React.FC<Props> = ({ switchAuthState }) => {
  const dispatch = useAppDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signupForm = useFormik({
    initialValues: {
      password: '',
      username: '',
      displayName: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(8, 'username minimum 8 characters!')
        .required('username is required!'),
      password: yup
        .string()
        .min(8, 'password minimum 8 characters!')
        .required('password is required!'),
      displayName: yup
        .string()
        .min(8, 'Display name minimum 8 characters!')
        .required('Display name is required!'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'confirmPassword not match')

        .min(8, 'Confirm password name minimum 8 characters!')
        .required('Confirm password name is required!'),
    }),
    onSubmit: async (values) => {
      setIsLoginRequest(true);
      const { response, error } = await userApi.signup(values);
      setIsLoginRequest(false);
      if (response) {
        signupForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success('Sign in success!');
      }
      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <Box component="form" onSubmit={signupForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Username"
          name="username"
          fullWidth
          value={signupForm.values.username}
          onChange={signupForm.handleChange}
          color="primary"
          error={signupForm.touched.username && !!signupForm.errors.username}
          helperText={signupForm.touched.username && signupForm.errors.username}
        />

        <TextField
          type="text"
          placeholder="Display name"
          name="displayName"
          fullWidth
          value={signupForm.values.displayName}
          onChange={signupForm.handleChange}
          color="primary"
          error={
            signupForm.touched.displayName && !!signupForm.errors.displayName
          }
          helperText={
            signupForm.touched.displayName && signupForm.errors.displayName
          }
        />
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          fullWidth
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
          color="primary"
          error={signupForm.touched.password && !!signupForm.errors.password}
          helperText={signupForm.touched.password && signupForm.errors.password}
        />

        <TextField
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          fullWidth
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
          color="primary"
          error={
            signupForm.touched.confirmPassword &&
            !!signupForm.errors.confirmPassword
          }
          helperText={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword
          }
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
        Sign Up
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: 2 }} onClick={() => switchAuthState()}>
        Sign In
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

export default SignupForm;
