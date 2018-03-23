import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Movie } from './../Models/Movie';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MovieService } from '../services/movie.service';


@Injectable()
export class MovieCartResolver implements Resolve<Movie[]> {
    resolve(route: ActivatedRouteSnapshot) : Observable<Movie[]> {
        return this.movieService.getMoviesInCart()
        .catch(e => {
            return Observable.of(null);
        })
    }

    constructor(private movieService: MovieService ){}
}