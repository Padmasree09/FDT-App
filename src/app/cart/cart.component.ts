import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FoodItem } from '../menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: FoodItem[] = [];

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
  }
}
