import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith, switchMap } from 'rxjs';

// material ui
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelServiceService } from '../hotel-service.service';

@Component({
    selector: 'app-edit-hotel',
    standalone: true,
    templateUrl: './edit-hotel.component.html',
    styleUrl: './edit-hotel.component.scss',
    imports: [
      FooterComponent,
      NavbarComponent,
      FormsModule,
      ReactiveFormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatAutocompleteModule,
      AsyncPipe,
      NgIf
    ]
})
export class EditHotelComponent implements OnInit {
  hotel$!: Observable<any>;
  id: any;

  name: string = '';
  country: string = 'Sri Lanka';
  district: string = '';
  street: string = '';
  contact: string = '';
  description: string = '';

  // Location selection
  locations: string[] = [
    'Colombo',
    'Gampaha',
    'Kalutara',
    'Kandy',
    'Matale',
    'Nuwara Eliya',
    'Galle',
    'Matara',
    'Hambantota',
    'Jaffna',
    'Kilinochchi',
    'Mannar',
    'Mullaitivu',
    'Vavuniya',
    'Puttalam',
    'Kurunegala',
    'Anuradhapura',
    'Polonnaruwa',
    'Badulla',
    'Monaragala',
    'Ratnapura',
    'Kegalle',
    'Trincomalee',
    'Batticaloa',
    'Ampara'
  ];
  filteredLocations!: Observable<string[]>;
  myControl = new FormControl('');

  constructor(
    private activatedRoute: ActivatedRoute, 
    private hotelService: HotelServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.hotel$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramsMap) => {
        this.id = paramsMap.get('id');
        let hotel = this.hotelService.getHotel(this.id);
        
        return hotel;
      })
    );
    this.hotel$.subscribe(h => {
      this.name = h.name;
      this.country = h.country;
      this.district = h.district;
      this.street = h.street;
      this.contact = h.contact;
      
      this.description = h.description;
    });
    this.filteredLocations = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.locations.filter(location => location.toLowerCase().includes(filterValue));
  }

  cancel(){
    this.router.navigate([`/adminOneHotel/${this.id}`]);
  }

  async editHotel(){
    const hotel = {
      name: this.name,
      country: this.country,
      district: this.district,
      street: this.street,
      contact: this.contact,
      description: this.description
    };

    let h = await this.hotelService.updateHotel(this.id, hotel).toPromise();
    this.router.navigate([`/adminOneHotel/${h.id}`]);
  }
}
