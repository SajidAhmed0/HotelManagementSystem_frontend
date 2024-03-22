import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { HotelServiceService } from '../hotel-service.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-one-contract',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    AsyncPipe,
    RouterModule
  ],
  templateUrl: './admin-one-contract.component.html',
  styleUrl: './admin-one-contract.component.scss'
})
export class AdminOneContractComponent implements OnInit {
  hotelId: string | null = '';
  contractId: string | null = '';
  contract$!: Observable<any>;
  roomTypes$!: Observable<Array<any>>;
  supplements$!: Observable<Array<any>>;

  roomTypesToPricing: Array<any> = [];
  // roomTypePricings: Array<Array<{
  //   price: number,
  //   noOfRooms: number
  // }>> = new Array(20);
  roomTypePricings: boolean[][] = [[false]];

  

  isSeason: boolean = false;
  seasonName: string = '';
  seasonStartDate: Date = new Date();
  seasonEndDate: Date = new Date();
  seasonMarkup: number = 0;

  isDiscount: boolean = false;
  discountName: string = '';
  discountDescription: string = '';
  discountPercentage: number = 0;

  isRoomTypePricing: boolean = false;
  roomTypesWithoutPrice: Array<any> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private hotelService: HotelServiceService
  ){
    this.roomTypePricings.fill([false]);
  }

  ngOnInit(): void {
    this.contract$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramsMap) => {
        this.hotelId = paramsMap.get('hotelId');
        this.contractId = paramsMap.get('contractId');
        let contract = this.hotelService.getContract(this.contractId);
        this.roomTypes$ = this.hotelService.getAllRoomTypesOfHotel(this.hotelId);
        this.supplements$ = this.hotelService.getAllSupplementsOfHotel(this.hotelId);
        console.log(contract);
        
        return contract;
      })
    );
  }


  // Season
  async addSeason(){
    let season = {
      name: this.seasonName,
      startDate: this.seasonStartDate,
      endDate: this.seasonEndDate,
      markup: this.seasonMarkup
    };
    this.seasonName = '';
    this.seasonStartDate = new Date();
    this.seasonEndDate = new Date();
    this.seasonMarkup = 0;

    let sea = await this.hotelService.addSeason(season).toPromise();
    this.contract$ = await this.hotelService.addSeasonToContract(this.contractId, sea.id);
  }

  showAddSeason(){
    if(this.isSeason){
      this.isSeason = false;
    }else{
      this.isSeason = true;
    }
    
  }

  removeSeason(i: any){
    // remove season
  }

  //Discount
  async addDiscount(){
    let discount = {
      name: this.discountName,
      description: this.discountDescription,
      percentage: this.discountPercentage
    };
    this.discountName = '';
    this.discountDescription = '';
    this.discountPercentage = 0;

    let dis = await this.hotelService.addDiscount(discount).toPromise();
    this.contract$ = await this.hotelService.addDiscountToContract(this.contractId, dis.id);
  }

  showAddDiscount(){
    if(this.isDiscount){
      this.isDiscount = false;
    }else{
      this.isDiscount = true;
    }
    
  }

  removeDiscount(i: any){
    // remove discount
  }

  // RoomType Pricing
  showAddRoomTypePricing(){
    if(this.isRoomTypePricing){
      this.isRoomTypePricing = false;
    }else{
      this.isRoomTypePricing = true;
    }
    
  }
  addRoomTypeToPricing(rt: any){
    console.log(rt.name);
    
    this.roomTypesToPricing.push(rt);
  }

  addSeasonRoomTypePricing(contractId: any, seasonId: any, roomTypeId: any, pricing: any){
    this.hotelService.addSeasonRoomTypePricing(contractId, seasonId, roomTypeId, pricing);
  }
}
