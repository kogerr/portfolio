import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PostComponent } from './post.component';
import { WorkComponent } from './work.component';
import { EditorComponent } from './editor.component';
import { PageNotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [ AppComponent, PostComponent, PageNotFoundComponent, WorkComponent, EditorComponent ],
  imports: [ BrowserModule, AppRoutingModule, FormsModule, HttpClientModule ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
