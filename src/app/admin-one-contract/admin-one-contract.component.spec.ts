import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOneContractComponent } from './admin-one-contract.component';

describe('AdminOneContractComponent', () => {
  let component: AdminOneContractComponent;
  let fixture: ComponentFixture<AdminOneContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOneContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOneContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
