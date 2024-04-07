import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, Subject, map, startWith } from 'rxjs';
import { HotelServiceService } from '../hotel-service.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from "../navbar/navbar.component";

// Material Ui
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FooterComponent } from "../footer/footer.component";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        FormsModule,
        NgIf,
        NgFor,
        AsyncPipe,
        RouterModule,
        NavbarComponent,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        FooterComponent,
        MatCardModule,
        MatButtonModule
    ]
})
export class HomeComponent implements OnInit {

  @Output() searched: EventEmitter<any> = new EventEmitter<any> ();

  hotels$!: Observable<Array<any>>;
  searchResults$!: Observable<Array<any>>;

  isSearched: boolean = false;

  location: string = '';
  checkInDate: Date = new Date();
  checkOutDate: Date = new Date();
  noOfAdult: number = 0;
  noOfRooms: number = 0;

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
    private cookieService: CookieService,
    private hotelService: HotelServiceService
  ){}

  ngOnInit(): void {
    this.filteredLocations = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.hotels$ = this.hotelService.getAllHotel();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.locations.filter(location => location.toLowerCase().includes(filterValue));
  }

  search(){
    let search = {
      location: this.location,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      noOfAdult: this.noOfAdult,
      noOfRooms: this.noOfRooms
    }

    this.cookieService.deleteAll();
    
    this.cookieService.set('location', this.location, undefined, '/');
    this.cookieService.set('checkInDate', this.checkInDate.toString(), undefined, '/');
    this.cookieService.set('checkOutDate', this.checkOutDate.toString(), undefined, '/');
    this.cookieService.set('noOfAdult', this.noOfAdult.toString(), undefined, '/');
    this.cookieService.set('noOfRooms', this.noOfRooms.toString(), undefined, '/');

    console.log(this.cookieService.get('location'));
    console.log(this.cookieService.get('checkInDate'));
    console.log(this.cookieService.get('checkOutDate'));
    console.log(this.cookieService.get('noOfAdult'));
    console.log(this.cookieService.get('noOfRooms'));
    
    this.isSearched = true;
    this.searchResults$ = this.hotelService.searchHotelsSummary(search);
    this.searchResults$.subscribe((ress) => {
      ress.forEach(res => {
        console.log(res);
        
      })
    })
  }

  calculatePrice(basePrice: any, noOfRooms: any, noOfAdults: any, discount: any, markup: any, noOfNights: any){
    let price;
    if(discount > 0){
      price = basePrice * markup * noOfNights * noOfAdults;
    }else{
      price = basePrice * markup * noOfNights * noOfAdults;
    }
  }
  calculateNoOfNights(startDate: Date, endDate: Date): number {
    // Convert both dates to milliseconds
    const startMilliseconds = startDate.getTime();
    const endMilliseconds = endDate.getTime();

    // Calculate the difference in milliseconds
    const differenceMilliseconds = endMilliseconds - startMilliseconds;

    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
    const differenceDays = Math.ceil(differenceMilliseconds / (24 * 60 * 60 * 1000));

    return differenceDays;
}

}
