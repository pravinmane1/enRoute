import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { ROUTER_STATE } from './router/router.selectors';
import { RouterStateUrl } from './router/custom-route-serializer';
import { SHARED_STATE, SharedState } from './shared/shared.state';
import { sharedReducer } from './shared/shared.reducer';

export interface AppState {
  [ROUTER_STATE]: RouterReducerState<RouterStateUrl>;
  [SHARED_STATE]: SharedState;
}

export const appReducers = {
  [ROUTER_STATE]: routerReducer,
  [SHARED_STATE]: sharedReducer,
};
