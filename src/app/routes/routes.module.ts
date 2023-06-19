import {NgModule, Type} from '@angular/core';
import {SharedModule} from '@shared';
import {RouteRoutingModule} from './routes-routing.module';

const COMPONENTS: Array<Type<void>> = [
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS],
})
export class RoutesModule {}
