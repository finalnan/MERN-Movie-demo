import { useEffect } from 'react';
import { setAppState } from '../../redux/features/appStateSlice';
import { useAppDispatch } from '../../redux/hooks';

interface Props {
  state: string;
  children?: React.ReactNode;
}

const PageWrapper: React.FC<Props> = ({ state, children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(setAppState(state));
  }, [state, dispatch]);

  return <>{children}</>;
};

export default PageWrapper;
