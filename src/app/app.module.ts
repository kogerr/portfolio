import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { WorkComponent } from './work/work.component';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { DataService } from './data.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselSlideComponent } from './carousel-slide/carousel-slide.component';
import { AboutComponent } from './about/about.component';
import { MetatagService } from './metatag.service';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PageNotFoundComponent,
    WorkComponent,
    PostPreviewComponent,
    HeaderComponent,
    FooterComponent,
    CarouselComponent,
    CarouselSlideComponent,
    AboutComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [DataService, MetatagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
