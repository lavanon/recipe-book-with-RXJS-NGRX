
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { RecipesService } from 'src/app/services/recipes.service';
import { IngredientModel } from '../../../../../shared/models/ingredient.model';
import { RecipeModel } from '../../../../../shared/models/recipe.model';
import { Observable, Subject } from 'rxjs';
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

  public recipe$: Observable<RecipeModel>;

  public form: FormGroup;
  public FORM_CONTROL_NAMES = EditFormControlNames;
  public INGREDIENT_SUB_FORM_CONTROL_NAMES = IngredientSubFormControlNames;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _recipeFacadeService: RecipeFacadeService,
  ) {
    this._recipeFacadeService.getOneRecipe();
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      [EditFormControlNames.Title]: '',
      [EditFormControlNames.Description]: '' ,
      [EditFormControlNames.CoverImage]: '' ,
      [EditFormControlNames.NextStep]: [undefined],
      [EditFormControlNames.Steps]: this.fb.array([]),
      [EditFormControlNames.NextIngredient]: this.fb.group({
        [IngredientSubFormControlNames.Name]: [undefined],
        [IngredientSubFormControlNames.Quantity]: [undefined],
        [IngredientSubFormControlNames.Units]: [undefined],
      }),
      [EditFormControlNames.Ingredients]: this.fb.array([]),
      [EditFormControlNames.NextAdditionalImageUrl]: [undefined],
      [EditFormControlNames.AdditionalImages]: this.fb.array([]),
    });

    this.recipe$ = this._recipeFacadeService.recipe$;
    this.initializeForm();

  }

  ngOnDestroy() {
    this.form.reset();
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
    ).subscribe((newCoverImageUrl: string) => {
      this.form.get(EditFormControlNames.CoverImage).setValue(newCoverImageUrl);
    });
  }

  public onClickSave(id: number ) {
    const nextRecipe: Partial<RecipeModel> = {
      id,
      title: this.form.get(EditFormControlNames.Title).value,
      description: this.form.get(EditFormControlNames.Description).value,
      coverImageUrl: this.form.get(EditFormControlNames.CoverImage).value,
      steps: this.form.get(EditFormControlNames.Steps).value,
      ingredients: this.form.get(EditFormControlNames.Ingredients).value,
      additionalImageUrls: this.form.get(EditFormControlNames.AdditionalImages).value,
    };

    this._recipeFacadeService.updateRecipe(nextRecipe);
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
    ).subscribe();
  }
}
