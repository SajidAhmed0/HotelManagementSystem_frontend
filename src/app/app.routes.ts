import { Routes } from '@angular/router';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { AdminOneHotelComponent } from './admin-one-hotel/admin-one-hotel.component';
import { AdminOneContractComponent } from './admin-one-contract/admin-one-contract.component';
import { AdminOneSeasonComponent } from './admin-one-season/admin-one-season.component';

export const routes: Routes = [
    {path: 'addhotel', component: AddHotelComponent},
    {path: 'adminOneHotel/:id', component: AdminOneHotelComponent},
    {path: 'adminOneHotel/:hotelId/adminOneContract/:contractId', component: AdminOneContractComponent},
    {path: 'adminOneHotel/:hotelId/adminOneContract/:contractId/adminOneSeason/:seasonId', component: AdminOneSeasonComponent}
];
