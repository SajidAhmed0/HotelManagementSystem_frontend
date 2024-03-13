import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { HotelServiceService } from '../hotel-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.scss'
})
export class AddHotelComponent {
  name: string = '';
  country: string = '';
  district: string = '';
  street: string = '';
  contact: string = '';
  description: string = '';
  facilities: Array<{
    name: string,
    description: string
  }> = [];
  facilityName: string = '';
  facilityDescription: string = '';

  images: Array<{
    name: string,
    url: string
  }> = [];
  imageName: string = '';
  imageUrl: string = '';

  isFacility: boolean = false;
  isImage: boolean = false;

  constructor(private hotelService: HotelServiceService, private router: Router){}

  // addHotel(){
  //   const hotel = {
  //     name: this.name,
  //     country: this.country,
  //     district: this.district,
  //     street: this.street,
  //     contact: this.contact,
  //     description: this.description
  //   }
  //   var htl;
  //   this.hotelService.addHotel(hotel).subscribe(response => {
  //     htl = response;
  //     if(this.facilities.length > 0){
  //       this.facilities.map((facility) => {
  //         this.hotelService.addFacility(facility).subscribe(fac => {
  //           let h = this.hotelService.addFacilityToHotel(response.id, fac.id).subscribe(h => {
  //             htl = h;
              
  //           });
            
  //         });
          
  //       });
  //     }
  //     if(this.images.length > 0){
  //       this.images.map((image) => {
  //         this.hotelService.addImage(image).subscribe(img => {
  //           let h = this.hotelService.addImageToHotel(response.id, img.id).subscribe(
  //             h => {
  //               htl = h;

  //             }
  //           )
  //         })
  //       });
  //     }
      
  //   });
  //   console.log(htl);
    
  // }
  async addHotel() {
    const hotel = {
      name: this.name,
      country: this.country,
      district: this.district,
      street: this.street,
      contact: this.contact,
      description: this.description
    };
  
    try {
      let response = await this.hotelService.addHotel(hotel).toPromise();
      let htl = response;
  
      if (this.facilities.length > 0) {
        await Promise.all(this.facilities.map(async (facility) => {
          let fac = await this.hotelService.addFacility(facility).toPromise();
          let h = await this.hotelService.addFacilityToHotel(response.id, fac.id).toPromise();
          htl = h;
        }));
      }
  
      if (this.images.length > 0) {
        await Promise.all(this.images.map(async (image) => {
          let img = await this.hotelService.addImage(image).toPromise();
          let h = await this.hotelService.addImageToHotel(response.id, img.id).toPromise();
          htl = h;
        }));
      }
  
      console.log(htl); // This will log the final response after all operations are completed
      this.router.navigate([`/adminOneHotel/${htl.id}`]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  addFacility(){
    this.facilities.push({
      name: this.facilityName,
      description: this.facilityDescription
    });
    this.facilityName = '';
    this.facilityDescription = '';
  }

  showAddFacility(){
    if(this.isFacility){
      this.isFacility = false;
    }else{
      this.isFacility = true;
    }
    
  }

  removeFacility(i: any){
    this.facilities.splice(i, 1);
  }

  addImage(){
    this.images.push({
      name: this.imageName,
      url: this.imageUrl
    });
    this.imageName = '';
    this.imageUrl = '';
  }

  showAddImage(){
    if(this.isImage){
      this.isImage = false;
    }else{
      this.isImage = true;
    }
    
  }

  removeImage(i: any){
    this.images.splice(i, 1);
  }
}
