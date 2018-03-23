import { PaginatedResult } from "./../Models/pagination";

import { EventEmitter } from "@angular/core";
import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";
import { tokenNotExpired, JwtHelper, AuthHttp } from "angular2-jwt";
import { Movie } from "../Models/Movie";
import { Output } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as _ from "underscore";
import { User } from "../Models/User";
import { environment } from "../../environments/environment.prod";

@Injectable()
export class MovieService {
  url = environment.apiUrl;
  userToken: any;
  decodedToken;
  jwtHelper: JwtHelper = new JwtHelper();
  moviePrice = new BehaviorSubject<number>(0);
  currentMoviePrice = this.moviePrice.asObservable();
  private movie = new BehaviorSubject<Movie>(new Movie());
  currentMovie = this.movie.asObservable();
  moviesForCart: Movie[] = [];

  public paginatedResult: PaginatedResult<Movie[]> = new PaginatedResult<
    Movie[]
  >();
  constructor(private http: AuthHttp,private coreHttp: Http) {}


  addMovieToFavorite(mId:number,uId:number){
    return this.http.get(this.url + "movie/AddToFavorites"+"?movieId="+mId + "&userId=" + uId,this.setHeaders())
    .map(res => res.json()).catch(this.handleError);
  }

  checkIsMovieInFavorites(movie,userId){
    return this.http.get(this.url + "movie/checkIsMovieInFavorites/" + "?movieId=" + movie.id + "&userId="+userId,this.setHeaders())
    .map(res => res.json()).catch(this.handleError);
  }

  removeFromFavorites(movie,userId){
    return this.http.get(this.url + "movie/removeFromFavorites/" + "?movieId=" + movie.id + "&userId="+userId,this.setHeaders())
    .map(res => res.json()).catch(this.handleError);
  }

  getFavoriteMovies(userId){
    return this.http.get(this.url + "movie/favoriteMovies/" + "?userId="+userId,this.setHeaders())
    .map(res => res.json()).catch(this.handleError);
  }

  sendMoviePrice(price) {
    this.moviePrice.next(price);
  }
  moviesForCartList() {
    return this.moviesForCart;
  }
  addMovieToCart(movie) {
    this.moviesForCart.push(movie);
    this.http
      .post(this.url + "movie/addToCart/" + movie.id, {}, this.setHeaders())
      .subscribe();
  }

  getTrailer(movieName) {
    return this.http.get(this.url + "search/" + "?movieName=" + movieName + " trailer").map(res => res.json());
  }
  removeMovieFromCart(movie) {
    let index = _.findIndex(this.moviesForCart, { id: movie.id });
    this.moviesForCart.splice(index, 1);
    this.http
      .post(this.url + "movie/removeFromCart/" + movie.id, {}, this.setHeaders())
      .subscribe();
  }

  getMoviesInCart() {
    return this.http.get(this.url + "movie/moviesInCart", this.setHeaders());
  }

  clearCart(page?: number, itemsPerPage?: number) {
    this.moviesForCart = [];
    
    return this.http
      .get(this.url + "movie/clearCart", this.setHeaders())
      .map(res => res.json());
  }

  addMovie(movie): Observable<Movie> {
    return this.http
      .post(this.url + "movie/addMovieWithoutPhoto", movie, this.setHeaders())
      .map(res => <Movie>res.json())
      .catch(this.handleError);
  }
  editMovie(id: number, movie) {
    return this.http
      .put(this.url + "movie/" + id, movie, this.setHeaders())
      .map(res => res.json())
      .catch(this.handleError);
  }
  getMovie(id): Observable<Movie> {
    return this.http
      .get(this.url + "movie/" + id)
      .map(response => <Movie>response.json())
      .catch(this.handleError);
  }

  getDescription(movie: Movie) {
    let movieDescription = "";
    let apiURl = "http://www.omdbapi.com/?apikey=b9d8e1de&t=" + movie.name;
    return this.coreHttp.get(apiURl).map(res => res.json());
  }
  getPhotos(movie: Movie) {
    let movieDescription = "";
    let apiURl = "http://img.omdbapi.com/?apikey=b9d8e1de&t=" + movie.name;
    return this.http.get(apiURl).map(res => res.json());
  }

  getMovies(page?: number, itemsPerPage?: number, movieParams?: any) {
    let queryString = "?";

    if (page != null && itemsPerPage != null) {
      queryString += "pageNumber=" + page + "&pageSize=" + itemsPerPage;
    }
    if (movieParams != null) {
      queryString +=
        "&name=" +
        movieParams.name +
        "&genre=" +
        movieParams.genre +
        "&orderBy=" +
        movieParams.orderBy;
    }
    return this.http
      .get(this.url + "movie/" + queryString)
      .map((response: Response) => {
        this.paginatedResult.result = response.json();
        if (response.headers.get("Pagination") != null) {
          this.paginatedResult.pagination = JSON.parse(
            response.headers.get("Pagination")
          );
        }

        return this.paginatedResult;
      })
      .catch(this.handleError);
  }

  deleteMovie(id) {
    return this.http
      .delete(this.url + "movie/" + id, this.setHeaders())
      .map(response => response.json())
      .catch(this.handleError);
  }

  setMainPhoto(movieId, photoId) {
    return this.http
      .post(
        this.url + "movie/" + movieId + "/" + "setMain/" + photoId,
        {},
        this.setHeaders()
      )
      .map(response => response.json())
      .catch(this.handleError);
  }

  deletePhoto(photoId, movieId) {
    return this.http
      .delete(
        this.url + "movie/" + movieId + "/deletePhoto/" + photoId,
        this.setHeaders()
      )
      .catch(this.handleError);
  }

  private setHeaders() {
    const headers = new Headers({ "Content-Type": "application/json" });
    return new RequestOptions({ headers: headers });
  }

  private handleError(error: any) {
    const applicationEror = error.headers.get("Application-Error");
    if (applicationEror) {
      return Observable.throw(applicationEror);
    }

    const serverError = error.json();
    let modelStateErrors = "";
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + "\n";
        }
      }
    }
    return Observable.throw(modelStateErrors || "Server error");
  }
}
