import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HotelServiceService } from '../hotel-service.service';
import { Observable, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent implements OnInit {
  id: string | null = '';
  hotel$!: Observable<any>;

  selectedRoomTypeId: string = '';
  isSupplements: boolean = false;

  search: {
    location: string,
    checkInDate: string,
    checkOutDate: string,
    noOfAdult: string,
    noOfRooms: string
  } = {
    location: '',
    checkInDate: '',
    checkOutDate: '',
    noOfAdult: '',
    noOfRooms: ''
  };

  constructor(
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute, 
    private hotelService: HotelServiceService
  ){}
  ngOnInit(): void {
    console.log(this.cookieService.get('location'));
    console.log(this.cookieService.get('checkInDate'));
    console.log(this.cookieService.get('checkOutDate'));
    console.log(this.cookieService.get('noOfAdult'));
    console.log(this.cookieService.get('noOfRooms'));
    
    this.search = {
      location: this.cookieService.get('location'),
      checkInDate: this.cookieService.get('checkInDate'),
      checkOutDate: this.cookieService.get('checkOutDate'),
      noOfAdult: this.cookieService.get('noOfAdult'),
      noOfRooms: this.cookieService.get('noOfRooms')
    }

    this.hotel$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramsMap) => {
        this.id = paramsMap.get('id');
        let hotel = this.hotelService.getHotelDetails(this.id, this.search);
        console.log(hotel);
        
        return hotel;
      })
    );
  }

  setSelectedRoomTypeId(id: string){
    this.selectedRoomTypeId = id;
  }

  showSupplements(){
    if(this.isSupplements){
      this.isSupplements = false;
    }else{
      this.isSupplements = true;
    }
  }
  
  
}
