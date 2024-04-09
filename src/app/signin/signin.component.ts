import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelServiceService } from '../hotel-service.service';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

// material ui
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';

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
      FormsModule,
      ReactiveFormsModule
    ]
})
export class SigninComponent implements OnInit {
  hide = true;
  email: string = '';
  password: string = '';

  //validation
  signinForm!: FormGroup;
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
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async signin(){
    this.submitted = true;
    this.signinForm.markAllAsTouched();
    if(this.signinForm.invalid){
      console.log('error');
      
      return;
    }else{
      let signin = {
        email: this.email,
        password: this.password
      }

      this.hotelService.signin(signin).subscribe({
        next: (res) => {
            console.log(res);
            
            if(res.user != null){
              const user = {
                id: res.user.id,
                role: res.user.role
              }
              StorageService.saveUser(user);
              StorageService.saveToken(res.token);

              this._snackBar.open("Login Successful", "Close", {duration: 3000});

              this.router.navigate([`/home`]);
            }else{
              //snackbar for invalid input
            }
          },
        error: err => {
          this._snackBar.open("Invalid credentials", "Close", {duration: 3000, panelClass: "error-snackbar"});
        }
        
        });

      
    }


    
  }
}

