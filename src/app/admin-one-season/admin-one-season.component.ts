import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { HotelServiceService } from '../hotel-service.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

// material ui
import {MatListModule} from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private hotelService: HotelServiceService,
    private _snackBar: MatSnackBar,
    private router: Router
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

  removeRoomTypePricing(roomtypeId: any){
    // remove room type pricing
    const result = window.confirm('Are you sure you want to delete the roomtype pricing?');
    if(result){
      this.hotelService.deleteSeasonRoomTypePricing(this.contractId, this.seasonId, roomtypeId).subscribe({
        next: (ans) => {
          console.log(ans);
          
          this._snackBar.open("Successfully deleted the roomtype pricing", "Close", {duration: 3000});
          window.location.reload();
          
        },
        error: err =>{
          this._snackBar.open("Cannot delete because of foreign key constraint", "Close", {duration: 3000, panelClass: "error-snackbar"});
        }
      });
    }
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

  removeSupplementPricing(supplementId: any){
    // remove supplement pricing
    const result = window.confirm('Are you sure you want to delete the supplement pricing?');
    if(result){
      this.hotelService.deleteSeasonSupplementPricing(this.contractId, this.seasonId, supplementId).subscribe({
        next: (ans) => {
          console.log(ans);
          
          this._snackBar.open("Successfully deleted the supplement pricing", "Close", {duration: 3000});
          window.location.reload();
          
        },
        error: err =>{
          this._snackBar.open("Cannot delete because of foreign key constraint", "Close", {duration: 3000, panelClass: "error-snackbar"});
        }
      });
    }
  }

  deleteSeason(){
    const result = window.confirm('Are you sure you want to delete the season?');
    if (result) {
      this.hotelService.deleteSeason(this.seasonId).subscribe({
        next: (ans) => {
          console.log(ans);
          
          this._snackBar.open("Successfully deleted the season", "Close", {duration: 3000});
          this.router.navigate([`/adminOneHotel/${this.hotelId}/adminOneContract/${this.contractId}`]);
          
        },
        error: err =>{
          this._snackBar.open("Cannot delete because of foreign key constraint", "Close", {duration: 3000, panelClass: "error-snackbar"});
        }
      });

    }
  }
}
