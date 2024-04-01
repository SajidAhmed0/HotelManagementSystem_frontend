import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSupplementComponent } from './edit-supplement.component';

describe('EditSupplementComponent', () => {
  let component: EditSupplementComponent;
  let fixture: ComponentFixture<EditSupplementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSupplementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSupplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
