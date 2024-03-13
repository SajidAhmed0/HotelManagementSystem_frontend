import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HotelServiceService } from '../hotel-service.service';
import { Observable } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-one-hotel',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    FormsModule
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
}
