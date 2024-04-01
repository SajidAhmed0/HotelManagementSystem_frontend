import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { NgIf } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelServiceService } from '../hotel-service.service';

@Component({
    selector: 'app-edit-contract',
    standalone: true,
    templateUrl: './edit-contract.component.html',
    styleUrl: './edit-contract.component.scss',
    imports: [
      NavbarComponent, 
      FooterComponent,
      NgIf,
      FormsModule
    ]
})
export class EditContractComponent implements OnInit{
  contract$!: Observable<any>;
  contractId: any;
  hotelId: any;

  contractStartDate: any;
  contractEndDate: any;
  contractPaymentPolicy: any;
  contractCancelationPolicy: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private hotelService: HotelServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.contract$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramsMap) => {
        this.contractId = paramsMap.get('contractId');
        this.hotelId = paramsMap.get('hotelId');

        let con = this.hotelService.getContract(this.contractId);
        
        return con;
      })
    );
    this.contract$.subscribe(c => {
      this.contractStartDate = c.startDate;
      this.contractEndDate = c.endDate;
      this.contractPaymentPolicy = c.cancellationPolicy;
      this.contractCancelationPolicy = c.paymentPolicy;
    });
  }

  cancel(){
    this.router.navigate([`adminOneHotel/${this.hotelId}/adminOneContract/${this.contractId}`]);
  }

  async editContract(){
    const contact = {
      startDate: this.contractStartDate,
      endDate: this.contractEndDate,
      cancellationPolicy: this.contractPaymentPolicy,
      paymentPolicy: this.contractCancelationPolicy
    };

    let c = await this.hotelService.updateContract(this.contractId, contact).toPromise();
    this.router.navigate([`adminOneHotel/${this.hotelId}/adminOneContract/${this.contractId}`]);
  }

}
