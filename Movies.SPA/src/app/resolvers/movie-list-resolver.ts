import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Movie } from './../Models/Movie';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MovieService } from '../services/movie.service';


@Injectable()
export class MovieListResolver implements Resolve<Movie[]> {
    pageSize = 8;
    pageNumber = 1;
    resolve(route: ActivatedRouteSnapshot) : Observable<Movie[]> {
        return this.movieService.getMovies(this.pageNumber,this.pageSize)
        .catch(e => {
            return Observable.of(null);
        })
    }

    constructor(private movieService: MovieService ){}
}