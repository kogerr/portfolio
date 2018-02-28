import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './post.component';
import { PageNotFoundComponent } from './not-found.component';
import { WorkComponent } from './work.component';
import { EditorComponent } from './editor.component';

const appRoutes: Routes = [
    { path: 'editor', component: EditorComponent },
    { path: 'work', component: WorkComponent },
    { path: 'work/:id', component: PostComponent },
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
