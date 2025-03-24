export const SHARED_STATE = 'shared';

export interface SharedState {
  isAppLoading: boolean;
}

export const initialState: SharedState = {
  isAppLoading: false,
};

