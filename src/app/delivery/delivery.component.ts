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
  private marker: any;
  public userLocation: { lat: number; lng: number } = { lat: 0, lng: 0 }; // User's location
  public deliveryPersonLocation: { lat: number; lng: number } = {
    lat: 0,
    lng: 0,
  }; // Delivery person's location
  public etaMinutes: number = 0; // Estimated time of arrival
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initializeMap();
    this.getUserLocation(); // Get the user's location
    this.setDeliveryPersonLocation(); // Set the delivery person's initial location
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
        const customIcon = L.icon({
          iconUrl: 'assets/image/delivery-icon.png', // Path to your custom marker image
          iconSize: [32, 32], // Adjust the size as needed
          iconAnchor: [16, 32], // Adjust the anchor point
        });
        if (firstResult) {
          const { lat, lng } = firstResult.geometry;

          if (this.marker) {
            this.map.removeLayer(this.marker);
          }

          this.marker = L.marker([lat, lng], { icon: customIcon }).addTo(
            this.map
          );

          // Update userLocation
          this.userLocation = { lat, lng };
          this.map.setView([lat, lng], 13);

          // Calculate the estimated time of arrival (ETA)
          this.calculateETA();

          // You can also send a notification to the user here.
        } else {
          console.error('No results found for the address.');
        }
      },
      (error) => {
        console.error('Error geocoding the address:', error);
      }
    );
  }

  getUserLocation() {
    // Use the browser's geolocation API to get the user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      this.userLocation.lat = position.coords.latitude;
      this.userLocation.lng = position.coords.longitude;
    });
  }

  setDeliveryPersonLocation() {
    // Set the initial location of the delivery person
    this.deliveryPersonLocation.lat = 17.6801; // Change to the actual delivery person's latitude
    this.deliveryPersonLocation.lng = 83.2016; // Change to the actual delivery person's longitude
  }

  calculateETA() {
    // Calculate the distance between user and delivery person (Haversine formula)
    const radius = 6371; // Earth's radius in km
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
    const distance = radius * c; // Distance in km

    // Estimate ETA based on a predefined speed (e.g., 30 km/h)
    const speed = 100; // km per hour
    this.etaMinutes = (distance / speed) * 60;
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
