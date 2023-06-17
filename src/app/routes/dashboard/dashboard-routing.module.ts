import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthorizationData} from "../../core/guard/authorization.data";
import {AuthorizationDataResolve} from "../../core/guard/authorization-data-resolve";

const authorizationsHome: AuthorizationData[] = [
  {
    audience: "app-photoz",
    permission: {
      id: 'UserResource',
      scopes: [
        'view', 'create', 'delete', 'edit'
      ]
    }
  }
]

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: {
      permissionRequired: authorizationsHome
    },
    resolve: {
      permission: AuthorizationDataResolve
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
