import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FoodItem } from '../menu/menu.component';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css'],
})
export class CartpageComponent implements OnInit {
  cartItems: FoodItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }
  decreaseQuantity(item: FoodItem) {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }
  increaseQuantity(item: FoodItem) {
    item.quantity++;
  }
}
