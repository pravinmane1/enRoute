import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SHARED_STATE, SharedState } from './shared.state';

const featureSelector = createFeatureSelector<SharedState>(SHARED_STATE);

export const selectIsAppLoading = createSelector(
  featureSelector,
  (state) => state.isAppLoading
);
