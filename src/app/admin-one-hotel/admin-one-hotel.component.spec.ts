import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOneHotelComponent } from './admin-one-hotel.component';

describe('AdminOneHotelComponent', () => {
  let component: AdminOneHotelComponent;
  let fixture: ComponentFixture<AdminOneHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOneHotelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOneHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
