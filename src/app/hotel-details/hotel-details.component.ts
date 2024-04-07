import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HotelServiceService } from '../hotel-service.service';
import { Observable, switchMap } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../data.service';
import { NavbarComponent } from "../navbar/navbar.component";

// Material Ui
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
import { FooterComponent } from "../footer/footer.component";
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-hotel-details',
    standalone: true,
    templateUrl: './hotel-details.component.html',
    styleUrl: './hotel-details.component.scss',
    imports: [
        FormsModule,
        NgIf,
        NgFor,
        AsyncPipe,
        HomeComponent,
        RouterModule,
        NavbarComponent,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatGridListModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        FooterComponent
    ]
})
export class HotelDetailsComponent implements OnInit {

  @Output() selected: EventEmitter<any> = new EventEmitter<any> ();

  id: string | null = '';
  hotel$!: Observable<any>;

  detailedHotel: any;

  total: any = 0;

  sendHotel: any = {};

  selectedRoomType: {
    roomType: any,
    pricing: any,
    avialableRooms: any
  } = {
    roomType : {id: ''},
    pricing: {},
    avialableRooms: ''
  };
  isSupplements: boolean = false;

  selectedDiscount: any = {};
  markup: any = 0;

  selectedSupplements: any[] = [];

  search: {
    location: string,
    checkInDate: any,
    checkOutDate: any,
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
    private hotelService: HotelServiceService,
    private router: Router,
    private dataService: DataService
  ){}
  ngOnInit(): void {
    console.log(this.cookieService.get('location'));
    console.log(this.cookieService.get('checkInDate'));
    console.log(this.cookieService.get('checkOutDate'));
    console.log(this.cookieService.get('noOfAdult'));
    console.log(this.cookieService.get('noOfRooms'));
    
    this.search = {
      location: this.cookieService.get('location'),
      checkInDate: new Date(this.cookieService.get('checkInDate')),
      checkOutDate: new Date(this.cookieService.get('checkOutDate')),
      noOfAdult: this.cookieService.get('noOfAdult'),
      noOfRooms: this.cookieService.get('noOfRooms')
    }

    this.hotel$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramsMap) => {
        this.id = paramsMap.get('id');
        let hotel = this.hotelService.getHotelDetails(this.id, this.search);
        console.log(hotel);
        hotel.subscribe(h => {
          this.sendHotel = h.hotel;
          this.selectedDiscount = h.discount;
          this.markup = h.markup;
        });
        
        return hotel;
      })
    );
  }

  setSelectedRoomType(roomtype: any){
    console.log(roomtype);
    
    if(roomtype.roomType.id != this.selectedRoomType.roomType.id){
      this.selectedSupplements = [];
    }

    this.selectedRoomType = roomtype;

    this.total = this.calculatePriceWithDiscountAndSupplements(roomtype.pricing.price, this.search.noOfRooms, this.search.noOfAdult, this.selectedDiscount,this.markup, this.calculateNoOfNights(this.search.checkInDate, this.search.checkOutDate), this.selectedSupplements);
  }

  showSupplements(){
    this.selectedSupplements = [];
    if(this.isSupplements){
      this.isSupplements = false;
    }else{
      this.isSupplements = true;
    }
  }

  selectSupplement(en: any, supp: any){
    if(en.target.checked){
      this.selectedSupplements.push(supp);
    }else{
      this.selectedSupplements = this.selectedSupplements.filter(sup => sup !== supp);
    }
    this.total = this.calculatePriceWithDiscountAndSupplements(this.selectedRoomType.pricing.price, this.search.noOfRooms, this.search.noOfAdult, this.selectedDiscount,this.markup, this.calculateNoOfNights(this.search.checkInDate, this.search.checkOutDate), this.selectedSupplements);
    console.log(this.selectedSupplements);
    
  }
  
  whenClickReserve(){
    this.dataService.sendData({
      selectedRoomtype: this.selectedRoomType,
      selectedSupplements: this.selectedSupplements,
      selectedDiscount: this.selectedDiscount,
      search: this.search,
      markup: this.markup,
      hotel: this.sendHotel
    });
    
    this.router.navigate(["booking"]);
  }

  calculatePrice(basePrice: any, noOfRooms: any, noOfAdults: any, markup: any, noOfNights: any){
    let price = (basePrice * noOfRooms);
    
    price =  price *  ((markup + 100) / 100) * noOfNights * noOfAdults;
    return price.toFixed(2);
  }
  calculatePriceWithDiscount(basePrice: any, noOfRooms: any, noOfAdults: any, discount: any, markup: any, noOfNights: any){
    let price = (basePrice * noOfRooms);
    if(discount != null){
      price = price * ((100 - discount.percentage) / 100);
    }
    
    price =  price *  ((markup + 100) / 100) * noOfNights * noOfAdults;

    return price.toFixed(2);
  }

  calculatePriceWithDiscountAndSupplements(basePrice: any, noOfRooms: any, noOfAdults: any, discount: any, markup: any, noOfNights: any, supplements: any[]){
    let price = (basePrice * noOfRooms);
    if(supplements.length > 0){
      supplements.forEach(sup => {
        price += sup.pricing.price;
      });
    }
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
