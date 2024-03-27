import { Component, OnInit } from '@angular/core';
import { HotelDetailsComponent } from "../hotel-details/hotel-details.component";
import { DataService } from '../data.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HotelServiceService } from '../hotel-service.service';

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
    private dataService: DataService,
    private hotelService: HotelServiceService
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

  async addBookig(roomType:any, supplements: any[], discount: any, search: any, markup: any, hotel: any){
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
        daysPriorToArrival: discount.daysPriorToArrival,
        originalId: discount.id
      }
    }

    let booking = {
      checkInDate: search.checkInDate,
      checkOutDate: search.checkOutDate,
      noOfAdult: parseInt(search.noOfAdult),
      status: 'Booked',
      noOfRooms: parseInt(search.noOfRooms),
      total: 0,
      bookingDate: new Date(),
      markup: markup,
      hotelName: hotel.name,
      hotelId: hotel.id
    }

    let payment = {
      date: new Date(),
      amount: 0,
      method: this.paymentMethod,
      cardNumber: this.cardNumber,
      expiration: this.expiration,
      cvv: this.cvv,
      streetAddress: this. billingAddress,
      city: this.billingCity,
      zipCode: this.zipcode
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
    
    try {
      let response = await this.hotelService.addBooking(booking).toPromise();
      let bkg = response;

      bkg = await this.hotelService.addBookingToRoomType(bookedRoomType.originalId, bkg.id).toPromise();

      let bktRoomType = await this.hotelService.addBookedRoomType(bookedRoomType).toPromise();
      bkg = await this.hotelService.addBookedRoomTypeToBooking(response.id, bktRoomType.id).toPromise();

      if (bookedDiscount != null) {
        let bktDiscount = await this.hotelService.addBookedDiscount(bookedDiscount).toPromise();
        bkg = await this.hotelService.addBookedDiscountToBooking(response.id, bktDiscount.id).toPromise();
      }
  
      if (bookedSupplements.length > 0) {
        await Promise.all(bookedSupplements.map(async (bs) => {
          let bktSupplement = await this.hotelService.addBookedSupplement(bs).toPromise();
          let bb = await this.hotelService.addBookedSupplementToBooking(response.id, bktSupplement.id).toPromise();
          bkg = bb;
        }));
      }
  
      if (this.passengers.length > 0) {
        await Promise.all(this.passengers.map(async (ps) => {
          let pas = await this.hotelService.addPassenger(ps).toPromise();
          let bb = await this.hotelService.addPassengeToBooking(response.id, pas.id).toPromise();
          bkg = bb;
        }));
      }
  
      console.log(bkg); // This will log the final response after all operations are completed

      //user id = 2 need to change with logged in user id
      let user = await this.hotelService.addBookingToUser(2, bkg.id).toPromise();

      let pay = await this.hotelService.addPayment(payment).toPromise();

      user = await this.hotelService.addPaymentToUser(2, pay.id).toPromise();

      // this.router.navigate([`/adminOneHotel/${htl.id}`]);
    } catch (error) {
      console.error('Error:', error);
    }
    
    
    

  }

}
