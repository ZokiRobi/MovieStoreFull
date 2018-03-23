import { AlertifyService } from "./../../services/alertify.service";
import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import * as _ from "underscore";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"]
})
export class FavoritesComponent implements OnInit {
  favoriteMovies = [];
  userId;
  constructor(
    private movieService: MovieService,
    private auth: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.movieService.getFavoriteMovies(this.auth.getId()).subscribe(res => {
      this.favoriteMovies = res;
    });
    this.userId = this.auth.getId();
  }

  removeFromFavorites(id) {
    const movie = _.find(this.favoriteMovies, { id: id });
    this.movieService
      .removeFromFavorites(movie, this.userId)
      .subscribe(res => {});
    this.alertify.notify(movie.name + " removed from favorites.");
    this.favoriteMovies.splice(_.findIndex(this.favoriteMovies, { id: id }),1);
  }
}
