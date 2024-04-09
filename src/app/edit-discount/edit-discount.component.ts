import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelServiceService } from '../hotel-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-discount',
  standalone: true,
  imports: [
    NavbarComponent, 
    FooterComponent,
    NgIf,
    FormsModule
  ],
  templateUrl: './edit-discount.component.html',
  styleUrl: './edit-discount.component.scss'
})
export class EditDiscountComponent implements OnInit {
  discount$!: Observable<any>;
  hotelId: any;
  contractId: any;
  discountId: any;

  discountName: any;
  discountDescription: any;
  discountPercentage: any;
  daysPriorToArrival: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private hotelService: HotelServiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.discount$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramsMap) => {
        this.discountId = paramsMap.get('discountId');
        this.contractId = paramsMap.get('contractId');
        this.hotelId = paramsMap.get('hotelId');

        let discount = this.hotelService.getDiscount(this.discountId);
        
        return discount;
      })
    );
    this.discount$.subscribe(d => {
      this.discountName = d.name;
      this.discountDescription = d.description;
      this.discountPercentage = d.percentage;
      this.daysPriorToArrival = d.daysPriorToArrival;
    });
  }

  cancel(){
    this.router.navigate([`adminOneHotel/${this.hotelId}/adminOneContract/${this.contractId}`]);
  }

  async editDiscount(){
    const discount = {
      name: this.discountName,
      description: this.discountDescription,
      percentage: this.discountPercentage,
      daysPriorToArrival: this.daysPriorToArrival
    };

    let d = await this.hotelService.updateDiscount(this.discountId, discount).toPromise();
    this._snackBar.open("Successfully discount updated", "Close", {duration: 3000});
    this.router.navigate([`adminOneHotel/${this.hotelId}/adminOneContract/${this.contractId}`]);
  }
}
