import { Pagination, PaginatedResult } from './../Models/pagination';
import { AuthService } from './../services/auth.service';
import { EventEmitter } from '@angular/core';
import { AlertifyService } from './../services/alertify.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
import { Movie } from '../Models/Movie';
import { MovieService } from '../services/movie.service';
import * as _ from "underscore";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Movie',
  templateUrl: './Movie.component.html',
  styleUrls: ['./Movie.component.css']
})
export class MovieComponent implements OnInit {

  admin;
  movies: Movie[];
  addingMode;
  pagination: Pagination;
  movieParams: any = {};
  genres: Array<string> = [
    "Action",
    "Comedy",
    "Thriller",
    "Science-Fiction",
    "Adventure",
    "Fantasy"
  ];
  constructor(private movieService: MovieService, private route: ActivatedRoute, private alertify: AlertifyService, private auth: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
        this.movies = data['movies'].result;
        this.pagination = data['movies'].pagination;
    });
    this.auth.isAdminObservable.subscribe( isAdmin => this.admin = isAdmin);
    this.movieParams.genre = '';
    this.movieParams.name = '';
    this.movieParams.orderBy = 'year'
  }

  loadMovies(){
    this.movieService.getMovies(this.pagination.currentPage,this.pagination.itemsPerPage,this.movieParams)
    .subscribe((res: PaginatedResult<Movie[]> )=> {
        this.movies = res.result;
        this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }
  
  searchByGenre(){
      if(this.movieParams.genre === "Select Genre")
        this.movieParams.genre = '';
      this.loadMovies();
  }

  searchByName(){
    this.loadMovies();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMovies();
  }

  movieAddedToCart(movie){
    let index = _.findIndex(this.movies,{id:movie.id});
    this.movies[index].inCart = true;
  }

  newMovie(movie){
    this.loadMovies();
    this.toggleAdd();
    this.alertify.success("New movie created.");
  }

  getMovies(){
    this.movieService.getMovies().subscribe(res => {
        this.movies = res;
    });
  }
  deleteMovie(movie:Movie){
    this.movies.splice(_.findIndex(this.movies,{id: movie.id}),1);
  }
  toggleAdd(){
    this.addingMode = !this.addingMode;
  }
}
