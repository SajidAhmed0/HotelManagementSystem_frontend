import { Routes } from '@angular/router';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { AdminOneHotelComponent } from './admin-one-hotel/admin-one-hotel.component';
import { AdminOneContractComponent } from './admin-one-contract/admin-one-contract.component';
import { AdminOneSeasonComponent } from './admin-one-season/admin-one-season.component';
import { HomeComponent } from './home/home.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { BookingComponent } from './booking/booking.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { EditContractComponent } from './edit-contract/edit-contract.component';
import { EditSeasonComponent } from './edit-season/edit-season.component';
import { EditRoomtypeComponent } from './edit-roomtype/edit-roomtype.component';
import { EditSupplementComponent } from './edit-supplement/edit-supplement.component';
import { AdminHotelsComponent } from './admin-hotels/admin-hotels.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';

export const routes: Routes = [
    {path: 'adminhotels', component: AdminHotelsComponent},
    {path: 'addhotel', component: AddHotelComponent},
    {path: 'edithotel/:id', component: EditHotelComponent},
    {path: 'adminOneHotel/:id', component: AdminOneHotelComponent},
    {path: 'adminOneHotel/:hotelId/editroomtype/:roomtypeId', component: EditRoomtypeComponent},
    {path: 'adminOneHotel/:hotelId/editsupplement/:supplementId', component: EditSupplementComponent},
    {path: 'adminOneHotel/:hotelId/adminOneContract/:contractId', component: AdminOneContractComponent},
    {path: 'adminOneHotel/:hotelId/adminOneContract/:contractId/editcontract', component: EditContractComponent},
    {path: 'adminOneHotel/:hotelId/adminOneContract/:contractId/adminOneSeason/:seasonId', component: AdminOneSeasonComponent},
    {path: 'adminOneHotel/:hotelId/adminOneContract/:contractId/adminOneSeason/:seasonId/editseason', component: EditSeasonComponent},

    {path: 'home', component: HomeComponent},
    {path: 'home/hotels/:id', component: HotelDetailsComponent},
    {path: 'booking', component: BookingComponent},
    {path: 'user/:userId/bookings', component: UserBookingsComponent},
    {path: 'user/:userId/bookings/:bookingId', component: BookingDetailsComponent},

    // signup & signin
    {path: 'signup', component: SignupComponent},
    {path: 'signin', component: SigninComponent},

    {path: 'aboutus', component: AboutusComponent},
    {path: 'contactus', component: ContactusComponent}
];
