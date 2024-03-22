import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOneSeasonComponent } from './admin-one-season.component';

describe('AdminOneSeasonComponent', () => {
  let component: AdminOneSeasonComponent;
  let fixture: ComponentFixture<AdminOneSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOneSeasonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOneSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
