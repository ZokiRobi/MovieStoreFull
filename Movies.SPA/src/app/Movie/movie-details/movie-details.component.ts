import { AlertifyService } from "./../../services/alertify.service";
import { AuthService } from "./../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Movie } from "../../Models/Movie";
import { MovieService } from "../../services/movie.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.css"]
})
export class MovieDetailsComponent implements OnInit {
  loggedIn = false;
  userId;
  admin = false;
  movie;
  movieInfo: any;
  trailer = "http://www.youtube.com/embed/";
  favoriteMovie;
  constructor(
    private root: ActivatedRoute,
    private movieService: MovieService,
    private auth: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.root.data.subscribe(data => {
      this.movie = data["movie"];
      this.userId = this.auth.getId();
      this.getTrailer();
      this.movieService
        .checkIsMovieInFavorites(this.movie,this.userId)
        .subscribe(res => (this.favoriteMovie = res));
        if (this.movie != null) {
          this.movieService.getDescription(this.movie).subscribe(info => {
            this.movieInfo = info;
          });
    
        }
        
    });
    

    this.auth.userLogged.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.auth.isAdminObservable.subscribe(isAdmin => {
      this.admin = isAdmin;
    });
   
  }

  getImages() {
    let imgUrls = [];
    for (let i = 0; i < this.movie.photos.length; i++) {
      imgUrls.push({
        url: this.movie.photos[i].url + "?w-1200",
        altText: this.movie.name,
        title: this.movie.name,
        thumbnailUrl: this.movie.photos[i].url + "?w-60"
      });
    }
    return imgUrls;
  }

  getTrailer() {
    this.movieService.getTrailer(this.movie.name).subscribe(res => {
      this.trailer += res[0];
    });
  }

  buyMovie() {
    this.movie.inCart = true;
    this.movieService.addMovieToCart(this.movie);
    this.movieService.sendMoviePrice(this.movie.price);
    this.alertify.success(this.movie.name + " added to cart.");
  }
  removeFromCart() {
    this.movieService.removeMovieFromCart(this.movie);
    this.movie.inCart = false;
    this.movieService.sendMoviePrice(-this.movie.price);
    this.alertify.notify(this.movie.name + " removed from cart.");
  }

  addToFavorites() {
    this.favoriteMovie = true;
    this.movieService
      .addMovieToFavorite(this.movie.id, this.userId)
      .subscribe(res => {
      });
    this.alertify.success(this.movie.name + " added to favorites.");
  }
  removeFromFavorites() {
    this.favoriteMovie = false;
    this.movieService.removeFromFavorites(this.movie,this.userId).subscribe((res) => {
    });
    this.alertify.notify(this.movie.name + " removed from favorites.");
  }
}
