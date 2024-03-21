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

  addRoomType(roomType: any){
    return this.http.post<any>('http://localhost:8080/roomtypes', roomType);
  }

  addRoomTypeToHotel(hotelId: any, roomtypeId: any){
    return this.http.put<any>(`http://localhost:8080/hotels/${hotelId}/roomtypes/${roomtypeId}`, null);
  }

  addRoomTypeFacility(facility: any){
    return this.http.post<any>('http://localhost:8080/roomtypefacilities', facility)
  }

  addRoomTypeFacilityToRoomType(roomTypeId: any, facilityId: any){
    return this.http.put<any>(`http://localhost:8080/roomtypes/${roomTypeId}/roomtypefacilities/${facilityId}`, null);
  }

  addSupplement(supplement: any){
    return this.http.post<any>('http://localhost:8080/supplements', supplement)
  }

  addSupplementToHotel(hotelId: any, supplementId: any){
    return this.http.put<any>(`http://localhost:8080/hotels/${hotelId}/supplements/${supplementId}`, null);
  }

  addContract(contract: any){
    return this.http.post<any>('http://localhost:8080/contracts', contract);
  }

  addContractToHotel(hotelId: any, contractId: any){
    return this.http.put<any>(`http://localhost:8080/hotels/${hotelId}/contracts/${contractId}`, null);
  }

  addSeason(season: any){
    return this.http.post<any>('http://localhost:8080/seasons', season);
  }

  addSeasonToContract(contractId: any, seasonId: any){
    return this.http.put<any>(`http://localhost:8080/contracts/${contractId}/seasons/${seasonId}`, null);
  }

  addDiscount(discount: any){
    return this.http.post<any>('http://localhost:8080/discounts', discount);
  }

  addDiscountToContract(contractId: any, discountId: any){
    return this.http.put<any>(`http://localhost:8080/contracts/${contractId}/discounts/${discountId}`, null);
  }
}
