import { AuthService } from "./../../services/auth.service";
import { Router } from "@angular/router";
import { AlertifyService } from "./../../services/alertify.service";
import {
  Component,
  OnInit,
  Input,
  Output,
  HostListener,
  ViewChildren
} from "@angular/core";
import { Movie } from "../../Models/Movie";
import { MovieService } from "../../services/movie.service";
import { EventEmitter } from "@angular/core";
import { ViewChild } from "@angular/core";
import { QueryList } from "@angular/core";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.css"]
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie;
  @Output() movieDeleted: EventEmitter<Movie> = new EventEmitter();
  @Output() movieInCart: EventEmitter<Movie> = new EventEmitter();
  loggedIn = false;
  admin = false;
  ifNotLoggedIn = {
    'display': 'none'
  };

  constructor(
    private movieService: MovieService,
    private auth: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.userLogged.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.auth.isAdminObservable.subscribe(isAdmin => {
      this.admin = isAdmin;
    });
  }
  ngAfterViewInit() {}

  deleteMovie(id: number) {
    this.alertify.confirm(
      "Are u sure u want to delete this movie ?",
      "Confirm Movie Deletion",
      () => {
        this.movieService.deleteMovie(id).subscribe(
          () => {},
          () => {
            this.movieDeleted.emit(this.movie);
            this.alertify.success("Movie has been deleted");
          }
        );
      }
    );
  }
  buyMovie(movie) {
    movie.movieInCart = true;
    this.movieInCart.emit(movie);
    this.movieService.sendMoviePrice(movie.price);
    this.movieService.addMovieToCart(movie);
    this.alertify.success(movie.name + " added to cart.");
  }
}
