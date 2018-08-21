import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';
import { LogComponent } from './log/log.component';
import { MenuComponent } from './menu/menu.component';
import { PostlistComponent } from './postlist/postlist.component';
import { AuthGuard } from './auth-guard.service';
import { SlidelistComponent } from './slidelist/slidelist.component';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { AboutEditorComponent } from './about-editor/about-editor.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'about-editor', component: AboutEditorComponent, canActivate: [AuthGuard]},
  { path: 'contact-editor', component: ContactEditorComponent, canActivate: [AuthGuard]},
  { path: 'editor', component: EditorComponent, canActivate: [AuthGuard]},
  { path: 'editor/:titleURL', component: EditorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'log', component: LogComponent, canActivate: [AuthGuard] },
  { path: 'postlist', component: PostlistComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegistrationComponent },
  { path: 'slidelist', component: SlidelistComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
