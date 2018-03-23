import { MovieDetailsComponent } from './Movie/movie-details/movie-details.component';
import { EditGuard } from "./edit.guard";
import { AuthGuard } from "./auth.guard";
import { MovieCartResolver } from "./resolvers/movie-cart-resolver";
import { MovieListResolver } from "./resolvers/movie-list-resolver";
import { MovieEditResolver } from "./resolvers/movie-edit-resolver";
import { Routes } from "@angular/router";
import { MovieComponent } from "./Movie/Movie.component";
import { MovieEditComponent } from "./Movie/movie-edit/movie-edit.component";
import { MovieAddComponent } from "./Movie/movie-add/movie-add.component";
import { MovieCartComponent } from "./Movie/movie-cart/movie-cart.component";
import { FavoritesComponent } from './Movie/favorites/favorites.component';

export const appRoutes: Routes = [
  {
    path: "",
    component: MovieComponent,
    resolve: { movies: MovieListResolver }
  },
  {
    path: "edit/:id",
    component: MovieEditComponent,
    resolve: { movie: MovieEditResolver },
    canActivate: [EditGuard]
  },
  {
    path: "cart",
    component: MovieCartComponent,
    resolve: { cart: MovieListResolver },
    canActivate: [AuthGuard]
  },
  {
    path: "favorites",
    component: FavoritesComponent,
  },
  {
    path: "details/:id",
    component: MovieDetailsComponent,
    resolve: { movie: MovieEditResolver },
    canActivate : [AuthGuard]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];
