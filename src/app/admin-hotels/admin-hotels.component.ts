import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HotelServiceService } from '../hotel-service.service';

// material ui
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
    selector: 'app-admin-hotels',
    standalone: true,
    templateUrl: './admin-hotels.component.html',
    styleUrl: './admin-hotels.component.scss',
    imports: [
      NavbarComponent,
      FooterComponent,
      NgIf,
      AsyncPipe,
      RouterModule,
      MatFormFieldModule, 
      MatInputModule, 
      MatTableModule
    ]
})
export class AdminHotelsComponent implements OnInit {
  hotels$!: Observable<any>;
  ELEMENT_DATA: any = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(
    private activatedRoute: ActivatedRoute,
    private hotelService: HotelServiceService
  ){}

  ngOnInit(): void {
    this.hotels$ = this.hotelService.getAllHotel();
    this.hotels$.subscribe(hotels => this.ELEMENT_DATA);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
