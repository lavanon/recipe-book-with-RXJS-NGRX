import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './router.serializer';

const getRouterState = createFeatureSelector<
    RouterReducerState<RouterStateUrl>
>('router');

export const selectRouter = createSelector(
    getRouterState,
    (state) => state?.state
);
export const selectQueryParams = createSelector(
    selectRouter,
    (state) => state?.queryParams
);
export const selectRouteParams = createSelector(
    selectRouter,
    (state) => state?.params
);
export const selectUrl = createSelector(
    selectRouter,
    (state) => state?.url
);
