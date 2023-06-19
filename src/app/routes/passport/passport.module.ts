import {NgModule} from '@angular/core';
import {SharedModule} from '@shared';

import {CallbackComponent} from './callback.component';
import {UserLoginComponent} from './login/login.component';
import {PassportRoutingModule} from './passport-routing.module';

const COMPONENTS = [UserLoginComponent, CallbackComponent];

@NgModule({
  imports: [SharedModule, PassportRoutingModule],
  declarations: [...COMPONENTS]
})
export class PassportModule {}
