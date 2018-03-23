import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { FavoritesComponent } from './Movie/favorites/favorites.component';
import { SafePipePipe } from './safe-pipe.pipe';
import { MovieDetailsComponent } from './Movie/movie-details/movie-details.component';
import { EditGuard } from './edit.guard';
import { AuthGuard } from './auth.guard';
import { MovieCartResolver } from './resolvers/movie-cart-resolver';
import { AlertifyService } from "./services/alertify.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { BsDropdownModule } from "ngx-bootstrap";
import { SelectModule } from "ng2-select";
import { AppComponent } from "./app.component";
import { MovieComponent } from "./Movie/Movie.component";
import { MovieEditComponent } from "./Movie/movie-edit/movie-edit.component";
import { PaginationModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import { HttpModule } from "@angular/http";
import { NavComponent } from "./nav/nav.component";
import { AuthService } from "./services/auth.service";
import { RegisterComponent } from "./register/register.component";
import { MovieCardComponent } from "./Movie/movie-card/movie-card.component";
import { FileUploadModule } from "ng2-file-upload";
import { MovieService } from "./services/movie.service";
import { BsDatepickerModule } from "ngx-bootstrap";
import { RatingModule } from "ngx-bootstrap";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./routes";
import { MovieEditResolver } from "./resolvers/movie-edit-resolver";
import { CarouselModule } from 'ngx-bootstrap';
import { MovieListResolver } from "./resolvers/movie-list-resolver";
import { MovieAddComponent } from "./Movie/movie-add/movie-add.component";
import { MovieCartComponent } from "./Movie/movie-cart/movie-cart.component";
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { ShortPipe } from './short.pipe';
import { provideAuth } from 'angular2-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    NavComponent,
    RegisterComponent,
    MovieCardComponent,
    MovieEditComponent,
    MovieAddComponent,
    MovieCartComponent,
    MovieDetailsComponent,
    SafePipePipe,
    ShortPipe,
    FavoritesComponent,
    AuthComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    SelectModule,
    ReactiveFormsModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    RatingModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    NgxImageGalleryModule,
    AuthModule
  ],
  providers: [AuthService,
     AlertifyService, 
     MovieService, 
     MovieEditResolver, 
     MovieListResolver,
     AuthGuard,
     EditGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
