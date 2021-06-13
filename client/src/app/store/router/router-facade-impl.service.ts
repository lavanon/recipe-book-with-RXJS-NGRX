import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { filter } from "rxjs/operators";
import { RouterFacadeService } from "./router-facade.service";
import { RouterState } from "./router.reducer";
import {
    selectQueryParams,
    selectRouteParams,
    selectUrl
} from "./router.selector";

@Injectable()
export class RouterFacadeImpService implements RouterFacadeService {
    public queryParams$ = this.store.select(selectQueryParams).pipe(filter(queryParams => !!queryParams));;
    public params$ = this.store.select(selectRouteParams).pipe(filter(params => !!params));;
    public url$ = this.store.select(selectUrl).pipe(filter(url => !!url));

    constructor(private store: Store<RouterState>) {}
}
