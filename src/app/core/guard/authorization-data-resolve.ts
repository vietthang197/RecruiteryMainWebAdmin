import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {AuthorizationData} from "./authorization.data";
import {Injectable} from "@angular/core";
import {KeycloakService} from "keycloak-angular";
import KeycloakAuthorization from "keycloak-js/dist/keycloak-authz";
import jwt_decode from "jwt-decode";
import {AuthorizationDataList} from "./authorization-data-list";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthorizationDataResolve implements Resolve<AuthorizationDataList> {

  constructor(private keycloakService: KeycloakService) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<AuthorizationDataList> {
    const isloggedIn = await this.keycloakService.isLoggedIn();
    if (isloggedIn) {
      try {
        let authorizationData: AuthorizationData[] = route.data['permissionRequired'];
        if (authorizationData) {
          let keycloakAuthz = new KeycloakAuthorization(this.keycloakService.getKeycloakInstance());
          // @ts-ignore
          await keycloakAuthz.ready;
          let authorizationRequest = {
            permissions: [authorizationData[0].permission],
            metadata: {
              responseIncludeResourceName: true
            }
          }

          const rpt = await keycloakAuthz.entitlement(authorizationData[0].audience, authorizationRequest);
          const decodedToken = jwt_decode(rpt);

          // @ts-ignore
          const permissions: [] = decodedToken.authorization.permissions;
          const authList: AuthorizationDataList = {
            authorizations: []
          }
          for (let item of permissions) {
            // @ts-ignore
            authList.authorizations?.push({
              audience: authorizationData[0].audience,
              permission: {
                // @ts-ignore
                id: item['rsname'],
                // @ts-ignore
                scopes: item['scopes']
              }
            })
          }
          console.log("authListParse: ", authList)
          return authList

        }
      } catch (e) {
        return {
          authorizations: []
        }
      }
      // @ts-ignore
      return {
        authorizations: []
      }
    } else
      return {
        authorizations: []
      }
  }
}
