import { Observable } from 'rxjs/Rx';
import { AlertifyService } from './../../services/alertify.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";
import { Movie } from "../../Models/Movie";
import { MovieService } from "../../services/movie.service";
import * as _ from "underscore";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: "app-movie-cart",
  templateUrl: "./movie-cart.component.html",
  styleUrls: ["./movie-cart.component.css"]
})
export class MovieCartComponent implements OnInit {
  movies: Movie[];
  orderModel: any = {};
  constructor(
    private moviesService: MovieService,
    private root: ActivatedRoute,
    private alertify: AlertifyService,
    private router: Router
  ) {}
  ngOnInit() {

  }
  ngAfterViewInit() {
    this.moviesService.getMoviesInCart().subscribe(res => {
      this.movies = res.json();
    });
  }

  calculateTotalPrice(){
      let total = 0;
      this.movies.forEach((movie) => {
        total += movie.price;
      });
      return total;
  }

  removeFromCart(id) {
    let movieIndex = _.findIndex(this.movies, { id: id });
    this.alertify.notify(this.movies[movieIndex].name +" removed from cart.");
    let price = this.movies[movieIndex].price;
    this.moviesService.sendMoviePrice(-price);
    this.moviesService.removeMovieFromCart(this.movies[movieIndex]);
    this.movies.splice(movieIndex, 1);
  }
  order(){
    this.moviesService.clearCart().subscribe(() => {
      this.alertify.success("Ordered successfully.");
      this.orderModel = {};
      this.moviesService.clearCart();
      this.moviesService.sendMoviePrice(-this.calculateTotalPrice());
      this.router.navigate([""]);
    });
  }
}
