import {Component, OnInit} from '@angular/core';
import {MapService} from "../../core/services/map.service";
import {Subscription} from "rxjs";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {FileService} from "../../core/services/file.service";
import {PropertyService} from "../../core/services/property.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  types = ['Apartment', 'Condo', 'Private House', 'Room'];

  form: FormGroup;
  search: string = '';
  fetcher: Subscription | undefined;

  features: any[] = [];

  images: any = {};

  payload: any = {
    address: {
      country: 'United States',
      city: '',
      state: '',
      street: '',
      zipcode: ''
    },
    location: {
      type: 'Point',
      coordinates: [
        -100.039966,
        38.249358
      ]
    },
  };

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private mapService: MapService,
              private fileService: FileService,
              private propertyService: PropertyService) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.minLength(3)]),
      description: new FormControl('', [Validators.minLength(12)]),
      purpose: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      petFriendly: new FormControl(false),
      bedroom: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(15)]),
      bathroom: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(15)]),
    });
  }

  ngOnInit(): void {
  }

  onSearch(event: any): void {
    if (this.fetcher) {
      this.fetcher.unsubscribe();
    }
    this.fetcher = this.mapService.search(event.target.value).subscribe((res: any) => {
      this.features = res.features;
      if (res.features[0] && res.features[0].center instanceof Array) {
        this.payload.location.coordinates = res.features[0].center;
      }
    });
  }

  uploadFile(event: any, numbering: any): void {
    this.fileService.upload(event.target.files[0]).subscribe(res => {
      this.images[`image${numbering}`] = res.location;
    });
  }

  save() {
    const images: any = [{url: this.images.image1}, {url: this.images.image2}, {url: this.images.image3}].filter(img => !!img.url);
    if (this.form.valid
      && images.length > 0
      && this.payload.location.coordinates.length === 2) {
      const body = {...this.payload, ...this.form.getRawValue(), images};
      this.propertyService.addProperty(body).subscribe(res => {
        this.snackBar.open('Successfully added new property to your portfolio', 'Okay', {
          duration: 3000
        });
        this.router.navigateByUrl('home').then();
      });
    } else {
      this.snackBar.open('Some info are missing in the form', 'Okay', {
        duration: 3000
      });
    }
  }

  getControl(field: string): AbstractControl<any, any> | null | undefined {
    return this.form.get(field);
  }

  onSelectFeature(feature: any): void {
    this.search = feature.place_name;
    feature.context.forEach((item: any) => {
      if (item.id.includes('region')) {
        this.payload.address.state = item.text;
      }
      if (item.id.includes('country')) {
        this.payload.address.country = item.text;
      }
      if (item.id.includes('postcode')) {
        this.payload.address.zipcode = item.text;
      }
      if (item.id.includes('place')) {
        this.payload.address.city = item.text;
      }
    })

    if (feature.place_type && feature.place_type[0] == 'address') {
      this.payload.address.street = `${feature.address} ${feature.text}`;
    }
    this.payload.location.coordinates = feature.center;
    this.features = [];
  }
}
