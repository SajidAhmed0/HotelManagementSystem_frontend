import { Component, OnInit } from '@angular/core';
import { HotelDetailsComponent } from "../hotel-details/hotel-details.component";
import { DataService } from '../data.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-booking',
    standalone: true,
    templateUrl: './booking.component.html',
    styleUrl: './booking.component.scss',
    imports: [
      HotelDetailsComponent,
      NgIf,
      NgFor,
      FormsModule,
      AsyncPipe
    ]
})
export class BookingComponent implements OnInit {
  selectedValue$!: Observable<any>;

  passengers: any[] = [];
  passengerName: string = '';
  passengerPhone: string = '';

  paymentMethod!: string;
  cardNumber: string = '';
  expiration: string = '';
  cvv: number = 0;
  billingAddress: string = '';
  billingCity: string = '';
  zipcode: string = '';

  constructor(
    private dataService: DataService
  ){}

  ngOnInit(): void {
    // this.dataService.data$.subscribe(data => {
    //   this.selectedValue$ = data;
    //   this.selectedValue$.subscribe(console.log);
      
    // });
    this.selectedValue$ = this.dataService.data$;
    this.selectedValue$.subscribe(console.log);
  }

  addPassenger(){
    let passenger = {
      name: this.passengerName,
      phone: this.passengerPhone
    }
    this.passengerName = '';
    this.passengerPhone = '';

    this.passengers.push(passenger);
  }

  removePassenger(i: any){
    this.passengers.splice(i, 1);
  }

  addBookig(roomType:any, supplements: any[], discount: any, search: any, markup: any, hotel: any){
    let bookedRoomType = {
      name: roomType.roomType.name,
      noOfRooms: roomType.pricing.noOfRooms,
      maxAdult: roomType.roomType.maxAdult,
      description: roomType.roomType.description,
      price: roomType.pricing.price,
      originalId: roomType.roomType.id
    }

    let bookedSupplements = supplements.map((supplement) => {
      return {
        name: supplement.supplement.name,
        description: supplement.supplement.description,
        price: supplement.pricing.price,
        originalId: supplement.supplement.id
      }
    });

    let bookedDiscount = null;

    if(discount != null){
      bookedDiscount = {
        name: discount.name,
        description: discount.description,
        percentage: discount.percentage,
        originalId: discount.id
      }
    }

    let booking = {
      checkInDate: search.checkInDate,
      checkOutDate: search.checkOutDate,
      noOfAdult: parseInt(search.noOfAdult),
      Status: 'Booked',
      noOfRooms: parseInt(search.noOfRooms),
      total: '',
      bookingDate: new Date(),
      markup: markup,
      hotelName: hotel.name,
      hotelId: hotel.id
    }

    let payment = {
      paymentMethod: this.paymentMethod,
      cardNumber: this.cardNumber,
      expiration: this.expiration,
      cvv: this.cvv,
      billingAddress: this. billingAddress,
      billingCity: this.billingCity,
      zipcode: this.zipcode
    }
    console.log("booked roomtype: ");
    console.log(bookedRoomType);
    console.log("booked supplements: " );
    console.log(bookedSupplements);
    console.log("booked Discount: " );
    console.log(bookedDiscount);
    console.log("booking: " );
    console.log(booking);
    console.log("payment: " );
    console.log(payment);
    console.log("passengers: " );
    console.log(this.passengers);
    
    
    
    

  }

}
