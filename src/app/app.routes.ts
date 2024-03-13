import { Routes } from '@angular/router';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { AdminOneHotelComponent } from './admin-one-hotel/admin-one-hotel.component';

export const routes: Routes = [
    {path: 'addhotel', component: AddHotelComponent},
    {path: 'adminOneHotel/:id', component: AdminOneHotelComponent}
];
