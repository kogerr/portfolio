import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './post/post.component';
import { PageNotFoundComponent } from './not-found.component';
import { WorkComponent } from './work/work.component';
import { EditorComponent } from './editor/editor.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: 'editor', component: EditorComponent },
    { path: 'editor/:titleURL', component: EditorComponent },
    { path: 'work', component: WorkComponent },
    { path: 'work/:titleURL', component: PostComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/work', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { enableTracing: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
