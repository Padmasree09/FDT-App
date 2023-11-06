import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FoodItem } from './menu/menu.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: FoodItem[] = [];

  private cartSubject = new BehaviorSubject<FoodItem[]>(this.cartItems);
  cart$ = this.cartSubject.asObservable();

  addToCart(item: FoodItem) {
    this.cartItems.push(item);

    this.cartSubject.next(this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }

  constructor() {}
}
