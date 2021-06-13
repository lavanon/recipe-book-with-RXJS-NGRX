import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";

import { routerReducer } from "@ngrx/router-store";
import { RouterFacadeService } from "./router-facade.service";
import { RouterFacadeImpService } from "./router-facade-impl.service";

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature("router", routerReducer)
    ],
    providers: [
        {
            provide: RouterFacadeService,
            useClass: RouterFacadeImpService
        }
    ]
})
export class RouterStoreModule {}
