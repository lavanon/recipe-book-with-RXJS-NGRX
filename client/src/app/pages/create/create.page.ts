import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { RecipesService } from 'src/app/services/recipes.service';
import { IngredientModel } from '../../../../../shared/models/ingredient.model';
import { RecipeModel } from '../../../../../shared/models/recipe.model';
import { MatDialog } from '@angular/material/dialog';
import { EditCoverImageModalComponent } from 'src/app/components/edit-cover-image-modal/edit-cover-image-modal.component';

enum CreateFormControlNames {
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
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss']
})
export class CreatePage implements OnInit {
  public form: FormGroup;
  public FORM_CONTROL_NAMES = CreateFormControlNames;
  public INGREDIENT_SUB_FORM_CONTROL_NAMES = IngredientSubFormControlNames;

  constructor(
    private fb: FormBuilder,
    private recipesService: RecipesService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  public recipe$ = this.recipesService.selected$;

  ngOnInit(): void {
    this.initializeForm()
  }

  public onClickAddIngredient() {
    const nextIngredientFormGroup = this.form.get(CreateFormControlNames.NextIngredient);
    const nextIngredient: IngredientModel = nextIngredientFormGroup.value;
    (this.form.get(CreateFormControlNames.Ingredients) as FormArray).push(this.fb.control(nextIngredient));
    nextIngredientFormGroup.reset();
  }

  public onClickAddStep() {
    const nextStepFormControl = this.form.get(CreateFormControlNames.NextStep);
    const nextStep: string = nextStepFormControl.value;
    (this.form.get(CreateFormControlNames.Steps) as FormArray).push(this.fb.control(nextStep));
    nextStepFormControl.reset();
  }

  public onClickAddAdditionalImage() {
    const nextAdditionalImageFormControl = this.form.get(CreateFormControlNames.NextAdditionalImageUrl);
    const nextAdditionalImageUrl = nextAdditionalImageFormControl.value;
    (this.form.get(CreateFormControlNames.AdditionalImages) as FormArray).push(this.fb.control(nextAdditionalImageUrl));
    nextAdditionalImageFormControl.reset();
  }

  public onClickCoverImage() {
    const coverImageUrl = this.form.get(CreateFormControlNames.CoverImage).value;
    const dialogRef = this.dialog.open(EditCoverImageModalComponent, { data: coverImageUrl });
    dialogRef.afterClosed().pipe(
      filter(shouldUpdateFormValue => !!shouldUpdateFormValue),
    ).subscribe((newCoverImageUrl: string) => {
      this.form.get(CreateFormControlNames.CoverImage).setValue(newCoverImageUrl);
    });
  }

  public onClickSave() {
    const nextRecipe: RecipeModel = {
      id: Date.now(),
      title: this.form.get(CreateFormControlNames.Title).value,
      description: this.form.get(CreateFormControlNames.Description).value,
      coverImageUrl: this.form.get(CreateFormControlNames.CoverImage).value,
      steps: this.form.get(CreateFormControlNames.Steps).value,
      ingredients: this.form.get(CreateFormControlNames.Ingredients).value,
      additionalImageUrls: this.form.get(CreateFormControlNames.AdditionalImages).value,
    };

    this.recipe$.pipe(
      take(1),
      switchMap(recipe => {
        return this.recipesService.getRecipeObservableForCreate(nextRecipe);
      }),
      tap(() => this.router.navigate([`./recipes/${nextRecipe.id}`]))
    ).subscribe();
    this.form.reset();
  }

  public get ingredientControls() {
    return console.warn(this.form.get(CreateFormControlNames.NextIngredient));
  }

  public get nextIngredientFormGroup() {
    return this.form.get(CreateFormControlNames.NextIngredient) as FormGroup;
  }

  public get ingredients() {
    return this.form.get(CreateFormControlNames.Ingredients).value;
  }

  public get steps() {
    return this.form.get(CreateFormControlNames.Steps).value;
  }

  public get additionalImageUrls() {
    return this.form.get(CreateFormControlNames.AdditionalImages).value;
  }

  public get displayedCoverImageUrl(): string {
    const coverImageUrl = this.form.get(CreateFormControlNames.CoverImage).value;
    return coverImageUrl || 'https://via.placeholder.com/400x300.png?text=Select+Cover+Image';
  }

  public onDeleteIngredient(index: number) {
    (this.form.get(CreateFormControlNames.Ingredients) as FormArray).removeAt(index);
  }

  public onDeleteStep(index: number) {
    (this.form.get(CreateFormControlNames.Steps) as FormArray).removeAt(index);
  }

  public onClickDeleteAdditionalImage(index: number) {
    (this.form.get(CreateFormControlNames.AdditionalImages) as FormArray).removeAt(index);
  }

  private initializeForm() {
    this.form = this.fb.group({
      [CreateFormControlNames.Title]: "",
      [CreateFormControlNames.Description]: "",
      [CreateFormControlNames.CoverImage]: "",
      [CreateFormControlNames.NextStep]: [undefined],
      [CreateFormControlNames.Steps]: this.fb.array([]),
      [CreateFormControlNames.NextIngredient]: this.fb.group({
        [IngredientSubFormControlNames.Name]: [undefined],
        [IngredientSubFormControlNames.Quantity]: [undefined],
        [IngredientSubFormControlNames.Units]: [undefined],
      }),
      [CreateFormControlNames.Ingredients]: this.fb.array([]),
      [CreateFormControlNames.NextAdditionalImageUrl]: [undefined],
      [CreateFormControlNames.AdditionalImages]: this.fb.array([]),
    });
  }

}
