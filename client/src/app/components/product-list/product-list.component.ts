import { Router, NavigationExtras } from "@angular/router";
import { Component, OnInit, NgZone } from "@angular/core";
import { ApiService } from "./../../service/api.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  Product: any = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getProducts().subscribe((data) => {
      this.Product = data;
    });
  }

  ViewProduct(product_id) {
    const NavigationExtras: NavigationExtras = {
      queryParams: { id: product_id },
    };

    this.router.navigate(["/product"], NavigationExtras);
  }
}
