import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { HotelServiceService } from '../hotel-service.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

// material ui
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

@Component({
    selector: 'app-admin-one-contract',
    standalone: true,
    templateUrl: './admin-one-contract.component.html',
    styleUrl: './admin-one-contract.component.scss',
    imports: [
        FormsModule,
        NgFor,
        NgIf,
        AsyncPipe,
        RouterModule,
        NavbarComponent,
        FooterComponent,
        MatListModule,
        MatTableModule
    ]
})
export class AdminOneContractComponent implements OnInit {
  hotelId: string | null = '';
  // hotel$!: Observable<any>;
  contractId: string | null = '';
  contract$!: Observable<any>;
  roomTypes: any[] = [];
  supplements: any[] = [];

  seasonAdd = false;
  isSeason: boolean = false;
  seasonName: string = '';
  seasonStartDate: Date = new Date();
  seasonEndDate: Date = new Date();
  seasonMarkup: number = 0;

  discountAdd = false;
  isDiscount: boolean = false;
  discountName: string = '';
  discountDescription: string = '';
  discountPercentage: number = 1;
  daysPriorToArrival: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hotelService: HotelServiceService
  ){}

  ngOnInit(): void {
    this.contract$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramsMap) => {
        this.hotelId = paramsMap.get('hotelId');
        // this.hotel$ = this.hotelService.getHotel(this.hotelId);
        this.contractId = paramsMap.get('contractId');
        let contract = this.hotelService.getContract(this.contractId);
        this.hotelService.getAllRoomTypesOfHotel(this.hotelId).subscribe((rooms) => this.roomTypes = rooms);
        this.hotelService.getAllSupplementsOfHotel(this.hotelId).subscribe((sups) => this.supplements = sups);
        console.log(contract);
        
        return contract;
      })
    );
  }


  // Season
  async addSeason(){
    this.seasonAdd = true;
    if(this.seasonName == '' || this.seasonMarkup < 1 || this.seasonStartDate >= this.seasonEndDate){
      return;
    }else{
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
    this.seasonAdd = false;
  }

  showAddSeason(){
    this.seasonAdd = false;
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
    this.discountAdd = true;
    if(this.discountName == '' || this.discountDescription == '' || this.discountPercentage < 1 || this.daysPriorToArrival < 1){
      return;
    }else{
      let discount = {
        name: this.discountName,
        description: this.discountDescription,
        percentage: this.discountPercentage,
        daysPriorToArrival: this.daysPriorToArrival
      };
      this.discountName = '';
      this.discountDescription = '';
      this.discountPercentage = 0;
      this.daysPriorToArrival = 0;
  
      let dis = await this.hotelService.addDiscount(discount).toPromise();
      this.contract$ = await this.hotelService.addDiscountToContract(this.contractId, dis.id);
    }
    this.discountAdd = false;
  }

  showAddDiscount(){
    this.discountAdd = false;
    if(this.isDiscount){
      this.isDiscount = false;
    }else{
      this.isDiscount = true;
    }
    
  }

  removeDiscount(i: any){
    // remove discount
  }

  getSeasonName(seasonId: any, seasons: any[]){
    let season = seasons.filter((sea) => sea.id == seasonId)

    return season[0].name;
  }

  getRoomTypeName(roomTypeId: any, roomTypes: any[]){
    let roomType = roomTypes.filter((rt) => rt.id == roomTypeId)

    return roomType[0].name;
  }

  getSupplementName(supplementId: any, supplements: any[]){
    let supplement = supplements.filter((sup) => sup.id == supplementId)

    return supplement[0].name;
  }
  
}
