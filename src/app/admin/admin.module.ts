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
import { PostlistComponent } from './postlist/postlist.component';
import { AuthGuard } from './auth-guard.service';
import { SlidelistComponent } from './slidelist/slidelist.component';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { AboutEditorComponent } from './about-editor/about-editor.component';
import { AddElementComponent } from './add-element/add-element.component';
import { EditorSectionComponent } from './about-editor/editor-section/editor-section.component';
import { RegistrationComponent } from './registration/registration.component';
import { ImagesSectionComponent } from './about-editor/images-section/images-section.component';
import { EmailListComponent } from './email-list/email-list.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [EditorComponent, LoginComponent, LogComponent,
    TitleValidatorDirective, MenuComponent, PostlistComponent, SlidelistComponent,
    ContactEditorComponent, AboutEditorComponent, AddElementComponent, EditorSectionComponent,
    RegistrationComponent, ImagesSectionComponent, EmailListComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }, DataService, AuthService, AuthGuard, AdminDataService]
})
export class AdminModule { }
