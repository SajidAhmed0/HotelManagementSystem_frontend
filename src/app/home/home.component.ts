import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelServiceService } from '../hotel-service.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    AsyncPipe,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  hotels$!: Observable<Array<any>>;

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
    this.cookieService.set('location', this.location);
    this.cookieService.set('checkInDate', this.checkInDate.toString());
    this.cookieService.set('checkOutDate', this.checkOutDate.toString());
    this.cookieService.set('noOfAdult', this.noOfAdult.toString());
    this.cookieService.set('noOfRooms', this.noOfRooms.toString());

    console.log(this.cookieService.get('location'));
    console.log(this.cookieService.get('checkInDate'));
    console.log(this.cookieService.get('checkOutDate'));
    console.log(this.cookieService.get('noOfAdult'));
    console.log(this.cookieService.get('noOfRooms'));
    
    this.hotels$ = this.hotelService.searchHotels(search);
  }

}
