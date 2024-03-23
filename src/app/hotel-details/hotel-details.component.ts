import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent implements OnInit {
  constructor(
    private cookieService: CookieService
  ){}
  ngOnInit(): void {
    console.log(this.cookieService.get('location'));
    console.log(this.cookieService.get('checkInDate'));
    console.log(this.cookieService.get('checkOutDate'));
    console.log(this.cookieService.get('noOfAdult'));
    console.log(this.cookieService.get('noOfRooms'));
  }
  
}
