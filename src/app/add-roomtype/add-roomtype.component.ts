import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-roomtype',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './add-roomtype.component.html',
  styleUrl: './add-roomtype.component.scss'
})
export class AddRoomtypeComponent implement OnInit {

  facilities: Array<{
    name: string,
    description: string
  }> = [];
  facilityName: string = '';
  facilityDescription: string = '';
  isFacility: boolean = false;


  addFacility(){
    this.facilities.push({
      name: this.facilityName,
      description: this.facilityDescription
    });
    this.facilityName = '';
    this.facilityDescription = '';
  }

  showAddFacility(){
    if(this.isFacility){
      this.isFacility = false;
    }else{
      this.isFacility = true;
    }
    
  }

  removeFacility(i: any){
    this.facilities.splice(i, 1);
  }

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
    this.router.navigate([`adminOneHotel/${this.hotelId}`]);
  }
}
