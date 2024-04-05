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
export class AddRoomtypeComponent {

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

}
