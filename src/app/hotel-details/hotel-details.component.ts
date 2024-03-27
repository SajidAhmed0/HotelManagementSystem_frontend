import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HotelServiceService } from '../hotel-service.service';
import { Observable, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../data.service';

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
        RouterModule
    ]
})
export class HotelDetailsComponent implements OnInit {

  @Output() selected: EventEmitter<any> = new EventEmitter<any> ();

  id: string | null = '';
  hotel$!: Observable<any>;

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
  }

  showSupplements(){
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
}
