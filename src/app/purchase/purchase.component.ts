import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent {
  toggleCardDetails: boolean = false;
  selectedCard: string = ''; 
  cardDetails: any = {
    name: '',
    number: '',
    expiryDate: '',
    postalCode: '',
  };

  constructor() {}

  selectCard(cardType: string) {
    this.selectedCard = cardType;
    this.toggleCardDetails = true;
  }
  isUPIOpen = false;
  upiDetails: string = '';
  toggleCarddetails() {
    this.isUPIOpen = !this.isUPIOpen;
  }

  closeUPI() {
    console.log('UPI Details:', this.upiDetails);
    this.isUPIOpen = false;
  }
}
