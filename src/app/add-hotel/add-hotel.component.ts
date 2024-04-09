import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, NgModelGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { HotelServiceService } from '../hotel-service.service';
import { Router } from '@angular/router';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/compat/storage'
import { NavbarComponent } from "../navbar/navbar.component";
import { Observable, map, startWith } from 'rxjs';
import { AbstractControl, ValidatorFn } from '@angular/forms';

// material ui
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { FooterComponent } from "../footer/footer.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-add-hotel',
    standalone: true,
    templateUrl: './add-hotel.component.html',
    styleUrl: './add-hotel.component.scss',
    imports: [
        FormsModule,
        NgFor,
        NgIf,
        AngularFireStorageModule,
        NavbarComponent,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        AsyncPipe,
        ReactiveFormsModule,
        MatListModule,
        MatGridListModule,
        FooterComponent,
        NgClass,
        JsonPipe,
        
    ]
})
export class AddHotelComponent implements OnInit {
  name: string = '';
  country: string = 'Sri Lanka';
  district: string = '';
  street: string = '';
  contact: string = '';
  description: string = '';
  facilities: Array<{
    name: string,
    description: string
  }> = [];
  facilityName: string = '';
  facilityDescription: string = '';

  images: Array<{
    name: string,
    url: string
  }> = [];
  hotelImage: any;
  imageName: string = '';
  imageUrl: string = '';
  labelImage: string = "../../assets/addImageIcon.png";

  isFacility: boolean = false;
  isImage: boolean = false;
  facilityAdd = false;
  imageAdd = false;

  // Location selection
  locations: string[] = [
    'Colombo',
    'Gampaha',
    'Kalutara',
    'Kandy',
    'Matale',
    'Nuwara Eliya',
    'Galle',
    'Matara',
    'Hambantota',
    'Jaffna',
    'Kilinochchi',
    'Mannar',
    'Mullaitivu',
    'Vavuniya',
    'Puttalam',
    'Kurunegala',
    'Anuradhapura',
    'Polonnaruwa',
    'Badulla',
    'Monaragala',
    'Ratnapura',
    'Kegalle',
    'Trincomalee',
    'Batticaloa',
    'Ampara'
  ];
  filteredLocations!: Observable<string[]>;
  myControl = new FormControl('');

  // validation 
  formHotel!: FormGroup;
  submitted = false;
  

  constructor(
    private hotelService: HotelServiceService, 
    private router: Router,
    private fireStorage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ){}
  ngOnInit(): void {
    this.filteredLocations = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    // validation
    this.formHotel = this.formBuilder.group({
      name: ['', Validators.required],
      district: ['', Validators.required],
      street: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern]],
      description: ['', Validators.required]
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.locations.filter(location => location.toLowerCase().includes(filterValue));
  }

  async addHotel() {
    this.submitted = true;
    this.formHotel.markAllAsTouched();
    if(this.formHotel.invalid){
      return;
    }
    const hotel = {
      name: this.name,
      country: this.country,
      district: this.district,
      street: this.street,
      contact: this.contact,
      description: this.description
    };
  
    try {
      let response = await this.hotelService.addHotel(hotel).toPromise();
      let htl = response;
  
      if (this.facilities.length > 0) {
        await Promise.all(this.facilities.map(async (facility) => {
          let fac = await this.hotelService.addFacility(facility).toPromise();
          let h = await this.hotelService.addFacilityToHotel(response.id, fac.id).toPromise();
          htl = h;
        }));
      }
  
      if (this.images.length > 0) {
        await Promise.all(this.images.map(async (image) => {
          let img = await this.hotelService.addImage(image).toPromise();
          let h = await this.hotelService.addImageToHotel(response.id, img.id).toPromise();
          htl = h;
        }));
      }
  
      console.log(htl); // This will log the final response after all operations are completed
      this._snackBar.open("Successfully hotel addded", "Close", {duration: 3000});
      this.router.navigate([`/adminOneHotel/${htl.id}`]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  addFacility(){
    this.facilityAdd = true;
    if(this.facilityName == '' || this.facilityDescription == ''){
      return;
    }else{
      this.facilities.push({
        name: this.facilityName,
        description: this.facilityDescription
      });
      this.facilityName = '';
      this.facilityDescription = '';
    }
    this.facilityAdd = false;
  }

  async changeImage(event: any){
    console.log(this.hotelImage);
    const file = event.target.files[0];
    this.imageAdd = true;
    console.log(file);
    if(this.name == ''){
      return;
    }else{
      if(file){
        const path = `hotel/${this.name}/${file.name}`;
        const uploadTask = await this.fireStorage.upload(path, file);
        let url = await uploadTask.ref.getDownloadURL();
        console.log(url);
        this.labelImage = url;
        this.imageName = file.name;
        this.imageUrl = url;
      }
    }
    

  }

  showAddFacility(){
    this.facilityAdd = false;
    if(this.isFacility){
      this.isFacility = false;
    }else{
      this.isFacility = true;
    }
    
  }

  removeFacility(i: any){
    this.facilities.splice(i, 1);
  }

  addImage(){
    this.imageAdd = true;
    if(this.imageName == '' || this.imageUrl == ''){
      return;
    }else{
      this.images.push({
        name: this.imageName,
        url: this.imageUrl
      });
      this.imageName = '';
      this.imageUrl = '';
      this.labelImage = "../../assets/addImageIcon.png";
    }
    this.imageAdd = false;

  }

  showAddImage(){
    this.imageAdd = false;
    if(this.isImage){
      this.isImage = false;
    }else{
      this.isImage = true;
    }
    
  }

  async removeImage(i: any){
    let im = this.images.at(i);

    await this.deleteImageFromFireBase(im!.url);

    this.images.splice(i, 1);
  }

  deleteImageFromFireBase(url: string): any {
    const storageRef = this.fireStorage.refFromURL(url);
    return storageRef.delete();
  }

  contactValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const contactValue: string = control.value;
      if (!contactValue || contactValue.length !== 10 || !/^\d+$/.test(contactValue)) {
        return { 'invalidContact': { value: control.value } };
      }
      return null;
    };
  }
}
