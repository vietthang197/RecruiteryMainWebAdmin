import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {ActivatedRoute} from "@angular/router";
import {AuthorizationData} from "../../../core/guard/authorization.data";
import {firstValueFrom} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isLoggedIn = false;
  permissions: AuthorizationData[] = [];
  tokenValue = ''
  constructor(protected keycloakService: KeycloakService, private route: ActivatedRoute) {
  }

  login() {
    this.keycloakService.login()
  }
  async logout() {
    let isLoggedIn = await this.keycloakService.isLoggedIn();
    if (isLoggedIn)
      this.keycloakService.logout()
  }

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    let data = await firstValueFrom(this.route.data);
    // @ts-ignore
    this.permissions = await data.permission.authorizations;
  }

  async getToken() {
    this.tokenValue = await this.keycloakService.getToken();
  }

  checkIsLoggedIn() {
    this.keycloakService.isLoggedIn().then(value => {
      console.log("isloggedIn: ", value)
    })
  }
}
