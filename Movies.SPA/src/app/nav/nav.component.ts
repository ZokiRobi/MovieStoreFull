import { MovieListResolver } from './../resolvers/movie-list-resolver';
import { PaginatedResult } from './../Models/pagination';
import { Pagination } from './../Models/Pagination';
import { MovieComponent } from "./../Movie/Movie.component";
import { Observable } from "rxjs/Observable";
import { Router, ActivatedRoute } from "@angular/router";
import { Http, RequestOptions } from "@angular/http";
import { Movie } from "./../Models/Movie";
import { AuthService } from "./../services/auth.service";
import { Component, OnInit, Input } from "@angular/core";
import { AlertifyService } from "../services/alertify.service";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FileUploader, FileItem } from "ng2-file-upload";
import { MovieService } from "../services/movie.service";
import { Headers } from "@angular/http";
import { Photo } from "../Models/Photo";
import { BsDatepickerConfig } from "ngx-bootstrap";
import * as _ from "underscore";
import { BehaviorSubject } from "rxjs";
import { appRoutes } from "../routes";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  loginModel: any = {};
  logginUsername;
  registerModel: any = {};
  years = [];
  loggedIn: boolean;
  register = false;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  routes = appRoutes;
  isAdmin;
  genres: Array<string> = [
    "Action",
    "Comedy",
    "Thriller",
    "Science-Fiction",
    "Adventure",
    "Fantasy"
  ];
  moviesInCart = [];
  bsConfig: Partial<BsDatepickerConfig>;
  addMovieForm: FormGroup;
  fileItem: FileItem;
  sum: number = 0;
  constructor(
    public auth: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private movieService: MovieService,
    private http: Http,
    private router: Router,
    private root: ActivatedRoute
  ) {}

  ngOnInit() {
    this.checkIfLoggedIn();
    this.movieService.currentMoviePrice.subscribe(m => {
      this.sum += m;
    });
    this.movieService.getMoviesInCart().subscribe(res => {
      const cart = res.json();
      cart.forEach(element => {
        this.sum += element.price;
      });
    });
    this.auth.isAdminObservable.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });  
  }

  checkIfLoggedIn() {
    var token = localStorage.getItem("token");
    if (!!token) {
      this.loggedIn = true;
      this.logginUsername = this.auth.getName();
    }
  }

  login(form: any) {
    this.auth.login(this.loginModel).subscribe(
      data => {
        this.alertify.success("Logged in successfully");
        this.checkIfLoggedIn();
        this.auth.userHasLoggedIn(true);
        this.router.resetConfig(this.routes);
      },
      e => {
        this.alertify.error(e);
      }
    );
    this.loginModel = {};
  }

  logout() {
    this.auth.userToken = null;
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    this.alertify.notify("Logged Out");
    this.loggedIn = false;
    this.logginUsername = "";
    this.movieService.clearCart().subscribe(movies => {
      this.sum = 0;
      this.resetCart();
    });
    this.auth.userHasLoggedIn(false);

  }

  resetCart() {
    let resetRoutes = this.routes;
    resetRoutes[0] = {
      path: "",
      component: MovieComponent,
      resolve: { movies: MovieListResolver }
    };
    this.router.resetConfig(resetRoutes);
    this.router.navigate([""]);
  }

  registerMode() {
    this.register = !this.register;
  }
  registerUser() {
    this.auth.register(this.registerModel).subscribe(
      resp => {
        this.alertify.success("Registred in succesfully");
      },
      e => {
        if (e) this.alertify.error(e);
      },
      () => {
        this.auth.login(this.registerModel).subscribe(() => {
          this.logginUsername = this.auth.getName();
          this.loggedIn = true;
          this.registerModel = {};
          this.auth.userHasLoggedIn(true);
          this.router.resetConfig(this.routes);
        });
      }
    );
  }
}
