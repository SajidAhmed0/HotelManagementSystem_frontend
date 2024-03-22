import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { HotelServiceService } from '../hotel-service.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-one-season',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './admin-one-season.component.html',
  styleUrl: './admin-one-season.component.scss'
})
export class AdminOneSeasonComponent implements OnInit{
  hotelId: string | null = '';
  contractId: string | null = '';
  seasonId: string | null = '';
  season$!: Observable<any>;
  roomTypes$!: Observable<any>;
  roomType: any;

  isRoomTypePricing: boolean = false;
  roomTypePrice: number = 0;
  roomTypeRooms: number = 0;

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
        this.roomTypes$ = this.hotelService.getAllRoomTypesOfHotel(this.hotelId);
        // this.supplements$ = this.hotelService.getAllSupplementsOfHotel(this.hotelId);
        
        
        return season;
      })
    );
  }

  async addRoomTypePricing(roomTypeId: any){
    console.log(roomTypeId);
    
    let pricing = {
      price: this.roomTypePrice,
      noOfRooms: this.roomTypeRooms
    }
    this.roomTypePrice = 0;
    this.roomTypeRooms = 0;

    this.hotelService.addSeasonRoomTypePricing(this.contractId, this.seasonId, roomTypeId, pricing).subscribe((con) => {
      this.roomTypes$.pipe(
        map(roomTypes => {
          return roomTypes.filter((roomType: { id: any; }) => this.checkPriced(roomType.id));
        })
      );
      this.season$ = this.hotelService.getSeason(this.seasonId);
    });
    
  }

  checkPriced(roomTypeId: any): boolean{
    let check = true;
    this.season$.subscribe(sea => {
      for(let price of sea.seasonRoomTypePricings){
        console.log(price);
        
        if(price.id.roomTypeId == roomTypeId){
          check = false;
        }
      }
    })
    return check;
  }

  showAddRoomTypePring(){
    if(this.isRoomTypePricing){
      this.isRoomTypePricing = false;
    }else{
      this.isRoomTypePricing = true;
    }
    
  }

  removeRoomTypePricing(){
    // remove room type pricing
  }
}
