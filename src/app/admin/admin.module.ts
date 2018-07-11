import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './token.interceptor';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { LogComponent } from './log/log.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  declarations: [EditorComponent, LoginComponent, LogComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, DataService, AuthService]
})
export class AdminModule { }
