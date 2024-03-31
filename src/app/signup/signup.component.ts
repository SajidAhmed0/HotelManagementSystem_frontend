import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

// material ui
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'app-signup',
    standalone: true,
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
    imports: [
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        NavbarComponent,
        FooterComponent
    ]
})
export class SignupComponent {
  hide = true;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  country: string = '';
  district: string = '';
  street: string = '';
  phone: string = '';
  password: string = '';
  reWritePassword: string = '';

  signup(){
    let user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      country: this.country,
      district: this.district,
      street: this.street
    }

    // signup service
  }
}
