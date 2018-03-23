webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/Models/Movie.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Movie; });
var Movie = /** @class */ (function () {
    function Movie() {
    }
    return Movie;
}());



/***/ }),

/***/ "../../../../../src/app/Models/pagination.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaginatedResult; });
var PaginatedResult = /** @class */ (function () {
    function PaginatedResult() {
    }
    return PaginatedResult;
}());



/***/ }),

/***/ "../../../../../src/app/Movie/Movie.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input[type=search]::-webkit-search-cancel-button {\r\n    -webkit-appearance: searchfield-cancel-button;\r\n}\r\n.form-control{\r\n    font-size: 21px;\r\n    padding: 4px 5px;\r\n}\r\nlabel{\r\n    margin-right: 4px;\r\n    font-size: 1.3em;\r\n}\r\ndiv.form-group{\r\n    margin-right: 5px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/Movie/Movie.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-xs-12 col-sm-12 col-md-9 col-lg-8\">\n            <button class=\"btn btn-success\" (click)=\"toggleAdd()\" *ngIf=\"!addingMode\" [ngStyle]=\"{display: admin ? 'inline-block': 'none'}\">Add Movie</button>\n            <div style=\"display:inline-block;margin-left:20px\" *ngIf=\"!addingMode\">\n                <form class=\"form-inline\" #form=\"ngForm\">\n                    <div class=\"form-group\">\n                        <label for=\"name\">Search:</label>\n                        <input type=\"search\" class=\"form-control\" name=\"name\" [(ngModel)]=\"movieParams.name\" (ngModelChange)=\"searchByName()\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"genre\">Genre:</label>\n                        <select class=\"form-control\" (change)=\"searchByGenre()\" [(ngModel)]=\"movieParams.genre\" name=\"genre\">\n                            <option selected>Select Genre</option>\n                            <option *ngFor=\"let genre of genres\" [value]=\"genre\">{{ genre }}</option>\n                        </select>\n                    </div>\n                </form>\n            </div>\n        </div>\n        <div class=\"col-xs-12 col-xs-offset-0 col-sm-6 col-sm-offset-3 col-md-3 col-md-offset-0 col-lg-4 col-lg-offset-0\">\n            <div class=\"pull-right\" *ngIf=\"!addingMode\">\n                <label for=\"\">Order By:</label>\n                <div class=\"btn-group\">\n                    <label class=\"btn btn-primary\" [(ngModel)]=\"movieParams.orderBy\" (click)=\"loadMovies()\" btnRadio=\"year\" name=\"orderBy\">Year</label>\n                    <label class=\"btn btn-primary\" [(ngModel)]=\"movieParams.orderBy\" (click)=\"loadMovies()\" btnRadio=\"price\" name=\"orderBy\">Price</label>\n                </div>\n            </div>\n        </div>\n\n\n\n    </div>\n    <div class=\"row\" *ngIf=\"!addingMode\">\n        <div class=\"col-lg-12 col-lg-offset-0 col-md-12 col-md-offset-1 col-sm-12 col-sm-offset-2 col-xs-12 col-xs-offset-2\">\n            <app-movie-card *ngFor=\"let movie of movies\" [movie]=\"movie\" (movieDeleted)=\"deleteMovie($event)\" (movieInCart)=\"movieAddedToCart(movie)\"></app-movie-card>\n        </div>\n        <div class=\"row text-center\">\n            <div class=\"col-xs-12\">\n                <pagination [boundaryLinks]=\"true\" [totalItems]=\"pagination?.totalItems\" [itemsPerPage]=\"pagination?.itemsPerPage\" [(ngModel)]=\"pagination.currentPage\"\n                    (pageChanged)=\"pageChanged($event)\" previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\" lastText=\"&raquo;\"></pagination>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\" *ngIf=\"addingMode\">\n        <app-movie-add (cancelAdd)=\"toggleAdd()\" (newMovie)=\"newMovie($event)\"></app-movie-add>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/Movie/Movie.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovieComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alertify_service__ = __webpack_require__("../../../../../src/app/services/alertify.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_movie_service__ = __webpack_require__("../../../../../src/app/services/movie.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MovieComponent = /** @class */ (function () {
    function MovieComponent(movieService, route, alertify, auth) {
        this.movieService = movieService;
        this.route = route;
        this.alertify = alertify;
        this.auth = auth;
        this.movieParams = {};
        this.genres = [
            "Action",
            "Comedy",
            "Thriller",
            "Science-Fiction",
            "Adventure",
            "Fantasy"
        ];
    }
    MovieComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.movies = data['movies'].result;
            _this.pagination = data['movies'].pagination;
        });
        this.auth.isAdminObservable.subscribe(function (isAdmin) { return _this.admin = isAdmin; });
        this.movieParams.genre = '';
        this.movieParams.name = '';
        this.movieParams.orderBy = 'year';
    };
    MovieComponent.prototype.loadMovies = function () {
        var _this = this;
        this.movieService.getMovies(this.pagination.currentPage, this.pagination.itemsPerPage, this.movieParams)
            .subscribe(function (res) {
            _this.movies = res.result;
            _this.pagination = res.pagination;
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    MovieComponent.prototype.searchByGenre = function () {
        if (this.movieParams.genre === "Select Genre")
            this.movieParams.genre = '';
        this.loadMovies();
    };
    MovieComponent.prototype.searchByName = function () {
        this.loadMovies();
    };
    MovieComponent.prototype.pageChanged = function (event) {
        this.pagination.currentPage = event.page;
        this.loadMovies();
    };
    MovieComponent.prototype.movieAddedToCart = function (movie) {
        var index = __WEBPACK_IMPORTED_MODULE_4_underscore__["findIndex"](this.movies, { id: movie.id });
        this.movies[index].inCart = true;
    };
    MovieComponent.prototype.newMovie = function (movie) {
        this.loadMovies();
        this.toggleAdd();
        this.alertify.success("New movie created.");
    };
    MovieComponent.prototype.getMovies = function () {
        var _this = this;
        this.movieService.getMovies().subscribe(function (res) {
            _this.movies = res;
        });
    };
    MovieComponent.prototype.deleteMovie = function (movie) {
        this.movies.splice(__WEBPACK_IMPORTED_MODULE_4_underscore__["findIndex"](this.movies, { id: movie.id }), 1);
    };
    MovieComponent.prototype.toggleAdd = function () {
        this.addingMode = !this.addingMode;
    };
    MovieComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'app-Movie',
            template: __webpack_require__("../../../../../src/app/Movie/Movie.component.html"),
            styles: [__webpack_require__("../../../../../src/app/Movie/Movie.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_movie_service__["a" /* MovieService */], __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_1__services_alertify_service__["a" /* AlertifyService */], __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a" /* AuthService */]])
    ], MovieComponent);
    return MovieComponent;
}());



/***/ }),

/***/ "../../../../../src/app/Movie/favorites/favorites.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "a{\r\n    text-decoration: none;\r\n}\r\nul  {\r\n    list-style: none;\r\n}\r\n.panel-image {\r\n    height: 270px;\r\n    overflow: hidden;\r\n    position: relative;\r\n  }\r\n.panel-image{\r\n    width: 100%;\r\n    height: 100%;\r\n  }\r\n.image{\r\n      height: 300px\r\n  }\r\n.panel.panel-default {\r\n    width: 240px;\r\n    height: auto;\r\n    display: inline-block;\r\n    margin: 4px;\r\n  }\r\ndiv.panel-body {\r\n    width: 240px;\r\n    height: 150%;\r\n  }\r\n.buttons {\r\n    margin-top: 5px;\r\n    position: relative;\r\n    left: 15px;\r\n  }\r\n.actions {\r\n    margin-top: 2px;\r\n    font-size: 1.3em;\r\n  }\r\nh4.text-primary {\r\n    margin-right: 5px;\r\n  }\r\n.svg-inline--fa.fa-ban.fa-w-16{\r\n    cursor:pointer;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/Movie/favorites/favorites.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <h1 *ngIf=\"favoriteMovies?.length else empty\">Your Favorite Movies</h1>\n  <div class=\"panel panel-default\" *ngFor=\"let movie of favoriteMovies\">\n    <div class=\"panel-body text-center\">\n      <div class=\"panel-image\">\n        <a [routerLink]=\"['/details',movie.id]\" routerLinkActive=\"router-link-active\" >\n          <img src=\"{{ movie.photoUrl ? movie.photoUrl : '../../../assets/img.png'}}\" alt=\"\" class=\"img-responsive center-block image\">\n        </a>\n      </div>\n      <div class=\"text-center\">\n        <h4 style=\"display:inline\" class=\"text-primary\">{{ movie.name}}</h4>\n        <small>\n          <b>{{ movie.yearOfRelease}}</b>\n        </small>\n\n        <p>{{ movie.genre }}</p>\n      </div>\n      <div>\n        <rating [max]=\"10\" [readonly]=\"true\" [(ngModel)]=\"movie.rating\" style=\"font-size:1.3em;color:rgb(0, 110, 255)\"></rating>\n      </div>\n      <a (click)=\"removeFromFavorites(movie.id)\">\n          <i class=\"fas fa-ban\"></i>\n        </a>\n    </div>\n  </div>\n  <ng-template #empty><h1>You have no favorites</h1></ng-template>"

/***/ }),

/***/ "../../../../../src/app/Movie/favorites/favorites.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alertify_service__ = __webpack_require__("../../../../../src/app/services/alertify.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_movie_service__ = __webpack_require__("../../../../../src/app/services/movie.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_underscore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FavoritesComponent = /** @class */ (function () {
    function FavoritesComponent(movieService, auth, alertify) {
        this.movieService = movieService;
        this.auth = auth;
        this.alertify = alertify;
        this.favoriteMovies = [];
    }
    FavoritesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.movieService.getFavoriteMovies(this.auth.getId()).subscribe(function (res) {
            _this.favoriteMovies = res;
        });
        this.userId = this.auth.getId();
    };
    FavoritesComponent.prototype.removeFromFavorites = function (id) {
        var movie = __WEBPACK_IMPORTED_MODULE_4_underscore__["find"](this.favoriteMovies, { id: id });
        this.movieService
            .removeFromFavorites(movie, this.userId)
            .subscribe(function (res) { });
        this.alertify.notify(movie.name + " removed from favorites.");
        this.favoriteMovies.splice(__WEBPACK_IMPORTED_MODULE_4_underscore__["findIndex"](this.favoriteMovies, { id: id }));
    };
    FavoritesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: "app-favorites",
            template: __webpack_require__("../../../../../src/app/Movie/favorites/favorites.component.html"),
            styles: [__webpack_require__("../../../../../src/app/Movie/favorites/favorites.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_movie_service__["a" /* MovieService */],
            __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alertify_service__["a" /* AlertifyService */]])
    ], FavoritesComponent);
    return FavoritesComponent;
}());



/***/ }),

/***/ "../../../../../src/app/Movie/movie-add/movie-add.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ng-select {\r\n  background-color: white;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/Movie/movie-add/movie-add.component.html":
/***/ (function(module, exports) {

module.exports = "  <div class=\"col-md-6 col md-offset-3\">\n    <form [formGroup]=\"addMovieForm\" (submit)=\"upload();addMovieForm.reset()\">\n      <div class=\"form-group\" [ngClass]=\"{'has-error': addMovieForm.get('name')?.errors && addMovieForm.get('name')?.touched}\">\n        <label for=\"moviename\">Name:</label>\n        <input type=\"text\" placeholder=\"Movie name\" class=\"form-control\" name=\"moviename\" formControlName=\"name\">\n        <span class=\"help-block\" *ngIf=\"addMovieForm.get('name')?.hasError('required') && addMovieForm.get('name')?.touched\">\n          Movie name is required\n        </span>\n      </div>\n      <div class=\"form-group\" [ngClass]=\"{'has-error': addMovieForm.get('genre')?.errors && addMovieForm.get('genre')?.touched}\">\n        <label for=\"genre\">Genre:</label>\n        <ng-select [items]=\"genres\" name=\"genre\" placeholder=\"Select Genre\" formControlName=\"genre\" class=\"custom\"></ng-select>\n        <span class=\"help-block\" *ngIf=\"addMovieForm.get('genre')?.hasError('required') && addMovieForm.get('genre')?.touched\">\n          Genre is required\n        </span>\n      </div>\n      <div class=\"form-group\" [ngClass]=\"{'has-error': addMovieForm.get('yearofrelease')?.errors && addMovieForm.get('yearofrelease')?.touched}\">\n        <label for=\"yearofrelease\">Release Date:</label>\n        <select formControlName=\"yearofrelease\" name=\"yearofrelease\" class=\"form-control\" style=\"width:100px\">\n          <option *ngFor=\"let year of years; let i = index\" value=\"{{years[i]}}\"> {{years[i] }}</option>\n        </select>\n        <span class=\"help-block\" *ngIf=\"addMovieForm.get('yearofrelease')?.hasError('required') && addMovieForm.get('yearofrelease')?.touched\">\n          Release date is required\n        </span>\n      </div>\n      <div class=\"form-group\" [ngClass]=\"{'has-error': addMovieForm.get('rating')?.errors && addMovieForm.get('rating')?.touched}\">\n        <label for=\"rating\">Rating:</label>\n        <rating formControlName=\"rating\" [max]=\"10\" style=\"font-size:2em\"></rating>\n        <span class=\"help-block\" *ngIf=\"addMovieForm.get('rating')?.hasError('required') && addMovieForm.get('rating')?.touched\">\n          Rating is required\n        </span>\n      </div>\n      <div class=\"form-group\">\n        <div ng2FileDrop [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\" (fileOver)=\"fileOverBase($event)\" [uploader]=\"uploader\"\n          class=\"well my-drop-zone\">\n          Drop Photos Here\n          <br>\n          <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" [disabled]=\"uploader?.queue?.length\" />\n          <div *ngIf=\"uploader?.queue?.length\">\n            <div>\n              <div>\n                <tbody>\n                  <tr *ngFor=\"let item of uploader.queue\">\n                    <td>\n                      <strong>{{ item?.file?.name }}</strong>\n                    </td>\n                  </tr>\n                </tbody>\n                <div class=\"progress\">\n                  <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': uploader.progress + '%' }\"></div>\n                </div>\n              </div>\n              <button type=\"button\" class=\"btn btn-danger btn-s\" (click)=\"uploader.clearQueue()\" [disabled]=\"!uploader.queue.length\">\n                <span class=\"glyphicon glyphicon-trash\"></span> Remove\n              </button>\n            </div>\n\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group\" [ngClass]=\"{'has-error': addMovieForm.get('price')?.errors && addMovieForm.get('price')?.touched}\">\n        <label for=\"genre\">Price:</label>\n        <input type=\"text\" formControlName=\"price\" name=\"price\" class=\"form-control\" style=\"width:100px\">\n        <span class=\"help-block\" *ngIf=\"addMovieForm.get('price')?.hasError('required') && addMovieForm.get('price')?.touched\">\n          Price is required\n        </span>\n      </div>\n\n      <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!addMovieForm.valid\">Add movie</button>\n      <button type=\"button\" class=\"btn btn-warning\" (click)=\"addMovieForm.reset({yearofrelease:2018});cancelAdding()\">Cancel</button>\n    </form>\n  </div>"

/***/ }),

/***/ "../../../../../src/app/Movie/movie-add/movie-add.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovieAddComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_movie_service__ = __webpack_require__("../../../../../src/app/services/movie.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_alertify_service__ = __webpack_require__("../../../../../src/app/services/alertify.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MovieAddComponent = /** @class */ (function () {
    function MovieAddComponent(fb, movieService, alertify) {
        this.fb = fb;
        this.movieService = movieService;
        this.alertify = alertify;
        this.cancelAdd = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.newMovie = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["EventEmitter"]();
        this.years = [];
        this.genres = [
            "Action",
            "Comedy",
            "Thriller",
            "Science-Fiction",
            "Adventure",
            "Fantasy"
        ];
    }
    MovieAddComponent.prototype.ngOnInit = function () {
        this.createAddMovieForm();
        this.initializeUploader();
        this.setYears();
    };
    MovieAddComponent.prototype.initializeUploader = function () {
        var _this = this;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_0_ng2_file_upload__["FileUploader"]({
            url: "http://localhost:5000/api/movie",
            authToken: "Bearer " + localStorage.getItem("token"),
            isHTML5: true,
            allowedFileType: ["image"],
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024,
            method: "POST"
        });
        this.uploader.onSuccessItem = function (item, response, status, heaeders) {
            if (response) {
                var movie = JSON.parse(response);
                _this.movieAdded(movie);
            }
        };
    };
    MovieAddComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    MovieAddComponent.prototype.cancelAdding = function () {
        this.cancelAdd.emit(false);
    };
    MovieAddComponent.prototype.movieAdded = function (movie) {
        this.newMovie.emit(movie);
    };
    MovieAddComponent.prototype.upload = function () {
        var _this = this;
        if (!this.uploader.queue.length) {
            var m = Object.assign({}, this.addMovieForm.value);
            m.genre = m.genre[0].text;
            this.movieService.addMovie(m).subscribe(function (res) {
                _this.alertify.success("Movie added.");
                _this.movie = Object.assign({}, res);
                var movie = {
                    id: res.id,
                    name: res.name,
                    genre: res.genre,
                    yearOfRelease: res.yearOfRelease,
                    price: res.price,
                    photoUrl: res.photoUrl,
                    photos: res.photos,
                    rating: res.rating
                };
                _this.movieAdded(_this.movie);
            });
        }
        else {
            this.uploader.onBuildItemForm = function (file, form) {
                form.append("name", _this.addMovieForm.get("name").value);
                form.append("genre", _this.addMovieForm.get("genre").value[0].text);
                form.append("yearofrelease", _this.addMovieForm.get("yearofrelease").value);
                form.append("rating", _this.addMovieForm.get("rating").value);
                form.append("price", _this.addMovieForm.get("price").value);
                return { file: file, form: form };
            };
            this.uploader.uploadAll();
        }
    };
    MovieAddComponent.prototype.createAddMovieForm = function () {
        this.addMovieForm = this.fb.group({
            name: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            genre: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            yearofrelease: ["2018", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            rating: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            price: ["", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
            file: [""]
        });
    };
    MovieAddComponent.prototype.setYears = function () {
        for (var i = 2018; i >= 1950; i--) {
            this.years.push(i);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], MovieAddComponent.prototype, "cancelAdd", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], MovieAddComponent.prototype, "newMovie", void 0);
    MovieAddComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: "app-movie-add",
            template: __webpack_require__("../../../../../src/app/Movie/movie-add/movie-add.component.html"),
            styles: [__webpack_require__("../../../../../src/app/Movie/movie-add/movie-add.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_3__services_movie_service__["a" /* MovieService */],
            __WEBPACK_IMPORTED_MODULE_4__services_alertify_service__["a" /* AlertifyService */]])
    ], MovieAddComponent);
    return MovieAddComponent;
}());



/***/ }),

/***/ "../../../../../src/app/Movie/movie-card/movie-card.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".panel-image {\r\n  height: 270px;\r\n  overflow: hidden;\r\n  position: relative;\r\n}\r\n.panel-image{\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n.image{\r\n    height: 300px\r\n}\r\n.panel.panel-default {\r\n  width: 240px;\r\n  height: auto;\r\n  display: inline-block;\r\n  margin: 4px;\r\n}\r\ndiv.panel-body {\r\n  width: 240px;\r\n  height: 150%;\r\n}\r\n.buttons {\r\n  margin-top: 5px;\r\n  position: relative;\r\n  left: 15px;\r\n}\r\n.actions {\r\n  margin-top: 2px;\r\n  font-size: 1.3em;\r\n}\r\nh4.text-primary {\r\n  margin-right: 5px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/Movie/movie-card/movie-card.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-body text-center\">\n    <div class=\"panel-image\">\n      <a [routerLink]=\"['/details', movie.id]\" routerLinkActive=\"router-link-active\">\n        <img src=\"{{ movie.photoUrl ? movie.photoUrl : '../../../assets/img.png'}}\" alt=\"\" class=\"img-responsive center-block image\">\n      </a>\n    </div>\n    <div class=\"text-center\">\n      <h4 style=\"display:inline\" class=\"text-primary\">{{ movie.name | short}}</h4>\n\n      <small>\n        <b>{{ movie.yearOfRelease}}</b>\n      </small>\n\n      <p>{{ movie.genre }}</p>\n    </div>\n    <div>\n      <rating [max]=\"10\" [readonly]=\"true\" [(ngModel)]=\"movie.rating\" style=\"font-size:1.3em;color:rgb(0, 110, 255)\"></rating>\n    </div>\n    <div class=\"buttons\">\n      Price: {{ movie.price }}\n      <i class=\"fa fa-dollar-sign\"></i>\n      <button class=\"btn btn-success btn-sm\" (click)=\"buyMovie(movie)\" [disabled]=\"movie.inCart \" [ngStyle]=\"{display : !loggedIn || admin ? 'none' : 'inline-block'}\">Buy\n        <i class=\"fa fa-shopping-cart\"></i>\n      </button>\n    </div>\n    <div class=\"panel-footer actions\" [ngStyle]=\"{display : !admin ? 'none' : 'block'}\">\n      <a [routerLink]=\"['/edit/', movie.id]\" routerLinkActive=\"router-link-active\">\n        <i class=\"fa fa-edit\"></i>\n      </a>\n      <a (click)=\"deleteMovie(movie.id)\">\n        <i class=\"fa fa-trash\"></i>\n      </a>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/Movie/movie-card/movie-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovieCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_alertify_service__ = __webpack_require__("../../../../../src/app/services/alertify.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Models_Movie__ = __webpack_require__("../../../../../src/app/Models/Movie.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_movie_service__ = __webpack_require__("../../../../../src/app/services/movie.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MovieCardComponent = /** @class */ (function () {
    function MovieCardComponent(movieService, auth, alertify, router) {
        this.movieService = movieService;
        this.auth = auth;
        this.alertify = alertify;
        this.router = router;
        this.movieDeleted = new __WEBPACK_IMPORTED_MODULE_3__angular_core__["EventEmitter"]();
        this.movieInCart = new __WEBPACK_IMPORTED_MODULE_3__angular_core__["EventEmitter"]();
        this.loggedIn = false;
        this.admin = false;
        this.ifNotLoggedIn = {
            'display': 'none'
        };
    }
    MovieCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.userLogged.subscribe(function (loggedIn) {
            _this.loggedIn = loggedIn;
        });
        this.auth.isAdminObservable.subscribe(function (isAdmin) {
            _this.admin = isAdmin;
        });
    };
    MovieCardComponent.prototype.ngAfterViewInit = function () { };
    MovieCardComponent.prototype.deleteMovie = function (id) {
        var _this = this;
        this.alertify.confirm("Are u sure u want to delete this movie ?", "Confirm Movie Deletion", function () {
            _this.movieService.deleteMovie(id).subscribe(function () { }, function () {
                _this.movieDeleted.emit(_this.movie);
                _this.alertify.success("Movie has been deleted");
            });
        });
    };
    MovieCardComponent.prototype.buyMovie = function (movie) {
        movie.movieInCart = true;
        this.movieInCart.emit(movie);
        this.movieService.sendMoviePrice(movie.price);
        this.movieService.addMovieToCart(movie);
        this.alertify.success(movie.name + " added to cart.");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__Models_Movie__["a" /* Movie */])
    ], MovieCardComponent.prototype, "movie", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__angular_core__["EventEmitter"])
    ], MovieCardComponent.prototype, "movieDeleted", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__angular_core__["EventEmitter"])
    ], MovieCardComponent.prototype, "movieInCart", void 0);
    MovieCardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
            selector: "app-movie-card",
            template: __webpack_require__("../../../../../src/app/Movie/movie-card/movie-card.component.html"),
            styles: [__webpack_require__("../../../../../src/app/Movie/movie-card/movie-card.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_movie_service__["a" /* MovieService */],
            __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__services_alertify_service__["a" /* AlertifyService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], MovieCardComponent);
    return MovieCardComponent;
}());



/***/ }),

/***/ "../../../../../src/app/Movie/movie-cart/movie-cart.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/Movie/movie-cart/movie-cart.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-5\">\n      <table class=\"table table-striped\" *ngIf=\"movies?.length else alt\">\n        <tr>\n          <th>Movie Name</th>\n          <th>Genre</th>\n          <th >Release Date</th>\n          <th>Price</th>\n        </tr>\n        <tr *ngFor=\"let movie of movies\">\n          <td>{{ movie.name }}</td>\n          <td>{{ movie.genre }}</td>\n          <td>{{ movie.yearOfRelease }}</td>\n          <td>{{ movie.price }}</td>\n          <td>\n            <button class=\"btn btn-warning btn-sm\" (click)=\"removeFromCart(movie.id)\">Remove From cart</button>\n          </td>\n        </tr>\n        <tr>\n          <a (click)=\"checkout.show()\" class=\"btn btn-success\">Checkout</a>\n        </tr>\n      </table>\n      <ng-template #alt>There are no movies in cart.</ng-template>\n    </div>\n  </div>\n  <div bsModal #checkout=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <h4 class=\"modal-title pull-left\">Enter shipping details</h4>\n          <button type=\"button\" class=\"close pull-right\" (click)=\"checkout.hide()\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n          </button>\n        </div>\n        <div class=\"modal-body\">\n          <form #orderForm=\"ngForm\" (ngSubmit)=\"order()\">\n            <div class=\"form-group\">\n              <input type=\"text\" placeholder=\"Firt Name\" class=\"form-control\" name=\"firstName\" required [(ngModel)]=\"orderModel.firstName\">\n            </div>\n            <div class=\"form-group\">\n              <input type=\"text\" placeholder=\"Last Name\" class=\"form-control\" name=\"lastName\" required [(ngModel)]=\"orderModel.lastName\" >\n            </div>\n            <div class=\"form-group\">\n              <input type=\"text\" placeholder=\"Address\" class=\"form-control\" name=\"address\" required [(ngModel)]=\"orderModel.address\">\n            </div>\n            <div class=\"form-group\">\n              <input type=\"text\" placeholder=\"City\" class=\"form-control\" name=\"city\" required [(ngModel)]=\"orderModel.city\">\n            </div>\n            <div class=\"form-group\">\n              <input type=\"text\" placeholder=\"Phone\" class=\"form-control\" name=\"phone\" required [(ngModel)]=\"orderModel.phone\">\n            </div>\n            <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!orderForm.valid\" (click)=\"checkout.hide()\">Order</button>\n            <button type=\"button\" class=\"btn btn-warning\" (click)=\"checkout.hide();orderForm.reset()\">Cancel</button>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/Movie/movie-cart/movie-cart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovieCartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alertify_service__ = __webpack_require__("../../../../../src/app/services/alertify.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_movie_service__ = __webpack_require__("../../../../../src/app/services/movie.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_underscore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MovieCartComponent = /** @class */ (function () {
    function MovieCartComponent(moviesService, root, alertify, router) {
        this.moviesService = moviesService;
        this.root = root;
        this.alertify = alertify;
        this.router = router;
        this.orderModel = {};
    }
    MovieCartComponent.prototype.ngOnInit = function () {
    };
    MovieCartComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.moviesService.getMoviesInCart().subscribe(function (res) {
            _this.movies = res.json();
        });
    };
    MovieCartComponent.prototype.calculateTotalPrice = function () {
        var total = 0;
        this.movies.forEach(function (movie) {
            total += movie.price;
        });
        return total;
    };
    MovieCartComponent.prototype.removeFromCart = function (id) {
        var movieIndex = __WEBPACK_IMPORTED_MODULE_4_underscore__["findIndex"](this.movies, { id: id });
        this.alertify.notify(this.movies[movieIndex].name + " removed from cart.");
        var price = this.movies[movieIndex].price;
        this.moviesService.sendMoviePrice(-price);
        this.moviesService.removeMovieFromCart(this.movies[movieIndex]);
        this.movies.splice(movieIndex, 1);
    };
    MovieCartComponent.prototype.order = function () {
        var _this = this;
        this.moviesService.clearCart().subscribe(function () {
            _this.alertify.success("Ordered successfully.");
            _this.orderModel = {};
            _this.moviesService.clearCart();
            _this.moviesService.sendMoviePrice(-_this.calculateTotalPrice());
            _this.router.navigate([""]);
        });
    };
    MovieCartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: "app-movie-cart",
            template: __webpack_require__("../../../../../src/app/Movie/movie-cart/movie-cart.component.html"),
            styles: [__webpack_require__("../../../../../src/app/Movie/movie-cart/movie-cart.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_movie_service__["a" /* MovieService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_0__services_alertify_service__["a" /* AlertifyService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], MovieCartComponent);
    return MovieCartComponent;
}());



/***/ }),

/***/ "../../../../../src/app/Movie/movie-details/movie-details.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ngx-image-gallery {\r\n  height: 800px;\r\n}\r\n\r\n.svg-inline--fa.fa-w-18.favorite{\r\n  background-color: #222222;\r\n  color: yellow;\r\n  cursor:pointer;\r\n}\r\n\r\nimg.img-responsive{\r\n  width: 100%;\r\n  max-height: 555px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/Movie/movie-details/movie-details.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-xs-12 col-xs-offset-0 col-sm-12 col-sm-offset-2 col-md-6 col-md-offset-0\">\n      <carousel>\n        <slide *ngFor=\"let img of movie.photos;let i = index\">\n          <img src=\"{{ movie.photos[i].url }}\" alt=\"image\" class=\"img-responsive\">\n        </slide>\n      </carousel>\n    </div>\n\n    <div class=\"col-xs-12 col-sm-12 col-md-5\" style=\"margin-left:10px\">\n        <div class=\"embed-responsive embed-responsive-4by3\">\n            <iframe [src]=\"trailer | safe\" width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen></iframe>\n        </div>\n      <div class=\"text-center\">\n        <h2>{{ movie.name }}\n          <span (click)=\"addToFavorites()\" *ngIf=\"!favoriteMovie && loggedIn && !admin\">\n            <i class=\"far fa-star favorite\"></i>\n          </span>\n          <span (click)=\"removeFromFavorites()\" *ngIf=\"favoriteMovie && loggedIn && !admin\">\n              <i class=\"fas fa-star favorite\" ></i>\n          </span>\n        </h2>\n\n        <rating [max]=\"10\" [readonly]=\"true\" [(ngModel)]=\"movie.rating\" style=\"font-size:1.4em;color:rgb(0, 110, 255)\"></rating>\n        <p class=\"text-lead  text-center\">\n          {{ movieInfo?.Plot}}\n        </p>\n        <hr>\n        <p class=\"text-lead  text-center\">\n          Actors: {{ movieInfo?.Actors}}\n        </p>\n        <p class=\"text-lead  text-center\">\n          Duration: {{ movieInfo?.Runtime}}\n        </p>\n        Price: {{ movie.price }}\n        <i class=\"fa fa-dollar-sign\"></i>\n        <button class=\"btn btn-success btn-sm\" (click)=\"buyMovie()\" [ngStyle]=\"{display : !loggedIn || admin || movie.inCart ? 'none' : 'inline-block'}\">Buy\n          <i class=\"fa fa-shopping-cart\"></i>\n        </button>\n        <button class=\"btn btn-danger btn-sm\" (click)=\"removeFromCart()\" [ngStyle]=\"{display : !loggedIn || admin || !movie.inCart? 'none' : 'inline-block'}\">Remove\n          <i class=\"fas fa-trash-alt\"></i>\n        </button>\n\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/Movie/movie-details/movie-details.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovieDetailsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alertify_service__ = __webpack_require__("../../../../../src/app/services/alertify.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_movie_service__ = __webpack_require__("../../../../../src/app/services/movie.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MovieDetailsComponent = /** @class */ (function () {
    function MovieDetailsComponent(root, movieService, auth, alertify) {
        this.root = root;
        this.movieService = movieService;
        this.auth = auth;
        this.alertify = alertify;
        this.loggedIn = false;
        this.admin = false;
        this.trailer = "http://www.youtube.com/embed/";
    }
    MovieDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.root.data.subscribe(function (data) {
            _this.movie = data["movie"];
            _this.userId = _this.auth.getId();
            _this.getTrailer();
            _this.movieService
                .checkIsMovieInFavorites(_this.movie, _this.userId)
                .subscribe(function (res) { return (_this.favoriteMovie = res); });
            if (_this.movie != null) {
                _this.movieService.getDescription(_this.movie).subscribe(function (info) {
                    _this.movieInfo = info;
                });
            }
        });
        this.auth.userLogged.subscribe(function (loggedIn) {
            _this.loggedIn = loggedIn;
        });
        this.auth.isAdminObservable.subscribe(function (isAdmin) {
            _this.admin = isAdmin;
        });
    };
    MovieDetailsComponent.prototype.getImages = function () {
        var imgUrls = [];
        for (var i = 0; i < this.movie.photos.length; i++) {
            imgUrls.push({
                url: this.movie.photos[i].url + "?w-1200",
                altText: this.movie.name,
                title: this.movie.name,
                thumbnailUrl: this.movie.photos[i].url + "?w-60"
            });
        }
        return imgUrls;
    };
    MovieDetailsComponent.prototype.getTrailer = function () {
        var _this = this;
        this.movieService.getTrailer(this.movie.name).subscribe(function (res) {
            _this.trailer += res[0];
        });
    };
    MovieDetailsComponent.prototype.buyMovie = function () {
        this.movie.inCart = true;
        this.movieService.addMovieToCart(this.movie);
        this.movieService.sendMoviePrice(this.movie.price);
        this.alertify.success(this.movie.name + " added to cart.");
    };
    MovieDetailsComponent.prototype.removeFromCart = function () {
        this.movieService.removeMovieFromCart(this.movie);
        this.movie.inCart = false;
        this.movieService.sendMoviePrice(-this.movie.price);
        this.alertify.notify(this.movie.name + " removed from cart.");
    };
    MovieDetailsComponent.prototype.addToFavorites = function () {
        this.favoriteMovie = true;
        this.movieService
            .addMovieToFavorite(this.movie.id, this.userId)
            .subscribe(function (res) {
        });
        this.alertify.success(this.movie.name + " added to favorites.");
    };
    MovieDetailsComponent.prototype.removeFromFavorites = function () {
        this.favoriteMovie = false;
        this.movieService.removeFromFavorites(this.movie, this.userId).subscribe(function (res) {
        });
        this.alertify.notify(this.movie.name + " removed from favorites.");
    };
    MovieDetailsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
            selector: "app-movie-details",
            template: __webpack_require__("../../../../../src/app/Movie/movie-details/movie-details.component.html"),
            styles: [__webpack_require__("../../../../../src/app/Movie/movie-details/movie-details.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_4__services_movie_service__["a" /* MovieService */],
            __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alertify_service__["a" /* AlertifyService */]])
    ], MovieDetailsComponent);
    return MovieDetailsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/Movie/movie-edit/movie-edit.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".center{\r\n    padding-left: 17%;\r\n}\r\ndiv.item.active{\r\n    overflow: hidden;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/Movie/movie-edit/movie-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-4 col-md-offset-1 col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1\">\n\n    <form [formGroup]=\"editMovieForm\" (submit)=\"upload();editMovieForm.reset()\">\n      <div class=\"form-group\" [ngClass]=\"{'has-error': editMovieForm.get('name')?.errors && editMovieForm.get('name')?.touched}\">\n        <label for=\"moviename\">Name:</label>\n        <input type=\"text\" placeholder=\"Movie name\" class=\"form-control\" name=\"moviename\" formControlName=\"name\">\n        <span class=\"help-block\" *ngIf=\"editMovieForm.get('name')?.hasError('required') && editMovieForm.get('name')?.touched\">\n          Movie name is required\n        </span>\n      </div>\n      <div class=\"form-group\" [ngClass]=\"{'has-error': editMovieForm.get('genre')?.errors && editMovieForm.get('genre')?.touched}\">\n        <label for=\"genre\">Genre:</label>\n        <ng-select [items]=\"genres\"  placeholder=\"Select Genre\" formControlName=\"genre\" [ngStyle]=\"styles\" #select class=\"custom\"></ng-select>\n        <span class=\"help-block\" *ngIf=\"editMovieForm.get('genre')?.hasError('required') && editMovieForm.get('genre')?.touched\">\n          Genre is required\n        </span>\n      </div>\n      <div class=\"form-group\" [ngClass]=\"{'has-error': editMovieForm.get('yearofrelease')?.errors && editMovieForm.get('yearofrelease')?.touched}\">\n        <label for=\"yearofrelease\">Release Date:</label>\n        <select formControlName=\"yearofrelease\" name=\"yearofrelease\" class=\"form-control\" style=\"width:100px\">\n          <option *ngFor=\"let year of years; let i = index\" value=\"{{years[i]}}\"> {{years[i] }}</option>\n        </select>\n        <span class=\"help-block\" *ngIf=\"editMovieForm.get('yearofrelease')?.hasError('required') && editMovieForm.get('yearofrelease')?.touched\">\n          Release date is required\n        </span>\n      </div>\n      <div class=\"form-group\" [ngClass]=\"{'has-error': editMovieForm.get('rating')?.errors && editMovieForm.get('rating')?.touched}\">\n        <label for=\"rating\">Rating:</label>\n        <rating formControlName=\"rating\" [max]=\"10\" style=\"font-size:2em\"></rating>\n        <span class=\"help-block\" *ngIf=\"editMovieForm.get('rating')?.hasError('required') && editMovieForm.get('rating')?.touched\">\n          Rating is required\n        </span>\n      </div>\n\n      <div class=\"form-group\" [ngClass]=\"{'has-error': editMovieForm.get('price')?.errors && editMovieForm.get('price')?.touched}\">\n        <label for=\"genre\">Price:</label>\n        <input type=\"text\" formControlName=\"price\" name=\"price\" class=\"form-control\" style=\"width:100px\">\n        <span class=\"help-block\" *ngIf=\"editMovieForm.get('price')?.hasError('required') && editMovieForm.get('price')?.touched\">\n          Price is required\n        </span>\n      </div>\n\n      <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!editMovieForm.valid || editMovieForm.pristine\">Edit movie</button>\n      <button type=\"button\" class=\"btn btn-warning\" (click)=\"goBack()\">Cancel</button>\n    </form>\n  </div>\n  <div class=\"col-md-5 col-xs-10 col-xs-offset-1 col-sm-10 col-sm-offset-1\">\n    <div class=\"panel panel-default\">\n      <div class=\"panel-body text-center\">\n        <carousel [interval]=\"0\" [showIndicators]=\"false\">\n          <slide *ngFor=\"let img of movie.photos;let i = index\">\n            <img src=\"{{ movie.photos[i].url }}\" alt=\"image\" style=\"display:inline-block;width:80%\">\n            <div class=\"carousel-caption d-none d-md-block\">\n                <button class=\"btn btn-danger btn-sm\" [disabled]=\"movie.photos[i].isMain\" (click)=\"deletePhoto(movie.photos[i].id)\"><i class=\"fa fa-trash\"></i></button>\n                <button class=\"btn btn-success btn-sm\" (click)=\"setMain(movie.id,movie.photos[i].id)\" [disabled]=\"movie.photos[i].isMain\"><i class=\"fa fa-home\"></i></button>\n            </div>\n          </slide>\n        </carousel>\n        <div class=\"text-center\">\n          <h4>{{ movie.name }}</h4>\n        </div>\n        <div class=\"text-center\">\n          <h5>{{ movie.genre }}</h5>\n        </div>\n        <div>\n          <rating [max]=\"10\" [readonly]=\"true\" [(ngModel)]=\"movie.rating\" style=\"font-size:1.4em;color:rgb(0, 110, 255)\"></rating>\n        </div>\n        <div class=\"buttons\">\n          <i class=\"fa fa-dollar-sign\"></i> {{ movie.price }}\n        </div>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"\">Add Photos </label>\n      <div ng2FileDrop [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\" (fileOver)=\"fileOverBase($event)\" [uploader]=\"uploader\"\n        class=\"well my-drop-zone\">\n        Drop Photos Here\n        <br>\n        <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" [disabled]=\"uploader?.queue?.length\" />\n        <div *ngIf=\"uploader?.queue?.length\">\n          <div>\n            <div>\n              <tbody>\n                <tr *ngFor=\"let item of uploader.queue\">\n                  <td>\n                    <strong>{{ item?.file?.name }}</strong>\n                  </td>\n                </tr>\n              </tbody>\n              <div class=\"progress\" style=\"\">\n                <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': uploader.progress + '%' }\"></div>\n              </div>\n            </div>\n            <button type=\"button\" class=\"btn btn-success btn-s\" (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.queue.length\">\n              <span class=\"glyphicon glyphicon-upload\"></span> Upload\n            </button>\n            <button type=\"button\" class=\"btn btn-danger btn-s\" (click)=\"uploader.clearQueue()\" [disabled]=\"!uploader.queue.length\">\n              <span class=\"glyphicon glyphicon-trash\"></span> Remove\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/Movie/movie-edit/movie-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovieEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_alertify_service__ = __webpack_require__("../../../../../src/app/services/alertify.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_movie_service__ = __webpack_require__("../../../../../src/app/services/movie.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_underscore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_select__ = __webpack_require__("../../../../ng2-select/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_select__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MovieEditComponent = /** @class */ (function () {
    function MovieEditComponent(root, fb, router, movieService, alertify) {
        this.root = root;
        this.fb = fb;
        this.router = router;
        this.movieService = movieService;
        this.alertify = alertify;
        this.years = [];
        this.genres = [
            "Action",
            "Comedy",
            "Thriller",
            "Science-Fiction",
            "Adventure",
            "Fantasy"
        ];
    }
    MovieEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.root.data.subscribe(function (data) {
            _this.movie = data["movie"];
        });
        this.setYears();
        this.initializeUploader();
        this.createAddMovieForm();
        this.styles = {
            color: "white"
        };
        this.editMovieForm.controls['genre'].setValue([{ text: this.movie.genre }]);
        this.orderPhotos();
    };
    MovieEditComponent.prototype.orderPhotos = function () {
        var photos = __WEBPACK_IMPORTED_MODULE_6_underscore__["sortBy"](this.movie.photos, { isMain: true });
        this.movie.photos = photos.reverse();
    };
    MovieEditComponent.prototype.createAddMovieForm = function () {
        this.editMovieForm = this.fb.group({
            name: [this.movie.name, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            genre: ["", __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            yearofrelease: [this.movie.yearOfRelease, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            rating: [this.movie.rating, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            price: [this.movie.price, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            file: [""]
        });
    };
    MovieEditComponent.prototype.setMain = function (movieId, photoId) {
        var _this = this;
        this.movieService.setMainPhoto(movieId, photoId).subscribe(function () {
            _this.alertify.success("Successfully changed main photo");
            var newMainPhoto = __WEBPACK_IMPORTED_MODULE_6_underscore__["findIndex"](_this.movie.photos, { id: photoId });
            var oldMainPhoto = __WEBPACK_IMPORTED_MODULE_6_underscore__["findIndex"](_this.movie.photos, { isMain: true });
            _this.movie.photos[newMainPhoto].isMain = true;
            _this.movie.photos[oldMainPhoto].isMain = false;
            _this.orderPhotos();
        }, function () { });
    };
    MovieEditComponent.prototype.deletePhoto = function (photoId) {
        var _this = this;
        this.movieService.deletePhoto(photoId, this.movie.id).subscribe(function () {
            _this.movie.photos.splice(__WEBPACK_IMPORTED_MODULE_6_underscore__["findIndex"](_this.movie.photos, { id: photoId }), 1);
            _this.alertify.success("Photo deleted");
        });
    };
    MovieEditComponent.prototype.goBack = function () {
        this.router.navigate(["/home"]);
    };
    MovieEditComponent.prototype.upload = function () {
        var _this = this;
        var movie = Object.assign({}, this.editMovieForm.value);
        movie.genre = this.editMovieForm.get("genre").value[0].text;
        this.movieService.editMovie(this.movie.id, movie).subscribe(function (res) {
            _this.movie = Object.assign({}, res);
            _this.alertify.success("Movie updated");
            _this.router.navigate(['/home']);
        });
    };
    MovieEditComponent.prototype.initializeUploader = function () {
        var _this = this;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_1_ng2_file_upload__["FileUploader"]({
            url: "http://localhost:5000/api/movie/editPhotos/" + this.movie.id,
            authToken: "Bearer " + localStorage.getItem("token"),
            isHTML5: true,
            allowedFileType: ["image"],
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024,
            method: "POST"
        });
        this.uploader.onSuccessItem = function (item, response, status, heaeders) {
            if (response) {
                var res = JSON.parse(response);
                _this.movie.photos.push(res);
                _this.orderPhotos();
            }
        };
    };
    MovieEditComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    MovieEditComponent.prototype.setYears = function () {
        for (var i = 2018; i >= 1950; i--) {
            this.years.push(i);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], MovieEditComponent.prototype, "styles", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_7_ng2_select__["SelectComponent"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_7_ng2_select__["SelectComponent"])
    ], MovieEditComponent.prototype, "select", void 0);
    MovieEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
            selector: "app-movie-edit",
            template: __webpack_require__("../../../../../src/app/Movie/movie-edit/movie-edit.component.html"),
            styles: [__webpack_require__("../../../../../src/app/Movie/movie-edit/movie-edit.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_5__services_movie_service__["a" /* MovieService */],
            __WEBPACK_IMPORTED_MODULE_0__services_alertify_service__["a" /* AlertifyService */]])
    ], MovieEditComponent);
    return MovieEditComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-nav></app-nav>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AppComponent.prototype, "movieToBuy", void 0);
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_auth_component__ = __webpack_require__("../../../../../src/app/auth/auth.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_module__ = __webpack_require__("../../../../../src/app/auth/auth.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Movie_favorites_favorites_component__ = __webpack_require__("../../../../../src/app/Movie/favorites/favorites.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__safe_pipe_pipe__ = __webpack_require__("../../../../../src/app/safe-pipe.pipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Movie_movie_details_movie_details_component__ = __webpack_require__("../../../../../src/app/Movie/movie-details/movie-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__edit_guard__ = __webpack_require__("../../../../../src/app/edit.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth_guard__ = __webpack_require__("../../../../../src/app/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_alertify_service__ = __webpack_require__("../../../../../src/app/services/alertify.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_select__ = __webpack_require__("../../../../ng2-select/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng2_select__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Movie_Movie_component__ = __webpack_require__("../../../../../src/app/Movie/Movie.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Movie_movie_edit_movie_edit_component__ = __webpack_require__("../../../../../src/app/Movie/movie-edit/movie-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__nav_nav_component__ = __webpack_require__("../../../../../src/app/nav/nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__register_register_component__ = __webpack_require__("../../../../../src/app/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__Movie_movie_card_movie_card_component__ = __webpack_require__("../../../../../src/app/Movie/movie-card/movie-card.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ng2_file_upload__ = __webpack_require__("../../../../ng2-file-upload/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_movie_service__ = __webpack_require__("../../../../../src/app/services/movie.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__routes__ = __webpack_require__("../../../../../src/app/routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__resolvers_movie_edit_resolver__ = __webpack_require__("../../../../../src/app/resolvers/movie-edit-resolver.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__resolvers_movie_list_resolver__ = __webpack_require__("../../../../../src/app/resolvers/movie-list-resolver.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__Movie_movie_add_movie_add_component__ = __webpack_require__("../../../../../src/app/Movie/movie-add/movie-add.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__Movie_movie_cart_movie_cart_component__ = __webpack_require__("../../../../../src/app/Movie/movie-cart/movie-cart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_ngx_image_gallery__ = __webpack_require__("../../../../ngx-image-gallery/ngx-image-gallery.umd.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_ngx_image_gallery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_29_ngx_image_gallery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__short_pipe__ = __webpack_require__("../../../../../src/app/short.pipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_9__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_14__Movie_Movie_component__["a" /* MovieComponent */],
                __WEBPACK_IMPORTED_MODULE_17__nav_nav_component__["a" /* NavComponent */],
                __WEBPACK_IMPORTED_MODULE_19__register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_20__Movie_movie_card_movie_card_component__["a" /* MovieCardComponent */],
                __WEBPACK_IMPORTED_MODULE_15__Movie_movie_edit_movie_edit_component__["a" /* MovieEditComponent */],
                __WEBPACK_IMPORTED_MODULE_27__Movie_movie_add_movie_add_component__["a" /* MovieAddComponent */],
                __WEBPACK_IMPORTED_MODULE_28__Movie_movie_cart_movie_cart_component__["a" /* MovieCartComponent */],
                __WEBPACK_IMPORTED_MODULE_4__Movie_movie_details_movie_details_component__["a" /* MovieDetailsComponent */],
                __WEBPACK_IMPORTED_MODULE_3__safe_pipe_pipe__["a" /* SafePipePipe */],
                __WEBPACK_IMPORTED_MODULE_30__short_pipe__["a" /* ShortPipe */],
                __WEBPACK_IMPORTED_MODULE_2__Movie_favorites_favorites_component__["a" /* FavoritesComponent */],
                __WEBPACK_IMPORTED_MODULE_0__auth_auth_component__["a" /* AuthComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_16__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_10__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap__["e" /* ModalModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap__["b" /* BsDropdownModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12_ng2_select__["SelectModule"],
                __WEBPACK_IMPORTED_MODULE_10__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_21_ng2_file_upload__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap__["a" /* BsDatepickerModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap__["g" /* RatingModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_23__angular_router__["c" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_24__routes__["a" /* appRoutes */]),
                __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap__["d" /* CarouselModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap__["f" /* PaginationModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap__["c" /* ButtonsModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_29_ngx_image_gallery__["NgxImageGalleryModule"],
                __WEBPACK_IMPORTED_MODULE_1__auth_auth_module__["a" /* AuthModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_18__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_7__services_alertify_service__["a" /* AlertifyService */],
                __WEBPACK_IMPORTED_MODULE_22__services_movie_service__["a" /* MovieService */],
                __WEBPACK_IMPORTED_MODULE_25__resolvers_movie_edit_resolver__["a" /* MovieEditResolver */],
                __WEBPACK_IMPORTED_MODULE_26__resolvers_movie_list_resolver__["a" /* MovieListResolver */],
                __WEBPACK_IMPORTED_MODULE_6__auth_guard__["a" /* AuthGuard */],
                __WEBPACK_IMPORTED_MODULE_5__edit_guard__["a" /* EditGuard */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_alertify_service__ = __webpack_require__("../../../../../src/app/services/alertify.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthGuard = /** @class */ (function () {
    function AuthGuard(auth, router, alert) {
        this.auth = auth;
        this.router = router;
        this.alert = alert;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.auth.checkLoggedIn())
            return true;
        this.alert.error('You need to be logged in to access this area');
        this.router.navigate(["**"]);
        return false;
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_3__services_alertify_service__["a" /* AlertifyService */]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "../../../../../src/app/auth/auth.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/auth.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  auth works!\n</p>"

/***/ }),

/***/ "../../../../../src/app/auth/auth.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuthComponent = /** @class */ (function () {
    function AuthComponent() {
    }
    AuthComponent.prototype.ngOnInit = function () {
    };
    AuthComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-auth',
            template: __webpack_require__("../../../../../src/app/auth/auth.component.html"),
            styles: [__webpack_require__("../../../../../src/app/auth/auth.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AuthComponent);
    return AuthComponent;
}());



/***/ }),

/***/ "../../../../../src/app/auth/auth.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export authHttpServiceFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__("../../../../angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



function authHttpServiceFactory(http, options) {
    return new __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthHttp"](new __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthConfig"]({
        tokenName: 'token',
        noJwtError: true,
        tokenGetter: (function () { return localStorage.getItem('token'); }),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
    }), http, options);
}
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["AuthHttp"],
                    useFactory: authHttpServiceFactory,
                    deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]]
                }
            ]
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ }),

/***/ "../../../../../src/app/edit.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_alertify_service__ = __webpack_require__("../../../../../src/app/services/alertify.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditGuard = /** @class */ (function () {
    function EditGuard(auth, router, alert) {
        this.auth = auth;
        this.router = router;
        this.alert = alert;
    }
    EditGuard.prototype.canActivate = function () {
        if (this.auth.checkUserRole())
            return true;
        this.alert.error('You need to be logged in as Admin.');
        this.router.navigate([""]);
        return false;
    };
    EditGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_3__services_alertify_service__["a" /* AlertifyService */]])
    ], EditGuard);
    return EditGuard;
}());



/***/ }),

/***/ "../../../../../src/app/nav/nav.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "li > a {\r\n    cursor: pointer;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/nav/nav.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\"\n        aria-controls=\"navbar\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" [routerLink]=\"['/home']\" routerLinkActive=\"router-link-active\"> Movie Store</a>\n    </div>\n\n    <div id=\"navbar\" class=\"navbar-collapse collapse\">\n      <ul class=\"nav navbar-nav navbar-right\" *ngIf=\"!loggedIn\">\n      <form class=\"navbar-form navbar-right\"  #formLogin=\"ngForm\" (ngSubmit)=\"login(formLogin)\">\n        <div class=\"form-group\">\n          <input type=\"text\" placeholder=\"Username\" class=\"form-control\" name=\"username\" required [(ngModel)]=\"loginModel.username\">\n        </div>\n        <div class=\"form-group\">\n          <input type=\"password\" placeholder=\"Password\" class=\"form-control\" name=\"password\" required [(ngModel)]=\"loginModel.password\">\n        </div>\n        <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!formLogin.valid\">Sign in</button>\n        <button type=\"button\" class=\"btn btn-success\" (click)=\"registerModal.show()\">Register</button>\n      </form>\n    </ul>\n      <ul *ngIf=\"loggedIn\" class=\"nav navbar-nav navbar-right\">\n        <li class=\"dropdown\" dropdown>\n          <a  class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" dropdownToggle aria-haspopup=\"true\" aria-expanded=\"false\">Welcome {{ logginUsername| titlecase}}\n            <span class=\"caret\"></span>\n          </a>\n          <ul class=\"dropdown-menu\" *dropdownMenu>\n            <li>\n              <a  (click)=\"logout()\">\n                <i class=\"fas fa-sign-out-alt\"></i>LogOut</a>\n            </li>\n            <li *ngIf=\"!isAdmin\">\n                <a [routerLink]=\"['/favorites']\" routerLinkActive=\"router-link-active\" >\n                  <i class=\"fas fa-star\"></i>Favorites</a>\n              </li>\n          </ul>\n        </li>\n      </ul>\n\n      <ul class=\"nav navbar-nav navbar-right\">\n        <div bsModal #registerModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\n          aria-hidden=\"true\">\n          <div class=\"modal-dialog modal-lg\">\n            <div class=\"modal-content\">\n              <div class=\"modal-header\">\n                <h4 class=\"modal-title pull-left\">Register new user</h4>\n                <button type=\"button\" class=\"close pull-right\" (click)=\"registerModal.hide()\" aria-label=\"Close\">\n                  <span aria-hidden=\"true\">&times;</span>\n                </button>\n              </div>\n              <div class=\"modal-body\">\n                <form #registerForm=\"ngForm\" (ngSubmit)=\"registerUser()\">\n                  <div class=\"form-group\">\n                    <input type=\"text\" placeholder=\"Username\" class=\"form-control\" name=\"username\" required [(ngModel)]=\"registerModel.username\">\n                  </div>\n                  <div class=\"form-group\">\n                    <input type=\"password\" placeholder=\"Password\" class=\"form-control\" name=\"password\" required [(ngModel)]=\"registerModel.password\">\n                  </div>\n                  <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!registerForm.valid\" (click)=\"registerModal.hide()\">Register</button>\n                  <button type=\"button\" class=\"btn btn-warning\" (click)=\"registerModal.hide();registerForm.reset()\">Cancel</button>\n                </form>\n              </div>\n            </div>\n          </div>\n        </div>\n      </ul>\n      <ul class=\"nav navbar-nav navbar-right\" *ngIf=\"sum\">\n          <li><a [routerLink]=\"['cart']\" routerLinkActive=\"router-link-active\" >Your Cart:<i class=\"fa fa-shopping-cart\"></i> {{ sum }} <i class=\"fa fa-dollar-sign\"></i></a></li>\n      </ul>\n    </div>\n    <!--/.navbar-collapse -->\n  </div>\n</nav>"

/***/ }),

/***/ "../../../../../src/app/nav/nav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resolvers_movie_list_resolver__ = __webpack_require__("../../../../../src/app/resolvers/movie-list-resolver.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Movie_Movie_component__ = __webpack_require__("../../../../../src/app/Movie/Movie.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__("../../../../../src/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_alertify_service__ = __webpack_require__("../../../../../src/app/services/alertify.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_movie_service__ = __webpack_require__("../../../../../src/app/services/movie.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__routes__ = __webpack_require__("../../../../../src/app/routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var NavComponent = /** @class */ (function () {
    function NavComponent(auth, alertify, fb, movieService, http, router, root) {
        this.auth = auth;
        this.alertify = alertify;
        this.fb = fb;
        this.movieService = movieService;
        this.http = http;
        this.router = router;
        this.root = root;
        this.loginModel = {};
        this.registerModel = {};
        this.years = [];
        this.register = false;
        this.hasBaseDropZoneOver = false;
        this.routes = __WEBPACK_IMPORTED_MODULE_9__routes__["a" /* appRoutes */];
        this.genres = [
            "Action",
            "Comedy",
            "Thriller",
            "Science-Fiction",
            "Adventure",
            "Fantasy"
        ];
        this.moviesInCart = [];
        this.sum = 0;
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkIfLoggedIn();
        this.movieService.currentMoviePrice.subscribe(function (m) {
            _this.sum += m;
        });
        this.movieService.getMoviesInCart().subscribe(function (res) {
            var cart = res.json();
            cart.forEach(function (element) {
                _this.sum += element.price;
            });
        });
        this.auth.isAdminObservable.subscribe(function (isAdmin) {
            _this.isAdmin = isAdmin;
        });
    };
    NavComponent.prototype.checkIfLoggedIn = function () {
        var token = localStorage.getItem("token");
        if (!!token) {
            this.loggedIn = true;
            this.logginUsername = this.auth.getName();
        }
    };
    NavComponent.prototype.login = function (form) {
        var _this = this;
        this.auth.login(this.loginModel).subscribe(function (data) {
            _this.alertify.success("Logged in successfully");
            _this.checkIfLoggedIn();
            _this.auth.userHasLoggedIn(true);
            _this.router.resetConfig(_this.routes);
        }, function (e) {
            _this.alertify.error(e);
        });
        this.loginModel = {};
    };
    NavComponent.prototype.logout = function () {
        var _this = this;
        this.auth.userToken = null;
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        this.alertify.notify("Logged Out");
        this.loggedIn = false;
        this.logginUsername = "";
        this.movieService.clearCart().subscribe(function (movies) {
            _this.sum = 0;
            _this.resetCart();
        });
        this.auth.userHasLoggedIn(false);
    };
    NavComponent.prototype.resetCart = function () {
        var resetRoutes = this.routes;
        resetRoutes[0] = {
            path: "",
            component: __WEBPACK_IMPORTED_MODULE_1__Movie_Movie_component__["a" /* MovieComponent */],
            resolve: { movies: __WEBPACK_IMPORTED_MODULE_0__resolvers_movie_list_resolver__["a" /* MovieListResolver */] }
        };
        this.router.resetConfig(resetRoutes);
        this.router.navigate([""]);
    };
    NavComponent.prototype.registerMode = function () {
        this.register = !this.register;
    };
    NavComponent.prototype.registerUser = function () {
        var _this = this;
        this.auth.register(this.registerModel).subscribe(function (resp) {
            _this.alertify.success("Registred in succesfully");
        }, function (e) {
            if (e)
                _this.alertify.error(e);
        }, function () {
            _this.auth.login(_this.registerModel).subscribe(function () {
                _this.logginUsername = _this.auth.getName();
                _this.loggedIn = true;
                _this.registerModel = {};
                _this.auth.userHasLoggedIn(true);
                _this.router.resetConfig(_this.routes);
            });
        });
    };
    NavComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["Component"])({
            selector: "app-nav",
            template: __webpack_require__("../../../../../src/app/nav/nav.component.html"),
            styles: [__webpack_require__("../../../../../src/app/nav/nav.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_6__services_alertify_service__["a" /* AlertifyService */],
            __WEBPACK_IMPORTED_MODULE_7__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_8__services_movie_service__["a" /* MovieService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["Http"],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]])
    ], NavComponent);
    return NavComponent;
}());



/***/ }),

/***/ "../../../../../src/app/register/register.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  register works!\n</p>"

/***/ }),

/***/ "../../../../../src/app/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RegisterComponent = /** @class */ (function () {
    function RegisterComponent() {
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__("../../../../../src/app/register/register.component.html"),
            styles: [__webpack_require__("../../../../../src/app/register/register.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "../../../../../src/app/resolvers/movie-edit-resolver.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovieEditResolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_movie_service__ = __webpack_require__("../../../../../src/app/services/movie.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MovieEditResolver = /** @class */ (function () {
    function MovieEditResolver(movieService) {
        this.movieService = movieService;
    }
    MovieEditResolver.prototype.resolve = function (route) {
        return this.movieService.getMovie(route.params['id'])
            .catch(function (e) {
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["a" /* Observable */].of(null);
        });
    };
    MovieEditResolver = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_movie_service__["a" /* MovieService */]])
    ], MovieEditResolver);
    return MovieEditResolver;
}());



/***/ }),

/***/ "../../../../../src/app/resolvers/movie-list-resolver.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovieListResolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_movie_service__ = __webpack_require__("../../../../../src/app/services/movie.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MovieListResolver = /** @class */ (function () {
    function MovieListResolver(movieService) {
        this.movieService = movieService;
        this.pageSize = 8;
        this.pageNumber = 1;
    }
    MovieListResolver.prototype.resolve = function (route) {
        return this.movieService.getMovies(this.pageNumber, this.pageSize)
            .catch(function (e) {
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Rx__["a" /* Observable */].of(null);
        });
    };
    MovieListResolver = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_movie_service__["a" /* MovieService */]])
    ], MovieListResolver);
    return MovieListResolver;
}());



/***/ }),

/***/ "../../../../../src/app/routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return appRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Movie_movie_details_movie_details_component__ = __webpack_require__("../../../../../src/app/Movie/movie-details/movie-details.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit_guard__ = __webpack_require__("../../../../../src/app/edit.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_guard__ = __webpack_require__("../../../../../src/app/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resolvers_movie_list_resolver__ = __webpack_require__("../../../../../src/app/resolvers/movie-list-resolver.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resolvers_movie_edit_resolver__ = __webpack_require__("../../../../../src/app/resolvers/movie-edit-resolver.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Movie_Movie_component__ = __webpack_require__("../../../../../src/app/Movie/Movie.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Movie_movie_edit_movie_edit_component__ = __webpack_require__("../../../../../src/app/Movie/movie-edit/movie-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Movie_movie_cart_movie_cart_component__ = __webpack_require__("../../../../../src/app/Movie/movie-cart/movie-cart.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Movie_favorites_favorites_component__ = __webpack_require__("../../../../../src/app/Movie/favorites/favorites.component.ts");









var appRoutes = [
    {
        path: "",
        component: __WEBPACK_IMPORTED_MODULE_5__Movie_Movie_component__["a" /* MovieComponent */],
        resolve: { movies: __WEBPACK_IMPORTED_MODULE_3__resolvers_movie_list_resolver__["a" /* MovieListResolver */] }
    },
    {
        path: "edit/:id",
        component: __WEBPACK_IMPORTED_MODULE_6__Movie_movie_edit_movie_edit_component__["a" /* MovieEditComponent */],
        resolve: { movie: __WEBPACK_IMPORTED_MODULE_4__resolvers_movie_edit_resolver__["a" /* MovieEditResolver */] },
        canActivate: [__WEBPACK_IMPORTED_MODULE_1__edit_guard__["a" /* EditGuard */]]
    },
    {
        path: "cart",
        component: __WEBPACK_IMPORTED_MODULE_7__Movie_movie_cart_movie_cart_component__["a" /* MovieCartComponent */],
        resolve: { cart: __WEBPACK_IMPORTED_MODULE_3__resolvers_movie_list_resolver__["a" /* MovieListResolver */] },
        canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: "favorites",
        component: __WEBPACK_IMPORTED_MODULE_8__Movie_favorites_favorites_component__["a" /* FavoritesComponent */],
    },
    {
        path: "details/:id",
        component: __WEBPACK_IMPORTED_MODULE_0__Movie_movie_details_movie_details_component__["a" /* MovieDetailsComponent */],
        resolve: { movie: __WEBPACK_IMPORTED_MODULE_4__resolvers_movie_edit_resolver__["a" /* MovieEditResolver */] },
        canActivate: [__WEBPACK_IMPORTED_MODULE_2__auth_guard__["a" /* AuthGuard */]]
    },
    { path: "**", redirectTo: "", pathMatch: "full" }
];


/***/ }),

/***/ "../../../../../src/app/safe-pipe.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafePipePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafePipePipe = /** @class */ (function () {
    function SafePipePipe(sanitazer) {
        this.sanitazer = sanitazer;
    }
    SafePipePipe.prototype.transform = function (value) {
        return this.sanitazer.bypassSecurityTrustResourceUrl(value);
    };
    SafePipePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"])({
            name: 'safe'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["DomSanitizer"]])
    ], SafePipePipe);
    return SafePipePipe;
}());



/***/ }),

/***/ "../../../../../src/app/services/alertify.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertifyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AlertifyService = /** @class */ (function () {
    function AlertifyService() {
    }
    AlertifyService.prototype.error = function (message) {
        alertify.error(message);
    };
    AlertifyService.prototype.success = function (message) {
        alertify.success(message);
    };
    AlertifyService.prototype.notify = function (message) {
        alertify.message(message);
    };
    AlertifyService.prototype.confirm = function (message, title, okCallback) {
        alertify.confirm(title, message, function () {
            okCallback();
        }, function () { });
    };
    AlertifyService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], AlertifyService);
    return AlertifyService;
}());



/***/ }),

/***/ "../../../../../src/app/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_jwt__ = __webpack_require__("../../../../angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angular2_jwt__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AuthService = /** @class */ (function () {
    function AuthService(http, Auth) {
        this.http = http;
        this.Auth = Auth;
        this.userLoggedIn = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](this.checkLoggedIn());
        this.userLogged = this.userLoggedIn.asObservable();
        this.isAdmin = new __WEBPACK_IMPORTED_MODULE_0_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](this.checkUserRole());
        this.isAdminObservable = this.isAdmin.asObservable();
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_7_angular2_jwt__["JwtHelper"]();
        this.url = "/api/auth";
    }
    AuthService.prototype.getName = function () {
        var token = this.jwtHelper.decodeToken(localStorage.getItem("token"));
        return token.unique_name;
    };
    AuthService.prototype.getId = function () {
        var user = localStorage.getItem('user');
        user = JSON.parse(user);
        return user.id;
    };
    AuthService.prototype.login = function (model) {
        var _this = this;
        return this.http
            .post(this.url + "/login", model, this.setHeaders())
            .map(function (response) {
            var user = response.json();
            if (user) {
                localStorage.setItem("token", user.tokenString);
                localStorage.setItem('user', JSON.stringify(user.user));
                _this.userToken = user.tokenString;
                _this.decodedToken = _this.jwtHelper.decodeToken(_this.userToken);
                localStorage.setItem("userRole", _this.decodedToken.role);
            }
        })
            .catch(this.handleError);
    };
    AuthService.prototype.checkLoggedIn = function () {
        var token = localStorage.getItem("token");
        return !!token;
    };
    AuthService.prototype.checkUserRole = function () {
        var userToken = localStorage.getItem("userRole");
        if (userToken === "admin") {
            return true;
        }
        return false;
    };
    AuthService.prototype.userHasLoggedIn = function (loggedIn) {
        this.userLoggedIn.next(loggedIn);
        this.isAdmin.next(this.checkUserRole());
    };
    AuthService.prototype.register = function (model) {
        return this.http
            .post(this.url + "/register", model, this.setHeaders())
            .catch(this.handleError);
    };
    AuthService.prototype.setHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]({ "Content-Type": "application/json" });
        return new __WEBPACK_IMPORTED_MODULE_2__angular_http__["RequestOptions"]({ headers: headers });
    };
    AuthService.prototype.handleError = function (error) {
        var applicationEror = error.headers.get("Application-Error");
        if (applicationEror) {
            return __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].throw(applicationEror);
        }
        var serverError = error.json();
        var modelStateErrors = "";
        if (serverError) {
            for (var key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + "\n";
                }
            }
        }
        return __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].throw(modelStateErrors || "Server error");
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_7_angular2_jwt__["AuthHttp"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "../../../../../src/app/services/movie.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovieService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Models_pagination__ = __webpack_require__("../../../../../src/app/Models/pagination.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_jwt__ = __webpack_require__("../../../../angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Models_Movie__ = __webpack_require__("../../../../../src/app/Models/Movie.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_underscore__ = __webpack_require__("../../../../underscore/underscore.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_underscore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_underscore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MovieService = /** @class */ (function () {
    function MovieService(http, coreHttp) {
        this.http = http;
        this.coreHttp = coreHttp;
        this.url = "/api/movie";
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_7_angular2_jwt__["JwtHelper"]();
        this.moviePrice = new __WEBPACK_IMPORTED_MODULE_9_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](0);
        this.currentMoviePrice = this.moviePrice.asObservable();
        this.movie = new __WEBPACK_IMPORTED_MODULE_9_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](new __WEBPACK_IMPORTED_MODULE_8__Models_Movie__["a" /* Movie */]());
        this.currentMovie = this.movie.asObservable();
        this.moviesForCart = [];
        this.paginatedResult = new __WEBPACK_IMPORTED_MODULE_0__Models_pagination__["a" /* PaginatedResult */]();
    }
    MovieService.prototype.addMovieToFavorite = function (mId, uId) {
        return this.http.get(this.url + "/AddToFavorites" + "?movieId=" + mId + "&userId=" + uId, this.setHeaders())
            .map(function (res) { return res.json(); }).catch(this.handleError);
    };
    MovieService.prototype.checkIsMovieInFavorites = function (movie, userId) {
        return this.http.get(this.url + "/checkIsMovieInFavorites/" + "?movieId=" + movie.id + "&userId=" + userId, this.setHeaders())
            .map(function (res) { return res.json(); }).catch(this.handleError);
    };
    MovieService.prototype.removeFromFavorites = function (movie, userId) {
        return this.http.get(this.url + "/removeFromFavorites/" + "?movieId=" + movie.id + "&userId=" + userId, this.setHeaders())
            .map(function (res) { return res.json(); }).catch(this.handleError);
    };
    MovieService.prototype.getFavoriteMovies = function (userId) {
        return this.http.get(this.url + "/favoriteMovies/" + "?userId=" + userId, this.setHeaders())
            .map(function (res) { return res.json(); }).catch(this.handleError);
    };
    MovieService.prototype.sendMoviePrice = function (price) {
        this.moviePrice.next(price);
    };
    MovieService.prototype.moviesForCartList = function () {
        return this.moviesForCart;
    };
    MovieService.prototype.addMovieToCart = function (movie) {
        this.moviesForCart.push(movie);
        this.http
            .post(this.url + "/addToCart/" + movie.id, {}, this.setHeaders())
            .subscribe();
    };
    MovieService.prototype.getTrailer = function (movieName) {
        return this.http.get("/api/search" + "?movieName=" + movieName + " trailer").map(function (res) { return res.json(); });
    };
    MovieService.prototype.removeMovieFromCart = function (movie) {
        var index = __WEBPACK_IMPORTED_MODULE_10_underscore__["findIndex"](this.moviesForCart, { id: movie.id });
        this.moviesForCart.splice(index, 1);
        this.http
            .post(this.url + "/removeFromCart/" + movie.id, {}, this.setHeaders())
            .subscribe();
    };
    MovieService.prototype.getMoviesInCart = function () {
        return this.http.get(this.url + "/moviesInCart", this.setHeaders());
    };
    MovieService.prototype.clearCart = function (page, itemsPerPage) {
        this.moviesForCart = [];
        return this.http
            .get(this.url + "/clearCart", this.setHeaders())
            .map(function (res) { return res.json(); });
    };
    MovieService.prototype.addMovie = function (movie) {
        return this.http
            .post(this.url + "/addMovieWithoutPhoto", movie, this.setHeaders())
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    MovieService.prototype.editMovie = function (id, movie) {
        return this.http
            .put(this.url + "/" + id, movie, this.setHeaders())
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    MovieService.prototype.getMovie = function (id) {
        return this.http
            .get(this.url + "/" + id)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    MovieService.prototype.getDescription = function (movie) {
        var movieDescription = "";
        var apiURl = "http://www.omdbapi.com/?apikey=b9d8e1de&t=" + movie.name;
        return this.coreHttp.get(apiURl).map(function (res) { return res.json(); });
    };
    MovieService.prototype.getPhotos = function (movie) {
        var movieDescription = "";
        var apiURl = "http://img.omdbapi.com/?apikey=b9d8e1de&t=" + movie.name;
        return this.http.get(apiURl).map(function (res) { return res.json(); });
    };
    MovieService.prototype.getMovies = function (page, itemsPerPage, movieParams) {
        var _this = this;
        var queryString = "?";
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
            .get(this.url + queryString)
            .map(function (response) {
            _this.paginatedResult.result = response.json();
            if (response.headers.get("Pagination") != null) {
                _this.paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
            }
            return _this.paginatedResult;
        })
            .catch(this.handleError);
    };
    MovieService.prototype.deleteMovie = function (id) {
        return this.http
            .delete(this.url + "/" + id, this.setHeaders())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    MovieService.prototype.setMainPhoto = function (movieId, photoId) {
        return this.http
            .post(this.url + "/" + movieId + "/" + "setMain/" + photoId, {}, this.setHeaders())
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    MovieService.prototype.deletePhoto = function (photoId, movieId) {
        return this.http
            .delete(this.url + "/" + movieId + "/deletePhoto/" + photoId, this.setHeaders())
            .catch(this.handleError);
    };
    MovieService.prototype.setHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["Headers"]({ "Content-Type": "application/json" });
        return new __WEBPACK_IMPORTED_MODULE_2__angular_http__["RequestOptions"]({ headers: headers });
    };
    MovieService.prototype.handleError = function (error) {
        var applicationEror = error.headers.get("Application-Error");
        if (applicationEror) {
            return __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].throw(applicationEror);
        }
        var serverError = error.json();
        var modelStateErrors = "";
        if (serverError) {
            for (var key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + "\n";
                }
            }
        }
        return __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].throw(modelStateErrors || "Server error");
    };
    MovieService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7_angular2_jwt__["AuthHttp"], __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]])
    ], MovieService);
    return MovieService;
}());



/***/ }),

/***/ "../../../../../src/app/short.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShortPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ShortPipe = /** @class */ (function () {
    function ShortPipe() {
    }
    ShortPipe.prototype.transform = function (value, args) {
        if (value.length > 15)
            return value.substring(0, 15) + "...";
        return value;
    };
    ShortPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'short'
        })
    ], ShortPipe);
    return ShortPipe;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map