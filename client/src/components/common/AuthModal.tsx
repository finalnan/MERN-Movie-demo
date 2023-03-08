import { Box, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import Logo from './Logo';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

export enum ActionState {
  SIGN_IN = 'signin',
  SIGN_UP = 'signup',
}

const AuthModal = () => {
  const { authModalOpen } = useAppSelector((state) => state.authModal);

  const dispatch = useAppDispatch();

  const [action, setAction] = useState(ActionState.SIGN_IN);

  useEffect(() => {
    if (authModalOpen) setAction(ActionState.SIGN_IN);
  }, [authModalOpen]);

  const handleClose = () => dispatch(setAuthModalOpen(false));

  const switchAuthState = (state: ActionState) => setAction(state);

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '100%',
          maxWidth: '600px',
          padding: 4,
          outline: 'none',
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: 'background.paper',
          }}
        >
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Logo />
          </Box>

          {action === ActionState.SIGN_IN ? (
            <SigninForm
              switchAuthState={() => switchAuthState(ActionState.SIGN_UP)}
            />
          ) : (
            <SignupForm
              switchAuthState={() => switchAuthState(ActionState.SIGN_IN)}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
