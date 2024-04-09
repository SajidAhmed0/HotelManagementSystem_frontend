import { Component, OnInit } from '@angular/core';
import { HotelDetailsComponent } from "../hotel-details/hotel-details.component";
import { DataService } from '../data.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HotelServiceService } from '../hotel-service.service';
import { NavbarComponent } from "../navbar/navbar.component";

// material ui
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
import { FooterComponent } from "../footer/footer.component";
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        AsyncPipe,
        NavbarComponent,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatGridListModule,
        FooterComponent,
        MatDividerModule,
        MatListModule
    ]
})
export class BookingComponent implements OnInit {
  selectedValue$!: Observable<any>;
  total: any;

  userId = StorageService.getUserId();

  needPassenger = false;
  passengers: any[] = [];
  passengerName: string = '';
  passengerPhone: string = '';
  passengerAdd = false;

  paymentAdd = false;
  paymentMethod: string = '';
  cardNumber: string = '';
  expiration: string = '';
  cvv: number = 0;
  billingAddress: string = '';
  billingCity: string = '';
  zipcode: string = '';

  constructor(
    private dataService: DataService,
    private hotelService: HotelServiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    // this.dataService.data$.subscribe(data => {
    //   this.selectedValue$ = data;
    //   this.selectedValue$.subscribe(console.log);
      
    // });
    this.selectedValue$ = this.dataService.data$;
    this.selectedValue$.subscribe(sv => this.total = sv.total);
  }

  addPassenger(){
    this.passengerAdd = true;
    if(this.passengerName == '' || this.passengerPhone == ''){
      return
    }else{
      let passenger = {
        name: this.passengerName,
        phone: this.passengerPhone
      }
      this.passengerName = '';
      this.passengerPhone = '';
  
      this.passengers.push(passenger);
    }
    this.passengerAdd = false;
  }

  removePassenger(i: any){
    this.passengers.splice(i, 1);
  }

  async addBookig(roomType:any, supplements: any[], discount: any, search: any, markup: any, hotel: any){
    this.needPassenger = false;
    if(this.passengers.length < search.noOfAdult){
      console.log('error');
      
      this.needPassenger = true;
      return;
    }
    if(this.paymentMethod == '' || this.cardNumber == '' || this.expiration == '' || this.cvv <= 0 || this.billingAddress == '' || this.billingCity == '' || this.zipcode == ''){
      this.paymentAdd = true;
      console.log('payment error');
      return;
    }

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
      total: this.total,
      bookingDate: new Date(),
      markup: markup,
      hotelName: hotel.name,
      hotelId: hotel.id
    }

    let payment = {
      date: new Date(),
      amount: this.total,
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
      let user = await this.hotelService.addBookingToUser(this.userId, bkg.id).toPromise();

      let pay = await this.hotelService.addPayment(payment).toPromise();

      user = await this.hotelService.addPaymentToUser(this.userId, pay.id).toPromise();

      this._snackBar.open("Booking Added", "Close", {duration: 3000});

      this.router.navigate([`/user/${this.userId}/bookings`]);
    } catch (error) {
      console.error('Error:', error);
    }
    
    
    

  }

  calculatePriceWithDiscount(basePrice: any, noOfRooms: any, noOfAdults: any, discount: any, markup: any, noOfNights: any){
    let price = (basePrice * noOfRooms);
    if(discount != null){
      price = price * ((100 - discount.percentage) / 100);
    }
    
    price =  price *  ((markup + 100) / 100) * noOfNights * noOfAdults;

    return price.toFixed(2);
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
