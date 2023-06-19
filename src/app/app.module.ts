/* eslint-disable import/order */
/* eslint-disable import/no-duplicates */
// #region Http Interceptors
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, LOCALE_ID, NgModule, Type} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {Observable} from 'rxjs';

// #region default language
// Reference: https://ng-alain.com/docs/i18n
import {default as ngLang} from '@angular/common/locales/en';
// #endregion
// #region i18n services
import {ALAIN_I18N_TOKEN, DELON_LOCALE, en_US as delonLang} from '@delon/theme';
import {zhCN as dateLang} from 'date-fns/locale';
import {en_US as zorroLang, NZ_DATE_LOCALE, NZ_I18N} from 'ng-zorro-antd/i18n';
// register angular
import {registerLocaleData} from '@angular/common';
// #region Startup Service
import {DefaultInterceptor, I18NService, StartupService} from '@core';
// #region JSON Schema form (using @delon/form)
import {JsonSchemaModule} from '@shared';
import {SimpleInterceptor} from '@delon/auth';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {GlobalConfigModule} from './global-config.module';
import {LayoutModule} from './layout/layout.module';
import {RoutesModule} from './routes/routes.module';
import {SharedModule} from './shared/shared.module';
import {STWidgetModule} from './shared/st-widget/st-widget.module';
import {KeycloakService} from "keycloak-angular";

const LANG = {
  abbr: 'en',
  ng: ngLang,
  zorro: zorroLang,
  date: dateLang,
  delon: delonLang,
};
registerLocaleData(LANG.ng, LANG.abbr);
const LANG_PROVIDES = [
  { provide: LOCALE_ID, useValue: LANG.abbr },
  { provide: NZ_I18N, useValue: LANG.zorro },
  { provide: NZ_DATE_LOCALE, useValue: LANG.date },
  { provide: DELON_LOCALE, useValue: LANG.delon },
];

const I18NSERVICE_PROVIDES = [
  { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false }
];
// #region
const FORM_MODULES = [ JsonSchemaModule ];
// #endregion
const INTERCEPTOR_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true},
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true}
];
// #endregion

// #region global third module
const GLOBAL_THIRD_MODULES: Array<Type<void>> = [];
// #endregion
export function StartupServiceFactory(startupService: StartupService): () => Observable<void> {
  return () => startupService.load();
}
const APPINIT_PROVIDES = [
  StartupService,
  {
    provide: APP_INITIALIZER,
    useFactory: StartupServiceFactory,
    deps: [StartupService, KeycloakService],
    multi: true
  }
];
// #endregion

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'test',
        clientId: 'angular'
      },
      initOptions: {
        onLoad: 'check-sso',
        flow: 'implicit',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
    }).catch(reason => {
      console.error(reason)
    });
}

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GlobalConfigModule.forRoot(),
    CoreModule,
    SharedModule,
    LayoutModule,
    RoutesModule,
    STWidgetModule,
    NzMessageModule,
    NzNotificationModule,
    ...FORM_MODULES,
    ...GLOBAL_THIRD_MODULES
  ],
  providers: [
    ...LANG_PROVIDES,
    ...INTERCEPTOR_PROVIDES,
    ...I18NSERVICE_PROVIDES,
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    ...APPINIT_PROVIDES,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
