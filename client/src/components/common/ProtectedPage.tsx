import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';

interface Props {
  children?: React.ReactNode;
}

const ProtectedPage: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(setAuthModalOpen(!user));
  }, [user, dispatch]);

  return user ? <>{children}</> : null;
};

export default ProtectedPage;
