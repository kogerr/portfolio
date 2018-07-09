import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { WorkComponent } from './work/work.component';
import { EditorComponent } from './editor/editor.component';
import { PageNotFoundComponent } from './not-found.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { DataService } from './data.service';
import { TitleValidatorDirective } from './title.validator';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselSlideComponent } from './carousel-slide/carousel-slide.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { MetatagService } from './metatag.service';
import { LogComponent } from './log/log.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PageNotFoundComponent,
    WorkComponent,
    EditorComponent,
    PostPreviewComponent,
    TitleValidatorDirective,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    CarouselSlideComponent,
    AboutComponent,
    LoginComponent,
    LogComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [DataService, AuthService, MetatagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
