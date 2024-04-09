import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

// material ui
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { HotelServiceService } from '../hotel-service.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        FooterComponent,
        ReactiveFormsModule,
        NgIf
    ]
})
export class SignupComponent implements OnInit {
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

  //validation
  signupForm!: FormGroup;
  submitted = false;
  notEquels = true;

  constructor(
    private hotelService: HotelServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    // validation
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      district: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern]],
      street: ['', Validators.required],
      password: ['', Validators.required],
      reWritePassword: ['', Validators.required]
    });
  }

  async signup(){
    this.submitted = true;
    this.signupForm.markAllAsTouched();
    if(this.signupForm.invalid || this.notEquels){
      console.log('error');
      
      return;
    }else{
      console.log('fine');
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
      
      let res = await this.hotelService.signup(user).toPromise();

      this._snackBar.open("Successfully Registered", "Close", {duration: 3000});

      this.router.navigate([`/signin`]);
    }
    
    
  }

  checkPassword(){
    this.notEquels = true;
    if(this.password == this.reWritePassword){
      this.notEquels = false;
    }
  }
}
