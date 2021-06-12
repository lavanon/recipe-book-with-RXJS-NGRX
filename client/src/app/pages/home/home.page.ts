import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { RecipeFacadeService } from 'src/app/store/recipe/recipe-facade.service';
import { RecipeModel } from '../../../../../shared/models/recipe.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy  {

  public recipes$: Observable<RecipeModel[]>;
  private _unsubscribe = new Subject();
  constructor(
    private recipeFacadeService: RecipeFacadeService
  ) { }

  ngOnInit(): void {

    this.recipes$ =
      this.recipeFacadeService.recipes$.pipe(
        filter(recipes => !!recipes),
        tap(data => console.log(data)),
        takeUntil(this._unsubscribe)
      )

    this.recipeFacadeService.getRecipes();
  }

  ngOnDestroy() {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }


}
