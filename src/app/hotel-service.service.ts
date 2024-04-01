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

  updateHotel(hotelId: any, hotel: any){
    return this.http.put<any>(`http://localhost:8080/hotels/${hotelId}`, hotel);
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

  deleteFacility(facilityId: any){
    return this.http.delete(`http://localhost:8080/facilities/${facilityId}`, {responseType: 'text'});
  }

  addFacilityToHotel(hotelId: any, facilityId: any){
    return this.http.put<any>(`http://localhost:8080/hotels/${hotelId}/facilities/${facilityId}`, null);
  }

  addImage(image: any){
    return this.http.post<any>('http://localhost:8080/images', image);
  }

  deleteImage(imageId: any){
    return this.http.delete(`http://localhost:8080/images/${imageId}`, {responseType: 'text'});
  }

  addImageToHotel(hotelId: any, imageId: any){
    return this.http.put<any>(`http://localhost:8080/hotels/${hotelId}/images/${imageId}`, null);
  }

  addRoomType(roomType: any){
    return this.http.post<any>('http://localhost:8080/roomtypes', roomType);
  }

  updateRoomType(roomtypeId: any, roomtype: any){
    return this.http.put<any>(`http://localhost:8080/roomtypes/${roomtypeId}`, roomtype);
  }

  getRoomType(roomtypeId : any){
    return this.http.get<any>(`http://localhost:8080/roomtypes/${roomtypeId}`);
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

  updateSupplement(supplementId: any, supplement: any){
    return this.http.put<any>(`http://localhost:8080/supplements/${supplementId}`, supplement);
  }

  getSupplement(supplementId : any){
    return this.http.get<any>(`http://localhost:8080/supplements/${supplementId}`);
  }

  addSupplementToHotel(hotelId: any, supplementId: any){
    return this.http.put<any>(`http://localhost:8080/hotels/${hotelId}/supplements/${supplementId}`, null);
  }

  addContract(contract: any){
    return this.http.post<any>('http://localhost:8080/contracts', contract);
  }

  updateContract(contractId: any, contract: any){
    return this.http.put<any>(`http://localhost:8080/contracts/${contractId}`, contract);
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

  updateSeason(seasonId: any, season: any){
    return this.http.put<any>(`http://localhost:8080/seasons/${seasonId}`, season);
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

  searchHotelsSummary(search: any){
    return this.http.post<any>(`http://localhost:8080/searches/summary?search=hotel`, search);
  }

  getHotelDetails(hotelId: any, search: any){
    return this.http.post<any>(`http://localhost:8080/searches/details/${hotelId}`, search);
  }

  addBooking(booking: any){
    return this.http.post<any>(`http://localhost:8080/bookings`, booking);
  }

  addBookedRoomType(bookedRoomType: any){
    return this.http.post<any>(`http://localhost:8080/bookedroomtypes`, bookedRoomType);
  }

  addBookedRoomTypeToBooking(bookingId: any, bookedroomtypeId: any){
    return this.http.put<any>(`http://localhost:8080/bookings/${bookingId}/bookedroomtypes/${bookedroomtypeId}`, null);
  }

  addBookedSupplement(bookedSupplement: any){
    return this.http.post<any>(`http://localhost:8080/bookedsupplements`, bookedSupplement);
  }

  addBookedSupplementToBooking(bookingId: any, bookedsupplementId: any){
    return this.http.put<any>(`http://localhost:8080/bookings/${bookingId}/bookedsupplements/${bookedsupplementId}`, null);
  }

  addBookedDiscount(bookedDiscount: any){
    return this.http.post<any>(`http://localhost:8080/bookeddiscounts`, bookedDiscount);
  }

  addBookedDiscountToBooking(bookingId: any, bookeddiscountId: any){
    return this.http.put<any>(`http://localhost:8080/bookings/${bookingId}/bookeddiscounts/${bookeddiscountId}`, null);
  }

  addPassenger(passenger: any){
    return this.http.post<any>(`http://localhost:8080/passengers`, passenger);
  }

  addPassengeToBooking(bookingId: any, passengerId: any){
    return this.http.put<any>(`http://localhost:8080/bookings/${bookingId}/passengers/${passengerId}`, null);
  }

  addPayment(payment: any){
    return this.http.post<any>(`http://localhost:8080/payments`, payment);
  }

  addBookingToUser(userId: any, bookingId: any){
    return this.http.put<any>(`http://localhost:8080/users/${userId}/bookings/${bookingId}`, null);
  }

  addPaymentToUser(userId: any, paymentId: any){
    return this.http.put<any>(`http://localhost:8080/users/${userId}/payments/${paymentId}`, null);
  }

  addBookingToRoomType(roomtypeId: any, bookingId: any){
    return this.http.put<any>(`http://localhost:8080/roomtypes/${roomtypeId}/bookings/${bookingId}`, null);
  }

  //bookings
  getAllBookingsOfUser(userId: any){
    return this.http.get<any>(`http://localhost:8080/users/${userId}/bookings`);
  }

  getBooking(bookingId: any){
    return this.http.get<any>(`http://localhost:8080/bookings/${bookingId}`);
  }
}
