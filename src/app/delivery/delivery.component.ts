import {
  Component,
  OnInit,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare var L: any;

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent implements OnInit, AfterViewInit {
  private map: any;
  private userMarker: any;
  private deliveryMarker: any;
  private polyline: any;
  public userLocation: { lat: number; lng: number } = { lat: 0, lng: 0 }; // User's location
  public deliveryPersonLocation: { lat: number; lng: number } = {
    lat: 0,
    lng: 0,
  }; // Delivery person's location
  public etaMinutes: number = 0; // Estimated time of arrival

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getUserLocation();
    this.setDeliveryPersonLocation();
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap() {
    this.map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  @HostListener('window:keydown.enter', ['$event'])
  onAddressInput(event: KeyboardEvent) {
    this.geocodeAddress();
  }

  geocodeAddress() {
    const addressInput = document.getElementById(
      'location'
    ) as HTMLInputElement;
    const address = addressInput.value;
    const geocodingService =
      'https://api.opencagedata.com/geocode/v1/json?q=' +
      encodeURIComponent(address) +
      '&key=41413ba1fa87497ab87980b8e4e515f6';
    this.http.get(geocodingService).subscribe(
      (data: any) => {
        const firstResult = data.results[0];
        if (firstResult) {
          const { lat, lng } = firstResult.geometry;

          if (this.userMarker) {
            this.map.removeLayer(this.userMarker);
          }

          const customIcon = L.icon({
            iconUrl: 'assets/image/delivery-icon.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          });

          this.userMarker = L.marker([lat, lng], { icon: customIcon }).addTo(
            this.map
          );
          // to center the map at the user - entered location
          this.map.setView([lat, lng], 13);
          const customDeliveryIcon = L.icon({
            iconUrl: 'assets/image/delivery-icon.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          });
          this.deliveryMarker = L.marker(
            [this.deliveryPersonLocation.lat, this.deliveryPersonLocation.lng],
            { icon: customDeliveryIcon }
          ).addTo(this.map);

          this.userLocation = { lat, lng };
          this.calculateETA();
        } else {
          console.error('No results found for the address.');
        }
      },
      (error) => {
        console.error('Error geocoding the address:', error);
      }
    );
    if (this.userLocation.lat !== 0 && this.userLocation.lng !== 0) {
      if (this.polyline) {
        this.map.removeLayer(this.polyline);
      }
      const latlng = [
        [this.userLocation.lat, this.userLocation.lng],
        [this.deliveryPersonLocation.lat, this.deliveryPersonLocation.lng],
      ];
      this.polyline = L.polyline(latlng, {
        color: 'black',
        dashArray: '10,10',
      }).addTo(this.map);
    }
  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.userLocation.lat = position.coords.latitude;
      this.userLocation.lng = position.coords.longitude;
    });
  }

  setDeliveryPersonLocation() {
    this.deliveryPersonLocation.lat = 17.43993; //  delivery person's latitude
    this.deliveryPersonLocation.lng = 78.498276; // delivery person's longitude
    const customDeliveryIcon = L.icon({
      iconUrl: 'assets/image/delivery-icon.png',
      iconSize: [32, 32],

      iconAnchor: [16, 32],
    });
    this.deliveryMarker = L.marker(
      [this.deliveryPersonLocation.lat, this.deliveryPersonLocation.lng],
      { icon: customDeliveryIcon }
    ).addTo(this.map);
  }
  calculateETA() {
    //(Haversine formula)
    const radius = 6371;
    const dLat = this.deg2rad(
      this.userLocation.lat - this.deliveryPersonLocation.lat
    );
    const dLng = this.deg2rad(
      this.userLocation.lng - this.deliveryPersonLocation.lng
    );

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.userLocation.lat)) *
        Math.cos(this.deg2rad(this.deliveryPersonLocation.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;
    const speed = 100;
    this.etaMinutes = (distance / speed) * 60;
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
