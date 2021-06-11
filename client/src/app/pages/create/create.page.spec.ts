import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePage } from './create.page';

describe('EditPage', () => {
  let component: CreatePage;
  let fixture: ComponentFixture<CreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
