import { environment } from './../../../environments/environment.prod';
import { AlertifyService } from "./../../services/alertify.service";
import { Photo } from "./../../Models/Photo";
import { FileUploader } from "ng2-file-upload";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Component, OnInit, Input, ViewChildren, QueryList } from "@angular/core";
import { Movie } from "../../Models/Movie";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { MovieService } from "../../services/movie.service";
import * as _ from "underscore";
import { SelectComponent, SelectItem } from "ng2-select";
import { ViewChild } from "@angular/core";

@Component({
  selector: "app-movie-edit",
  templateUrl: "./movie-edit.component.html",
  styleUrls: ["./movie-edit.component.css"]
})
export class MovieEditComponent implements OnInit {
  hasBaseDropZoneOver: any;
  uploader: FileUploader;
  movie: Movie;
  years = [];
  editMovieForm: FormGroup;
  initValue;
  @Input() styles;
  @ViewChild(SelectComponent) select:SelectComponent;
  genres: Array<string> = [
    "Action",
    "Comedy",
    "Thriller",
    "Science-Fiction",
    "Adventure",
    "Fantasy"
  ];
  url = environment.apiUrl;
  selectedItem;

  constructor(
    private root: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private movieService: MovieService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.root.data.subscribe(data => {
      this.movie = data["movie"];
    });
    this.setYears();
    this.initializeUploader();
    this.createAddMovieForm();
    this.styles = {
      color: "white"
    };
    this.editMovieForm.controls['genre'].setValue([{text:this.movie.genre}]);
    this.orderPhotos();
  }


  orderPhotos(){
    let photos = _.sortBy(this.movie.photos,{isMain:true});
    this.movie.photos = photos.reverse();
  }

  createAddMovieForm() {
    this.editMovieForm = this.fb.group({
      name: [this.movie.name, Validators.required],
      genre: ["", Validators.required],
      yearofrelease: [this.movie.yearOfRelease, Validators.required],
      rating: [this.movie.rating, Validators.required],
      price: [this.movie.price, Validators.required],
      file: [""]
    });
  }

  setMain(movieId, photoId) {
    this.movieService.setMainPhoto(movieId, photoId).subscribe(
      () => {
        this.alertify.success("Successfully changed main photo");
        let newMainPhoto = _.findIndex(this.movie.photos, { id: photoId });
        let oldMainPhoto = _.findIndex(this.movie.photos, { isMain: true });
        this.movie.photos[newMainPhoto].isMain = true;
        this.movie.photos[oldMainPhoto].isMain = false;
        this.orderPhotos();
      },
      () => {}
    );
  }
  deletePhoto(photoId) {
    this.movieService.deletePhoto(photoId, this.movie.id).subscribe(
      () => {
        this.movie.photos.splice(_.findIndex(this.movie.photos, { id: photoId }),1);
        this.alertify.success("Photo deleted");
    });
  }
  goBack() {
    this.router.navigate(["/home"]);
  }
  upload() {
    let movie: Movie = Object.assign({}, this.editMovieForm.value);
    movie.genre = this.editMovieForm.get("genre").value[0].text;
    this.movieService.editMovie(this.movie.id, movie).subscribe(
      res => {
        this.movie = Object.assign({},res);
        this.alertify.success("Movie updated");
        this.router.navigate(['/home']);
      }
    );
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.url+ "/movie/editPhotos/" + this.movie.id,
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
      method: "POST"
    });

    this.uploader.onSuccessItem = (item, response, status, heaeders) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        this.movie.photos.push(res);
        this.orderPhotos();
      }
    };
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  private setYears() {
    for (let i = 2018; i >= 1950; i--) {
      this.years.push(i);
    }
  }
}
  