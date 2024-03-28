import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelServiceService } from '../hotel-service.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from "../navbar/navbar.component";

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
        NavbarComponent
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

  constructor(
    private cookieService: CookieService,
    private hotelService: HotelServiceService
  ){}

  ngOnInit(): void {
    this.hotels$ = this.hotelService.getAllHotel();
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

}
