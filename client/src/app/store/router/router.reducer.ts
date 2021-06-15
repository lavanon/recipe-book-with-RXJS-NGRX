import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';
import { routerReducer, RouterReducerState, getSelectors } from '@ngrx/router-store';
import { RouterStateUrl } from './router.serializer';

export interface RouterState {
    router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<RouterState> = {
    router: routerReducer
};
