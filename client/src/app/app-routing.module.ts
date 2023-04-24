import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmployeeCreateComponent } from "./components/employee-create/employee-create.component";
import { ProductCreateComponent } from "./components/product-create/product-create.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login-register" },
  { path: "login-register", component: EmployeeCreateComponent },
  {
    path: "product-list",
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "product",
    component: ProductCreateComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
