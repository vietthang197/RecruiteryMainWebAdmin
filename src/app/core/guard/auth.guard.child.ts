import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";
import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthorizationData} from "./authorization.data";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardChild implements CanActivateChild {

  constructor() {
  }


  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }

}
