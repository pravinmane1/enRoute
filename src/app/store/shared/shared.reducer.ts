import { createReducer, on } from '@ngrx/store';
import { initialState } from './shared.state';
import { hideLoader, showLoader } from './shared.actions';

export const sharedReducer = createReducer(
  initialState,
  on(showLoader, (state) => ({ ...state, isAppLoading: true })),
  on(hideLoader, (state) => ({ ...state, isAppLoading: false }))
);
