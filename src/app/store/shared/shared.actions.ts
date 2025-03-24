import { createAction } from '@ngrx/store';

const SHOW_LOADER = '[Shared] Show loader';
const HIDE_LOADER = '[Shared] Hide loader';
export const showLoader = createAction(SHOW_LOADER);
export const hideLoader = createAction(HIDE_LOADER);
