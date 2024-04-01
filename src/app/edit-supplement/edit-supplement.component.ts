import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { Observable, switchMap } from 'rxjs';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelServiceService } from '../hotel-service.service';

@Component({
    selector: 'app-edit-supplement',
    standalone: true,
    templateUrl: './edit-supplement.component.html',
    styleUrl: './edit-supplement.component.scss',
    imports: [
      NavbarComponent, 
      FooterComponent,
      NgIf,
      FormsModule
    ]
})
export class EditSupplementComponent implements OnInit{
  supplement$!: Observable<any>;
  hotelId: any;
  supplementId: any;

  supplementName: any;
  supplementDescription: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private hotelService: HotelServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.supplement$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramsMap) => {
        this.supplementId = paramsMap.get('supplementId');
        this.hotelId = paramsMap.get('hotelId');

        let supplement = this.hotelService.getSupplement(this.supplementId);
        
        return supplement;
      })
    );
    this.supplement$.subscribe(sp => {
      this.supplementName = sp.name;
      this.supplementDescription = sp.description;
    });
  }

  cancel(){
    this.router.navigate([`adminOneHotel/${this.hotelId}`]);
  }

  async editSupplement(){
    const supplement = {
      name: this.supplementName,
      description: this.supplementDescription
    };

    let r = await this.hotelService.updateSupplement(this.supplementId, supplement).toPromise();
    this.router.navigate([`adminOneHotel/${this.hotelId}`]);
  }
}
