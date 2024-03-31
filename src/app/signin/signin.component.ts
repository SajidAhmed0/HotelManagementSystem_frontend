import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

// material ui
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-signin',
    standalone: true,
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.scss',
    imports: [
      NavbarComponent, 
      FooterComponent,
      MatInputModule,
      MatFormFieldModule,
      MatIconModule,
      FormsModule
    ]
})
export class SigninComponent {
  hide = true;
  email: string = '';
  password: string = '';

  signin(){
    let signin = {
      email: this.email,
      password: this.password
    }

    // need to do some singins
  }
}
