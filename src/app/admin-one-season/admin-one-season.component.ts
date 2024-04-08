import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { HotelServiceService } from '../hotel-service.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

// material ui
import {MatListModule} from '@angular/material/list';

@Component({
    selector: 'app-admin-one-season',
    standalone: true,
    templateUrl: './admin-one-season.component.html',
    styleUrl: './admin-one-season.component.scss',
    imports: [
        FormsModule,
        NgIf,
        NgFor,
        AsyncPipe,
        RouterModule,
        NavbarComponent,
        FooterComponent,
        MatListModule
    ]
})
export class AdminOneSeasonComponent implements OnInit{
  hotelId: string | null = '';
  contractId: string | null = '';
  seasonId: string | null = '';
  season$!: Observable<any>;
  roomTypes$!: Observable<any>;
  roomType: any;

  supplements$!: Observable<any>;
  supplement: any;

  roomTypeUndefined = false;
  isRoomTypePricing: boolean = false;
  roomTypePrice: number = 1;
  roomTypeRooms: number = 1;

  supplementUndefined = false;
  isSupplementPricing: boolean = false;
  supplementPrice: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hotelService: HotelServiceService
  ){}
  ngOnInit(): void {
    this.season$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramsMap) => {
        this.hotelId = paramsMap.get('hotelId');
        this.contractId = paramsMap.get('contractId');
        this.seasonId = paramsMap.get('seasonId');
        let season = this.hotelService.getSeason(this.seasonId);
        this.roomTypes$ = this.hotelService.getUnPricedRoomTypes(this.hotelId, this.contractId, this.seasonId);
        this.supplements$ = this.hotelService.getUnPricedSupplements(this.hotelId, this.contractId, this.seasonId);
        
        
        return season;
      })
    );
  }

  async addRoomTypePricing(roomTypeId: any){
    console.log(roomTypeId);
    this.roomTypeUndefined = false;
    if(roomTypeId == undefined || this.roomTypePrice  < 1 || this.roomTypeRooms < 1){
      if(roomTypeId == undefined){
        this.roomTypeUndefined = true;
      }
      return;
    }else{
      let pricing = {
        price: this.roomTypePrice,
        noOfRooms: this.roomTypeRooms
      }
      this.roomTypePrice = 1;
      this.roomTypeRooms = 1;
  
      this.hotelService.addSeasonRoomTypePricing(this.contractId, this.seasonId, roomTypeId, pricing).subscribe((con) => {
        this.season$ = this.hotelService.getSeason(this.seasonId);
      });
    }
    
  }

  // checkPriced(roomTypeId: any): boolean{
  //   let check = true;
  //   this.season$.subscribe(sea => {
  //     for(let price of sea.seasonRoomTypePricings){
  //       console.log(price);
        
  //       if(price.id.roomTypeId == roomTypeId){
  //         check = false;
  //       }
  //     }
  //   })
  //   return check;
  // }

  showAddRoomTypePring(){
    this.roomTypeUndefined = false;
    if(this.isRoomTypePricing){
      this.isRoomTypePricing = false;
    }else{
      this.isRoomTypePricing = true;
    }
    
  }

  removeRoomTypePricing(){
    // remove room type pricing
  }

  async addSupplementPricing(supplementId: any){
    console.log(supplementId);
    this.supplementUndefined = false;
    if(supplementId == undefined || this.supplementPrice < 1){
      if(supplementId == undefined){
        this.supplementUndefined = true;
      }
      return;
    }else{
      let pricing = {
        price: this.supplementPrice
      }
      this.supplementPrice = 1;
  
      this.hotelService.addSeasonSupplementPricing(this.contractId, this.seasonId, supplementId, pricing).subscribe((con) => {
        this.season$ = this.hotelService.getSeason(this.seasonId);
      });
    }
    
    
  }

  showAddSupplementPring(){
    this.supplementUndefined = false;
    if(this.isSupplementPricing){
      this.isSupplementPricing = false;
    }else{
      this.isSupplementPricing = true;
    }
    
  }

  removeSupplementPricing(){
    // remove supplement pricing
  }
}
