import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomtypeComponent } from './edit-roomtype.component';

describe('EditRoomtypeComponent', () => {
  let component: EditRoomtypeComponent;
  let fixture: ComponentFixture<EditRoomtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRoomtypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRoomtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
