import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  EventEmitter,
  Output,
} from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  @Output() viewCart = new EventEmitter<void>();
  showCart = false;
  items = [
    {
      id: 1,
      name: 'Item1',
      restaurantName: 'Restaurant A',
      Rating: 4,
      review: 'good and worthy',
    },
    {
      id: 2,
      name: 'Item 2',
      restaurantName: 'Restaurant B',
      Rating: 4,
      review: 'good and worthy',
    },
  ];
  isItemOpen = false;
  selectedItem: any;
  foodItems: FoodItem[] = [
    {
      name: 'Pizza',
      price: 199,
      image: 'assets/image/pizza.png',
      quantity: 0,
    },
    {
      name: 'Burger',
      price: 79,
      image: 'assets/image/burger.jpg',
      quantity: 0,
    },
    {
      name: 'Pasta',
      price: 89,
      image: 'assets/image/pasta.jpg',
      quantity: 0,
    },
    {
      name: 'Salad',
      price: 59,
      image: 'assets/image/salad.jpg',
      quantity: 0,
    },
    {
      name: 'Chicken',
      price: 499,
      image: 'assets/image/chicken.jpg',
      quantity: 0,
    },
    {
      name: 'Pizza',
      price: 199,
      image: 'assets/image/burger.jpg',
      quantity: 0,
    },
    {
      name: 'ROTIS',
      price: 129,
      image: 'assets/image/rotis.jpg',
      quantity: 0,
    },
    { name: 'DOSA', price: 199, image: 'assets/image/dosa.jpg', quantity: 0 },
    {
      name: 'Sandwich',
      price: 199,
      image: 'assets/image/sandwi.jpg',
      quantity: 0,
    },
    {
      name: 'Biryani',
      price: 299,
      image: 'assets/image/biryani.jpg',
      quantity: 0,
    },
    { name: 'DOSA', price: 119, image: 'assets/image/dosa.jpg', quantity: 0 },
    {
      name: 'Idli',
      price: 49,
      image: 'assets/image/biryani.jpg',
      quantity: 0,
    },
    {
      name: 'Icecream',
      price: 79,
      image: 'assets/image/biryani.jpg',
      quantity: 0,
    },
    {
      name: 'Chocolates',
      price: 59,
      image: 'assets/image/biryani.jpg',
      quantity: 0,
    },
  ];
  cartItems: FoodItem[] = [];

  filteredItems: FoodItem[] = [];
  searchQuery: string = '';
  constructor(
    public cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  addToCartWithAnimation(
    item: FoodItem,
    doraemon: HTMLElement,
    event: MouseEvent
  ) {
    if (doraemon) {
      const existingItem = this.cartItems.find(
        (cartItem) => cartItem.name === item.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem = { ...item, quantity: 1 };
        this.cartItems.push(newItem);
      }
      const doraemonClone = doraemon.cloneNode(true) as HTMLElement;
      doraemonClone.classList.add('doraemon-clone');

      document.body.appendChild(doraemonClone);

      const cartIcon = document.querySelector('.cart-icon') as HTMLElement;
      const cartIconRect = cartIcon.getBoundingClientRect();

      const xOffset = event.clientX;
      const yOffset = event.clientY;
      doraemonClone.style.left = xOffset + 'px';
      doraemonClone.style.top = yOffset + 'px';
      const translateX = cartIconRect.left - xOffset;
      const translateY = cartIconRect.top - yOffset;
      doraemonClone.style.transition = 'transform 0.5s';
      doraemonClone.style.transform = `translate(${
        translateX - 0
      }px, ${translateY}px)`;

      setTimeout(() => {
        doraemonClone.style.opacity = '0';
        document.body.removeChild(doraemonClone);
      }, 500);
      console.log('Added item to the cart:', item);
    }
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = (params['search'] || '').trim();
      this.filterItems();
    });
    console.log('Search Query:', this.searchQuery);
    this.cartItems = this.cartService.getCartItems();
  }
  filterItems() {
    if (this.searchQuery) {
      this.filteredItems = this.foodItems.filter((item) => {
        return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    } else {
      this.filteredItems = this.foodItems;
    }
  }
  onSearch() {
    this.router.navigate(['/menu'], {
      queryParams: { search: this.searchQuery },
    });
  }
  toggleCart() {
    this.showCart = !this.showCart;
    if (this.showCart) {
      this.viewCart.emit();
    }
  }
  viewDetails(item: any) {
    this.router.navigate(['/itemdescription', item.id]);
  }
  isMenuRoute() {
    return this.router.url === '/menu';
  }
}
export interface FoodItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
}
export interface items {
  id: number;
  name: string;
  restaurantName: string;
  Rating: number;
  review: string;
}
