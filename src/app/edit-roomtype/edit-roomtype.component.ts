import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { Observable, switchMap } from 'rxjs';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelServiceService } from '../hotel-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-edit-roomtype',
    standalone: true,
    templateUrl: './edit-roomtype.component.html',
    styleUrl: './edit-roomtype.component.scss',
    imports: [
      NavbarComponent, 
      FooterComponent,
      NgIf,
      FormsModule
    ]
})
export class EditRoomtypeComponent implements OnInit{
  roomtype$!: Observable<any>;
  hotelId: any;
  roomtypeId: any;

  roomTypeName: any;
  roomTypeDescription: any;
  roomTypeMaxAdult: any;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private hotelService: HotelServiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.roomtype$ = this.activatedRoute.paramMap.pipe(
      switchMap((paramsMap) => {
        this.roomtypeId = paramsMap.get('roomtypeId');
        this.hotelId = paramsMap.get('hotelId');

        let roomtype = this.hotelService.getRoomType(this.roomtypeId);
        
        return roomtype;
      })
    );
    this.roomtype$.subscribe(r => {
      this.roomTypeName = r.name;
      this.roomTypeDescription = r.description;
      this.roomTypeMaxAdult = r.maxAdult;
    });
  }

  cancel(){
    this.router.navigate([`adminOneHotel/${this.hotelId}`]);
  }

  async editRoomtype(){
    const roomtype = {
      name: this.roomTypeName,
      description: this.roomTypeDescription,
      maxAdult: this.roomTypeMaxAdult
    };

    let r = await this.hotelService.updateRoomType(this.roomtypeId, roomtype).toPromise();
    this._snackBar.open("Successfully roomtype updated", "Close", {duration: 3000});
    this.router.navigate([`adminOneHotel/${this.hotelId}`]);
  }

}
