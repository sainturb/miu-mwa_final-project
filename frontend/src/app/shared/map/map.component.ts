import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from 'src/environments/environment';

const style = 'mapbox://styles/mapbox/light-v10';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {
  map: any;
  marker: any;
  @Input() lat = 37.2744318;
  @Input() lng = -100.6719744;

  @Input() properties: any[] = [];
  markers: any[] = [];

  constructor() {
  }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      style,
      accessToken: environment.mapbox.publicToken,
      container: 'map',
      zoom: 3.4,
      center: [this.lng, this.lat]
    });
    // this.marker = new mapboxgl.Marker({ color: 'black' })
    //   .setLngLat([this.lng, this.lat])
    //   .addTo(this.map);
    if (this.properties.length > 0) {
      this.addPoints();
    }


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lng'] || changes['lat']) {
      this.lng = changes['lng'].currentValue;
      this.lat = changes['lat'].currentValue;

      this.marker.setLngLat([this.lng, this.lat]);
      this.map.setCenter([this.lng, this.lat]);
    }
    if (changes['properties']) {
      this.properties = changes['properties'].currentValue;
      this.addPoints();
    }
  }

  addPoints() {
    this.markers.forEach(m => m.remove());
    this.markers = this.properties
      .filter(property => property.location.coordinates.length == 2)
      .map(property => {
        return new mapboxgl.Marker({ color: 'black' , scale: 0.4})
          .setLngLat(property.location.coordinates)
          .addTo(this.map);
      });
  }
}
