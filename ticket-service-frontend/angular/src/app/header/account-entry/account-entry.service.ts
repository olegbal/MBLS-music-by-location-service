import { Injectable, OnInit } from '@angular/core';
import { Role } from "../../data/Role";
import { User } from "../../data/User";
import { CookieService } from "ngx-cookie-service";
import { AuthHelper } from "../../auth/authhelper";
import { Router } from "@angular/router";

@Injectable()
export class AccountEntryService implements OnInit {

  constructor(private cookieService: CookieService,
              private router: Router) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.check(AuthHelper.authCookie);
  }

  isLoggedIn = false;
  loggedRolesList: Role[] = null;
  loggedUser: User = null;

  addRoles(roles: Role[]) {
    this.loggedRolesList = roles;
  }

  setLoggedIn(user: User) {
    this.isLoggedIn = true;
    this.addRoles(user.roles);
    this.loggedUser = user;
    this.router.navigate(['/']);
  }

  setLogout() {
    this.isLoggedIn = false;
    this.loggedUser = null;
    this.cookieService.delete(AuthHelper.authCookie);
  }
}
