import { Params } from '@angular/router';
import { Observable } from 'rxjs';

export abstract class RouterFacadeService {
    abstract queryParams$: Observable<Params | undefined>;
    abstract params$: Observable<Params | undefined>;
    abstract url$: Observable<string | undefined>;
}
