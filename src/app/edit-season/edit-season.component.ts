import { Component, NgModule, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { Observable, switchMap } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelServiceService } from '../hotel-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-edit-season',
    standalone: true,
    templateUrl: './edit-season.component.html',
    styleUrl: './edit-season.component.scss',
    imports: [
      NavbarComponent, 
      FooterComponent,
      NgIf,
      FormsModule
    ]
})
export class EditSeasonComponent implements OnInit {
  season$!: Observable<any>;
  seasonId: any;
  contractId: any;
  hotelId: any;

  seasonName: any;
  seasonStartDate: any;
  seasonEndDate: any;
  seasonMarkup: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private hotelService: HotelServiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.season$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramsMap) => {
        this.seasonId = paramsMap.get('seasonId');
        this.contractId = paramsMap.get('contractId');
        this.hotelId = paramsMap.get('hotelId');

        let season = this.hotelService.getSeason(this.seasonId);
        
        return season;
      })
    );
    this.season$.subscribe(s => {
      this.seasonName = s.name;
      this.seasonStartDate = s.startDate;
      this.seasonEndDate = s.endDate;
      this.seasonMarkup = s.markup;
    });
  }

  cancel(){
    this.router.navigate([`adminOneHotel/${this.hotelId}/adminOneContract/${this.contractId}/adminOneSeason/${this.seasonId}`]);
  }

  async editSeason(){
    const season = {
      name: this.seasonName,
      startDate: this.seasonStartDate,
      endDate: this.seasonEndDate,
      markup: this.seasonMarkup
    };

    let s = await this.hotelService.updateSeason(this.seasonId, season).toPromise();
    this._snackBar.open("Successfully season updated", "Close", {duration: 3000});
    this.router.navigate([`adminOneHotel/${this.hotelId}/adminOneContract/${this.contractId}/adminOneSeason/${this.seasonId}`]);
  }

}
