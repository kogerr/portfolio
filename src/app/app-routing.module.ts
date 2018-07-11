import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './post/post.component';
import { PageNotFoundComponent } from './not-found.component';
import { WorkComponent } from './work/work.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
    { path: 'work', component: WorkComponent },
    { path: 'work/:titleURL', component: PostComponent },
    { path: 'about', component: AboutComponent },
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
