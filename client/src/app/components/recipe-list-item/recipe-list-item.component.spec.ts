import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipeListItemComponent } from './recipe-list-item.component';

describe('RecipeListItemComponent', () => {
  let component: RecipeListItemComponent;
  let fixture: ComponentFixture<RecipeListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
