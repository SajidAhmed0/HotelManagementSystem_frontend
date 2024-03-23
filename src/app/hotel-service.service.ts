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

  getAllHotel(){
    return this.http.get<any>(`http://localhost:8080/hotels`);
  }

  getAllRoomTypesOfHotel(hotelId: any){
    return this.http.get<any>(`http://localhost:8080/hotels/${hotelId}/roomtypes`);
  }

  getUnPricedRoomTypes(hotelId: any, contractId: any, seasonId: any){
    return this.http.get<any>(`http://localhost:8080/hotels/${hotelId}/contracts/${contractId}/seasons/${seasonId}/roomtypes`);
  }

  getAllSupplementsOfHotel(hotelId: any){
    return this.http.get<any>(`http://localhost:8080/hotels/${hotelId}/supplements`);
  }

  getUnPricedSupplements(hotelId: any, contractId: any, seasonId: any){
    return this.http.get<any>(`http://localhost:8080/hotels/${hotelId}/contracts/${contractId}/seasons/${seasonId}/supplements`);
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

  getContract(id: any){
    return this.http.get<any>(`http://localhost:8080/contracts/${id}`);
  }

  addContractToHotel(hotelId: any, contractId: any){
    return this.http.put<any>(`http://localhost:8080/hotels/${hotelId}/contracts/${contractId}`, null);
  }

  addSeason(season: any){
    return this.http.post<any>('http://localhost:8080/seasons', season);
  }

  getSeason(id: any){
    return this.http.get<any>(`http://localhost:8080/seasons/${id}`);
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

  addSeasonRoomTypePricing(contractId: any, seasonId: any, roomTypeId: any, pricing: any){
    return this.http.post<any>(`http://localhost:8080/contracts/${contractId}/seasons/${seasonId}/roomtypes/${roomTypeId}`, pricing);
  }

  addSeasonSupplementPricing(contractId: any, seasonId: any, supplementId: any, pricing: any){
    return this.http.post<any>(`http://localhost:8080/contracts/${contractId}/seasons/${seasonId}/supplements/${supplementId}`, pricing);
  }

  searchHotels(search: any){
    return this.http.post<any>(`http://localhost:8080/searches?search=hotel`, search);
  }
}
