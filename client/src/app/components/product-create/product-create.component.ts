import { ApiService } from "./../../service/api.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, NgZone } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { async } from "rxjs/internal/scheduler/async";
@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    category: new FormControl(""),
    price: new FormControl(""),
  });

  id: string;
  product_id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  Product: any = [];
  submitted = false;
  // productForm: FormGroup;
  CategoryProfile: any = ["Fashion", "Men", "Girls", "Women", "Accessories"];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params["id"];
    });

    if (this.id !== undefined) {
      await this.apiService.getProduct(this.id).then((data) => {
        this.Product = data;

        this.product_id = this.Product._id;
        this.name = this.Product.name;
        this.description = this.Product.description;
        this.category = this.Product.category;
        this.price = this.Product.price;
      });
    }

    this.mainForm();
  }

  mainForm() {
    this.productForm = this.fb.group({
      name: [this.name ? this.name : "", [Validators.required]],
      description: [
        this.description ? this.description : "",
        [Validators.required],
      ],
      category: [this.category ? this.category : "", [Validators.required]],
      price: [
        this.price ? this.price : "",
        [Validators.required, Validators.pattern("^[0-9]+$")],
      ],
    });
  }

  updateProfile(e) {
    this.productForm.get("category").setValue(e, {
      onlySelf: true,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.productForm.valid) {
      return false;
    } else {
      if (this.id) {
        this.apiService.editProduct(this.id, this.productForm.value).subscribe(
          (res) => {
            console.log("Employee successfully edited!");
            this.ngZone.run(() => this.router.navigateByUrl("/product-list"));
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.apiService.createProduct(this.productForm.value).subscribe(
          (res) => {
            console.log("Employee successfully created!");
            this.ngZone.run(() => this.router.navigateByUrl("/product-list"));
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  get myForm() {
    return this.productForm.controls;
  }

  RemoveProduct(product_id) {
    this.apiService.deleteProduct(product_id).subscribe(
      (res) => {
        this.ngZone.run(() => this.router.navigateByUrl("/product-list"));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
