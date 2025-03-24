import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from './custom-route-serializer';

export const ROUTER_STATE = 'router';
const getRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>(ROUTER_STATE);

export const selectRouterUrl = createSelector(
  getRouterState,
  (router) => router?.state?.url
);
export const selectRouteQueryParams = createSelector(
  getRouterState,
  (router) => router?.state?.queryParams
);
