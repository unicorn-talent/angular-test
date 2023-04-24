import { Component, NgZone, OnInit, Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { AuthGuard } from "./auth.guard";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [AuthGuard],
})
export class AppComponent implements OnInit {
  title = "Test Task";
  flag = false;
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authGuard: AuthGuard
  ) {}
  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === "/login-register") {
          this.flag = false;
        } else {
          this.flag = true;
        }
      }
    });
  }

  singOut() {
    localStorage.removeItem("token");
    this.flag = false;
    this.ngZone.run(() => this.router.navigateByUrl("/login-register"));
  }
}
