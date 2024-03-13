import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelServiceService {

  constructor(private http: HttpClient) { }

  addHotel(hotel: any){
    return this.http.post<any>('http://localhost:8080/hotels', hotel);
  }

  getHotel(id: any){
    return this.http.get<any>(`http://localhost:8080/hotels/${id}`);
  }

  addFacility(facility: any){
    return this.http.post<any>('http://localhost:8080/facilities', facility)
  }

  addFacilityToHotel(hotelId: any, facilityId: any){
    return this.http.put<any>(`http://localhost:8080/hotels/${hotelId}/facilities/${facilityId}`, null);
  }

  addImage(image: any){
    return this.http.post<any>('http://localhost:8080/images', image);
  }

  addImageToHotel(hotelId: any, imageId: any){
    return this.http.put<any>(`http://localhost:8080/hotels/${hotelId}/images/${imageId}`, null);
  }
}
