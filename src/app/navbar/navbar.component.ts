import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 storageService = StorageService;

 constructor(
  private router: Router,
  private _snackBar: MatSnackBar
 ){}

 logout(){
  StorageService.logout();
  this._snackBar.open("Logged out", "Close", {duration: 3000, panelClass: "error-snackbar"});
  this.router.navigate([`/signin`]);
 }
}
