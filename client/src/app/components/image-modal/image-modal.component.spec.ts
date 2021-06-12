import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImageModalComponent } from './image-modal.component';

describe('EditCoverImageModalComponent', () => {
  let component: ImageModalComponent;
  let fixture: ComponentFixture<ImageModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
