import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';
import { LogComponent } from './log/log.component';
import { MenuComponent } from './menu/menu.component';
import { PostlistComponent } from './postlist/postlist.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'editor', component: EditorComponent, canActivate: [AuthGuard]},
  { path: 'editor/:titleURL', component: EditorComponent, canActivate: [AuthGuard] },
  { path: 'postlist', component: PostlistComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'log', component: LogComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
