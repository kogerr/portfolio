import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationInterceptor } from './auth.interceptor';
import { DataService } from '../data.service';
import { AdminDataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { LogComponent } from './log/log.component';
import { TitleValidatorDirective } from './title.validator';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [EditorComponent, LoginComponent, LogComponent, TitleValidatorDirective, MenuComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }, DataService, AuthService, AdminDataService]
})
export class AdminModule { }
