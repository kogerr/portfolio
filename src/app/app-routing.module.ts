import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './post.component';
import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
    { path: 'new-post', component: PostComponent },
    { path: '', redirectTo: '/new-post', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
