import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLoginComponent implements OnDestroy, OnInit {
  constructor(
    private keycloakService: KeycloakService,
    private route: Router
  ) {}

  // #endregion

  ngOnDestroy(): void {}

  doLogin() {
    this.keycloakService.login({
      redirectUri: 'http://localhost:4200/#/dashboard/home'
    }).then(value => {

    })
  }

  async ngOnInit(): Promise<void> {
    let isLoggedIn = await this.keycloakService.isLoggedIn();
    if (isLoggedIn)
      await this.route.navigate(['/dashboard/home'])
  }
}
