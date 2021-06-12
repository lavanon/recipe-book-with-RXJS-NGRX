import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditPage } from './edit.page';

describe('EditPage', () => {
  let component: EditPage;
  let fixture: ComponentFixture<EditPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
