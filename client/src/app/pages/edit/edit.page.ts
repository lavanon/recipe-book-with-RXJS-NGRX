import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { RecipesService } from 'src/app/services/recipes.service';
import { IngredientModel } from '../../../../../shared/models/ingredient.model';
import { RecipeModel } from '../../../../../shared/models/recipe.model';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditCoverImageModalComponent } from 'src/app/components/edit-cover-image-modal/edit-cover-image-modal.component';
import { RecipeFacadeService } from 'src/app/store/recipe/recipe-facade.service';

enum EditFormControlNames {
  Title = 'title',
  Description = 'description',
  CoverImage = 'coverImage',
  Steps = 'steps',
  NextStep = 'nextStep',
  Ingredients = 'ingredients',
  NextIngredient = 'nextIngredient',
  AdditionalImages = 'additionalImages',
  NextAdditionalImageUrl = 'nextAdditionalImageUrl',
}

enum IngredientSubFormControlNames {
  Name = 'name',
  Quantity = 'quantity',
  Units = 'units',
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss']
})
export class EditPage implements OnInit, OnDestroy {

  private readonly _unsubscribe = new Subject();

  public form: FormGroup;
  public FORM_CONTROL_NAMES = EditFormControlNames;
  public INGREDIENT_SUB_FORM_CONTROL_NAMES = IngredientSubFormControlNames;

  constructor(
    private fb: FormBuilder,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private _recipeFacadeService: RecipeFacadeService,
  ) { }


  public recipe$ = this.recipesService.selected$;

  ngOnInit(): void {
    this.setUpDataSub();
    this.initializeForm();

    this.id$.pipe(
      tap(recipeId => this.recipesService.getOneRecipe(recipeId)),
      takeUntil(this._unsubscribe)
    ).subscribe();
  }

  ngOnDestroy() {
    this.form.reset();
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }

  public onClickAddIngredient() {
    const nextIngredientFormGroup = this.form.get(EditFormControlNames.NextIngredient);
    const nextIngredient: IngredientModel = nextIngredientFormGroup.value;
    (this.form.get(EditFormControlNames.Ingredients) as FormArray).push(this.fb.control(nextIngredient));
    nextIngredientFormGroup.reset();
  }

  public onClickAddStep() {
    const nextStepFormControl = this.form.get(EditFormControlNames.NextStep);
    const nextStep: string = nextStepFormControl.value;
    (this.form.get(EditFormControlNames.Steps) as FormArray).push(this.fb.control(nextStep));
    nextStepFormControl.reset();
  }

  public onClickAddAdditionalImage() {
    const nextAdditionalImageFormControl = this.form.get(EditFormControlNames.NextAdditionalImageUrl);
    const nextAdditionalImageUrl = nextAdditionalImageFormControl.value;
    (this.form.get(EditFormControlNames.AdditionalImages) as FormArray).push(this.fb.control(nextAdditionalImageUrl));
    nextAdditionalImageFormControl.reset();
  }

  public onClickCoverImage() {
    const coverImageUrl = this.form.get(EditFormControlNames.CoverImage).value;
    const dialogRef = this.dialog.open(EditCoverImageModalComponent, { data: coverImageUrl });
    dialogRef.afterClosed().pipe(
      filter(shouldUpdateFormValue => !!shouldUpdateFormValue),
      takeUntil(this._unsubscribe)
    ).subscribe((newCoverImageUrl: string) => {
      this.form.get(EditFormControlNames.CoverImage).setValue(newCoverImageUrl);
    });
  }

  public onClickSave(id: number ) {
    const nextRecipe: Partial<RecipeModel> = {
      id: id,
      title: this.form.get(EditFormControlNames.Title).value,
      description: this.form.get(EditFormControlNames.Description).value,
      coverImageUrl: this.form.get(EditFormControlNames.CoverImage).value,
      steps: this.form.get(EditFormControlNames.Steps).value,
      ingredients: this.form.get(EditFormControlNames.Ingredients).value,
      additionalImageUrls: this.form.get(EditFormControlNames.AdditionalImages).value,
    };

    this._recipeFacadeService.updateRecipe(nextRecipe)

    // this.recipe$.pipe(
    //   take(1),
    //   switchMap(recipe => {
    //     return this.recipesService.getRecipeObservableForUpdating(recipe.id, nextRecipe)
    //   }),
    //   tap(() => this.router.navigate(['../'], { relativeTo: this.route })),
    //   takeUntil(this._unsubscribe)
    // ).subscribe();
  }

  public get ingredientControls() {
    return console.warn(this.form.get(EditFormControlNames.NextIngredient));
  }

  public get nextIngredientFormGroup() {
    return this.form.get(EditFormControlNames.NextIngredient) as FormGroup;
  }

  public get ingredients() {
    return this.form.get(EditFormControlNames.Ingredients).value;
  }

  public get steps() {
    return this.form.get(EditFormControlNames.Steps).value;
  }

  public get additionalImageUrls() {
    return this.form.get(EditFormControlNames.AdditionalImages).value;
  }

  public get displayedCoverImageUrl(): string {
    const coverImageUrl = this.form.get(EditFormControlNames.CoverImage).value;
    return coverImageUrl || 'https://via.placeholder.com/400x300.png';
  }

  public onDeleteIngredient(index: number) {
    (this.form.get(EditFormControlNames.Ingredients) as FormArray).removeAt(index);
  }

  public onDeleteStep(index: number) {
    (this.form.get(EditFormControlNames.Steps) as FormArray).removeAt(index);
  }

  public onClickDeleteAdditionalImage(index: number) {
    (this.form.get(EditFormControlNames.AdditionalImages) as FormArray).removeAt(index);
  }

  private setUpDataSub() {
    this.id$.pipe(
      tap(recipeId => this.recipesService.getOneRecipe(recipeId)),
      takeUntil(this._unsubscribe)
    ).subscribe();
  }

  private initializeForm() {
    this.recipe$.pipe(
      filter(recipe => !!recipe),
      tap(recipe => {
        this.form = this.fb.group({
          [EditFormControlNames.Title]: [recipe?.title] ,
          [EditFormControlNames.Description]: [recipe?.description] ,
          [EditFormControlNames.CoverImage]: [recipe.coverImageUrl] ,
          [EditFormControlNames.NextStep]: [undefined],
          [EditFormControlNames.Steps]: this.fb.array([...recipe?.steps] ),
          [EditFormControlNames.NextIngredient]: this.fb.group({
            [IngredientSubFormControlNames.Name]: [undefined],
            [IngredientSubFormControlNames.Quantity]: [undefined],
            [IngredientSubFormControlNames.Units]: [undefined],
          }),
          [EditFormControlNames.Ingredients]: this.fb.array([...recipe?.ingredients]),
          [EditFormControlNames.NextAdditionalImageUrl]: [undefined],
          [EditFormControlNames.AdditionalImages]: this.fb.array([...recipe?.additionalImageUrls]),
        });
      }),
      takeUntil(this._unsubscribe)
    ).subscribe();
  }

  private get id$() {
    return this.route.paramMap.pipe(
      map(params => params.get('id')),
      takeUntil(this._unsubscribe)
    );
  }
}
