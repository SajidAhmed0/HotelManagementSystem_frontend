import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HotelServiceService } from '../hotel-service.service';

@Component({
    selector: 'app-admin-hotels',
    standalone: true,
    templateUrl: './admin-hotels.component.html',
    styleUrl: './admin-hotels.component.scss',
    imports: [
      NavbarComponent,
      FooterComponent,
      NgIf,
      AsyncPipe
    ]
})
export class AdminHotelsComponent implements OnInit {
  hotels$!: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hotelService: HotelServiceService
  ){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
