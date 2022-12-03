import {Component, HostListener, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Options} from "@angular-slider/ngx-slider";
import {PropertyService} from "../../../core/services/property.service";
import {MapService} from "../../../core/services/map.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

const PET_SVG = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M19,3L15,7L18,10L19,9L20,10L22,8L19,5V3M3,7L2,8L5,11V14L4,15V21H6V18L8,15H15V21H17V11L14,8L13,9H5L3,7Z" />
</svg>`
const PET_NOT_SVG = `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M18 10L15 7L19 3V5L22 8L20 10L19 9L18 10M17 11L14 8L13 9H12.2L17 13.8V11M2.39 1.73L1.11 3L7.11 9H5L3 7L2 8L5 11V14L4 15V21H6V18L8 15H13.11L15 16.89V21H17V18.89L20.84 22.73L22.11 21.46L2.39 1.73Z" />
</svg>`

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @HostListener('keyup.esc') removeFeatures() {
    this.features = [];
  }

  search = '';
  features: any[] = [];
  coordinates: number[] = [];
  fetcher: Subscription | undefined;


  options: Options = {
    floor: 100,
    step: 100,
    ceil: 1000,
    hidePointerLabels: true,
    hideLimitLabels: true
  };

  filter: any = {
    minPrice: 100,
    maxPrice: 1000
  }

  properties: any[] = [];

  constructor(private propertyService: PropertyService,
              private mapService: MapService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private router: Router,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('pet', sanitizer.bypassSecurityTrustHtml(PET_SVG));
    iconRegistry.addSvgIconLiteral('pet-not', sanitizer.bypassSecurityTrustHtml(PET_NOT_SVG));
    route.queryParams.subscribe((filter: any) => {
      this.filter = {
        minPrice: 100,
        maxPrice: 1000
      };
      if (filter.purpose) {
        this.filter.purpose = filter.purpose;
        this.onSearchQuery();
      } else {
        this.fetch()
      }
    });
  }

  ngOnInit(): void {
    // this.fetch();
  }

  fetch(): void {
    this.propertyService.fetchAll()
      .subscribe(properties => {
        this.properties = properties;
      });
  }

  toggleFavorite(property: any): void {
    const favorites = localStorage.getItem('favorites');
    let list: any[] = favorites ? JSON.parse(favorites) : [];
    if (!list.includes(property._id)) {
      list.push(property._id);
    } else {
      list.splice(list.indexOf(property._id), 1);
    }
    localStorage.setItem('favorites', JSON.stringify(list));
  }

  isFavorite(property: any): boolean {
    return localStorage.getItem('favorites') !== null ? JSON.parse(localStorage.getItem('favorites')!).includes(property._id) : false;
  }

  onMyLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.coordinates = [longitude, latitude];
        this.onFindNear();
      }, () => {
        this.snackBar.open('The permission to access geolocation is denied', 'Okay', {
          duration: 3000
        });
      });
    } else {
      this.snackBar.open('No support for geolocation', 'Okay', {
        duration: 3000
      });
    }
  }

  onSearch(event: any) {
    if (this.fetcher) {
      this.fetcher.unsubscribe();
    }
    if (event.target.value.length > 0) {
      this.fetcher = this.mapService.search(event.target.value).subscribe((res: any) => {
        this.features = res.features;
        if (res.features[0] && res.features[0].center instanceof Array) {
          this.coordinates = res.features[0].center;
          this.onFindNear();
        }
      });
    } else {
      this.fetch();
    }
  }

  onSelectFeature(feature: any) {
    this.search = feature.place_name;
    this.coordinates = feature.center;
    this.features = [];
    this.onFindNear();
  }

  onFindNear(): void {
    this.propertyService.findNear(this.coordinates[0], this.coordinates[1]).subscribe(properties => {
      this.properties = properties;
    });
  }

  onSet(field: string, value: any): void {
    this.filter[field] = value;
    this.onSearchQuery();
  }

  onSearchQuery(): void {
    this.propertyService.search(this.filter)
      .subscribe(properties => {
        this.properties = properties;
      });
  }
}
