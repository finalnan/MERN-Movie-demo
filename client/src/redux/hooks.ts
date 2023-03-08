import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppdisPatch } from './store';

export const useAppDispatch: () => AppdisPatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
