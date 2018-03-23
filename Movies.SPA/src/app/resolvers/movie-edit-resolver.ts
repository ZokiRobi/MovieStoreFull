import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Movie } from './../Models/Movie';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MovieService } from '../services/movie.service';


@Injectable()
export class MovieEditResolver implements Resolve<Movie> {
    resolve(route: ActivatedRouteSnapshot) : Observable<Movie> {
        return this.movieService.getMovie(route.params['id'])
        .catch(e => {
            return Observable.of(null);
        })
    }

    constructor(private movieService: MovieService ){}
}