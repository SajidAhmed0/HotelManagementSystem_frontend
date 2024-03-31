import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { HotelServiceService } from '../hotel-service.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

// material ui
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';

@Component({
    selector: 'app-booking-details',
    standalone: true,
    templateUrl: './booking-details.component.html',
    styleUrl: './booking-details.component.scss',
    imports: [
        NgIf,
        NgFor,
        AsyncPipe,
        NavbarComponent,
        FooterComponent,
        MatTableModule,
        MatListModule
    ]
})
export class BookingDetailsComponent implements OnInit {
  booking$!: Observable<any>;
  bookingId: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private hotelService: HotelServiceService,
  ){}

  ngOnInit(): void {
    this.booking$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramsMap) => {
        this.bookingId = paramsMap.get('bookingId');
        let booking = this.hotelService.getBooking(this.bookingId);
        console.log(booking);
        
        return booking;
      })
    );
  }

}
