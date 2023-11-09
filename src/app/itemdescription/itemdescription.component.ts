import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-itemdescription',
  templateUrl: './itemdescription.component.html',
  styleUrls: ['./itemdescription.component.css'],
})
export class ItemdescriptionComponent {
  itemId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the item ID from the route parameters
    this.route.params.subscribe((params) => {
      this.itemId = +params['id'];
      // Fetch item details based on the ID and display them
      // You can use a service to fetch data based on the ID
    });
  }
}
