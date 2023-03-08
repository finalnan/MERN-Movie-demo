import { LoadingButton } from '@mui/lab';
import { Box, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Container from '../components/common/Container';
import uiConfigs from '../configs/ui.configs';
import { useState } from 'react';
import userApi from '../api/modules/user.api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/userSlice';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { UserPasswordUpdate } from '../api/modules/user';

const PasswordUpdate = () => {
  const [onRequest, setOnRequest] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .min(8, 'Password minimum 8 characters!')
        .required('Password is required!'),
      newPassword: yup
        .string()
        .min(8, 'Password minimum 8 characters!')
        .required('Password is required!'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'confirmNewPassword not match')
        .min(8, 'Password minimum 8 characters!')
        .required('Password is required!'),
    }),
    onSubmit: async (values) => handleFormSubmit(values),
  });

  const handleFormSubmit = async (values: UserPasswordUpdate) => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, error } = await userApi.passwordUpdate(values);
    setOnRequest(false);

    if (error) toast.error(error.message);
    if (response) {
      form.resetForm();
      navigate('/');
      dispatch(setUser(null));
      dispatch(setAuthModalOpen(true));
      toast.success('Update password success! Please sign in again');
    }
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="Update Password">
        <Box component="form" maxWidth="400px" onSubmit={form.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="password"
              placeholder="Password"
              name="password"
              fullWidth
              value={form.values.password}
              onChange={form.handleChange}
              color="primary"
              error={form.touched.password && !!form.errors.password}
              helperText={form.touched.password && form.errors.password}
            />

            <TextField
              type="password"
              placeholder="New Password"
              name="newPassword"
              fullWidth
              value={form.values.newPassword}
              onChange={form.handleChange}
              color="primary"
              error={form.touched.newPassword && !!form.errors.newPassword}
              helperText={form.touched.newPassword && form.errors.newPassword}
            />

            <TextField
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              fullWidth
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              color="primary"
              error={
                form.touched.confirmPassword && !!form.errors.confirmPassword
              }
              helperText={
                form.touched.confirmPassword && form.errors.confirmPassword
              }
            />
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 4 }}
              loading={onRequest}
            >
              Update Password
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default PasswordUpdate;
