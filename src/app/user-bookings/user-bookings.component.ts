import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HotelServiceService } from '../hotel-service.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

// material ui
import {MatTableModule} from '@angular/material/table';
import { StorageService } from '../storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth-interceptor';

@Component({
    selector: 'app-user-bookings',
    standalone: true,
    templateUrl: './user-bookings.component.html',
    styleUrl: './user-bookings.component.scss',
    imports: [
        NavbarComponent,
        NgIf,
        NgFor,
        AsyncPipe,
        MatTableModule,
        FooterComponent,
        RouterModule
    ]
})
export class UserBookingsComponent implements OnInit{
  bookings$!: Observable<any>;
  userId = StorageService.getUserId();

  constructor(
    private activatedRoute: ActivatedRoute, 
    private hotelService: HotelServiceService,
  ){}


  ngOnInit(): void {
    // user id is 2 until authentication
    this.bookings$ = this.hotelService.getAllBookingsOfUser(this.userId);
    // this.bookings$ = this.activatedRoute.paramMap.pipe(
    //   switchMap((paramsMap) => {
    //     this.userId = paramsMap.get('userId');
    //     let bookings = this.hotelService.getAllBookingsOfUser(this.userId);
      
    //     return bookings;
    //   })
    // );
  }

}
