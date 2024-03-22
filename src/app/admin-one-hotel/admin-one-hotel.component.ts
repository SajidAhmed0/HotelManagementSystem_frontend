import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HotelServiceService } from '../hotel-service.service';
import { Observable } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddRoomtypeComponent } from '../add-roomtype/add-roomtype.component';

@Component({
  selector: 'app-admin-one-hotel',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    FormsModule,
    AddRoomtypeComponent,
    RouterModule
  ],
  templateUrl: './admin-one-hotel.component.html',
  styleUrl: './admin-one-hotel.component.scss'
})
export class AdminOneHotelComponent implements OnInit {
  id: string | null = '';
  hotel$!: Observable<any>;

  isFacility: boolean = false;
  facilityName: string = '';
  facilityDescription: string = '';

  isImage: boolean = false;
  imageName: string = '';
  imageUrl: string = '';

  isRoomType: boolean = false;
  roomTypeName: string = '';
  roomTypeDescription: string = '';
  roomTypeMaxAdult: number = 0;

  roomTypeFacilities: Array<{
    name: string,
    description: string
  }> = [];
  isRoomTypeFacility: boolean = false;
  roomTypeFacilityName: string = '';
  roomTypeFacilityDescription: string = '';

  isSupplement: boolean = false;
  supplementName: string = '';
  supplementDescription: string = '';

  isContract: boolean = false;
  contractStartDate: Date = new Date();
  contractEndDate: Date = new Date();
  contractPaymentPolicy: string = '';
  contractCancelationPolicy: string = '';

  isSeason: boolean = false;
  seasons: Array<{
    name: string,
    startDate: Date,
    endDate: Date,
    markup: number
  }> = [];
  seasonName: string = '';
  seasonStartDate: Date = new Date();
  seasonEndDate: Date = new Date();
  seasonMarkup: number = 0;

  isDiscount: boolean = false;
  discounts: Array<{
    name: string,
    description: string,
    percentage: number,
  }> = [];
  discountName: string = '';
  discountDescription: string = '';
  discountPercentage: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private hotelService: HotelServiceService
  ) {}

  ngOnInit(): void {
    this.hotel$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramsMap) => {
        this.id = paramsMap.get('id');
        let hotel = this.hotelService.getHotel(this.id);
        console.log(hotel);
        
        return hotel;
      })
    );
  }

  async addFacility(){
    let facility = {
      name: this.facilityName,
      description: this.facilityDescription
    };
    this.facilityName = '';
    this.facilityDescription = '';
    let fac = await this.hotelService.addFacility(facility).toPromise();
    this.hotel$ = await this.hotelService.addFacilityToHotel(this.id, fac.id);
  }

  showAddFacility(){
    if(this.isFacility){
      this.isFacility = false;
    }else{
      this.isFacility = true;
    }
    
  }

  removeFacility(i: any){
    // delete facility from db
  }

  async addImage(){
    let image = {
      name: this.imageName,
      url: this.imageUrl
    };
    this.imageName = '';
    this.imageUrl = '';
    let img = await this.hotelService.addImage(image).toPromise();
    this.hotel$ = await this.hotelService.addImageToHotel(this.id, img.id);
  }

  showAddImage(){
    if(this.isImage){
      this.isImage = false;
    }else{
      this.isImage = true;
    }
    
  }

  removeImage(i: any){
    // delete image from db
  }

  //Roomtype 
  async addRoomType(){
    let roomtype = {
      name: this.roomTypeName,
      description: this.roomTypeDescription,
      maxAdult: this.roomTypeMaxAdult
    };
    this.roomTypeName = '';
    this.roomTypeDescription = '';
    this.roomTypeMaxAdult = 0;
    let rt = await this.hotelService.addRoomType(roomtype).toPromise();

    if (this.roomTypeFacilities.length > 0) {
      await Promise.all(this.roomTypeFacilities.map(async (roomTypeFacility) => {
        let fac = await this.hotelService.addRoomTypeFacility(roomTypeFacility).toPromise();
        let r = await this.hotelService.addRoomTypeFacilityToRoomType(rt.id, fac.id).toPromise();
        rt = r;

      }));
    }
    this.roomTypeFacilities.splice(0, this.roomTypeFacilities.length);
    this.hotel$ = await this.hotelService.addRoomTypeToHotel(this.id, rt.id);
  }

  showAddRoomType(){
    if(this.isRoomType){
      this.isRoomType = false;
    }else{
      this.isRoomType = true;
    }
    
  }

  removeRoomType(i: any){
    // delete facility from db
  }

  addRoomTypeFacility(){
    this.roomTypeFacilities.push({
      name: this.roomTypeFacilityName,
      description: this.roomTypeFacilityDescription
    });
    this.roomTypeFacilityName = '';
    this.roomTypeFacilityDescription = '';
  }

  showAddRoomTypeFacility(){
    if(this.isRoomTypeFacility){
      this.isRoomTypeFacility = false;
    }else{
      this.isRoomTypeFacility = true;
    }
    
  }

  removeRoomTypeFacility(i: any){
    this.roomTypeFacilities.splice(i, 1);
  }

  // Supplement

  async addSupplement(){
    let supplement = {
      name: this.supplementName,
      description: this.supplementDescription
    };
    this.supplementName = '';
    this.supplementDescription = '';
    let sup = await this.hotelService.addSupplement(supplement).toPromise();
    this.hotel$ = await this.hotelService.addSupplementToHotel(this.id, sup.id);
  }

  showAddSupplement(){
    if(this.isSupplement){
      this.isSupplement = false;
    }else{
      this.isSupplement = true;
    }
    
  }

  removeSupplement(i: any){
    // delete facility from db
  }

  // Contract

  async addContract(){
    let contract = {
      startDate: this.contractStartDate,
      endDate: this.contractEndDate,
      paymentPolicy: this.contractPaymentPolicy,
      cancellationPolicy: this.contractCancelationPolicy
    };
    this.contractStartDate = new Date();
    this.contractEndDate = new Date();
    this.contractPaymentPolicy = '';
    this.contractCancelationPolicy = '';
    let con = await this.hotelService.addContract(contract).toPromise();

    if (this.seasons.length > 0) {
      await Promise.all(this.seasons.map(async (season) => {
        let sea = await this.hotelService.addSeason(season).toPromise();
        let c = await this.hotelService.addSeasonToContract(con.id, sea.id).toPromise();
        con = c;
      }));
    }

    if (this.discounts.length > 0) {
      await Promise.all(this.discounts.map(async (discount) => {
        let dis = await this.hotelService.addDiscount(discount).toPromise();
        let c = await this.hotelService.addDiscountToContract(con.id, dis.id).toPromise();
        con = c;
      }));
    }

    this.seasons.splice(0, this.seasons.length);
    this.discounts.splice(0, this.discounts.length);

    this.hotel$ = await this.hotelService.addContractToHotel(this.id, con.id);
  }

  showAddContract(){
    if(this.isContract){
      this.isContract = false;
    }else{
      this.isContract = true;
    }
    
  }

  removeContract(i: any){
    // delete image from db
  }

  // Season
  addSeason(){
    this.seasons.push({
      name: this.seasonName,
      startDate: this.seasonStartDate,
      endDate: this.seasonEndDate,
      markup: this.seasonMarkup
    });
    this.seasonName = '';
    this.seasonStartDate = new Date();
    this.seasonEndDate = new Date();
    this.seasonMarkup = 0;
  }

  showAddSeason(){
    if(this.isSeason){
      this.isSeason = false;
    }else{
      this.isSeason = true;
    }
    
  }

  removeSeason(i: any){
    this.seasons.splice(i, 1);
  }

  //Discount
  addDiscount(){
    this.discounts.push({
      name: this.discountName,
      description: this.discountDescription,
      percentage: this.discountPercentage
    });
    this.discountName = '';
    this.discountDescription = '';
    this.discountPercentage = 0;
  }

  showAddDiscount(){
    if(this.isDiscount){
      this.isDiscount = false;
    }else{
      this.isDiscount = true;
    }
    
  }

  removeDiscount(i: any){
    this.discounts.splice(i, 1);
  }
}
