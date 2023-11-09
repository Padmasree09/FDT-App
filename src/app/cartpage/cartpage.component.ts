import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FoodItem } from '../menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css'],
})
export class CartpageComponent implements OnInit {
  totalPrice: number = 0;

  cartItems: FoodItem[] = [];
  checkoutItems: FoodItem[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotalPrice();
  }
  decreaseQuantity(item: FoodItem) {
    if (item.quantity > 0) {
      item.quantity--;
      this.calculateTotalPrice();
      this.updateCheckoutItems();
    }
  }
  increaseQuantity(item: FoodItem) {
    item.quantity++;
    this.calculateTotalPrice();
    this.updateCheckoutItems();
  }
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
  updateCheckoutItems() {
    this.checkoutItems = [];
    this.checkoutItems = this.cartItems.filter((item) => item.quantity > 0);
  }
  placeOrder() {
    this.router.navigate(['/purchase']);
  }
}
