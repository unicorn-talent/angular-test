import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { EmployeeCreateComponent } from "./components/employee-create/employee-create.component";

import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { ApiService } from "./service/api.service";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductCreateComponent } from "./components/product-create/product-create.component";
@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    ProductListComponent,
    ProductCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
