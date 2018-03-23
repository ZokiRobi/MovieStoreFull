import { Movie } from "./../../Models/Movie";
import { FileUploader } from "ng2-file-upload";
import { BsDatepickerConfig } from "ngx-bootstrap";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { AlertifyService } from "../../services/alertify.service";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-movie-add",
  templateUrl: "./movie-add.component.html",
  styleUrls: ["./movie-add.component.css"]
})
export class MovieAddComponent implements OnInit {
  @Output() cancelAdd = new EventEmitter<boolean>();
  @Output() newMovie = new EventEmitter<Movie>();
  years = [];
  movie: Movie;
  hasBaseDropZoneOver: any;
  uploader: FileUploader;
  bsConfig: Partial<BsDatepickerConfig>;
  addMovieForm: FormGroup;
  genres: Array<string> = [
    "Action",
    "Comedy",
    "Thriller",
    "Science-Fiction",
    "Adventure",
    "Fantasy"
  ];

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.createAddMovieForm();
    this.initializeUploader();
    this.setYears();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: "/api/movie",
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
        const movie: Movie = JSON.parse(response);
        this.movieAdded(movie);
      }
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  cancelAdding() {
    this.cancelAdd.emit(false);
  }

  movieAdded(movie: Movie) {
    this.newMovie.emit(movie);
  }

  upload() {
    if (!this.uploader.queue.length) {
      let m = Object.assign({}, this.addMovieForm.value);
      m.genre = m.genre[0].text;
      this.movieService.addMovie(m).subscribe(res => {
        this.alertify.success("Movie added.");
        this.movie = Object.assign({},res);
        const movie = {
          id: res.id,
          name: res.name,
          genre: res.genre,
          yearOfRelease: res.yearOfRelease,
          price: res.price,
          photoUrl: res.photoUrl,
          photos: res.photos,
          rating: res.rating
        };
        this.movieAdded(this.movie);
      });
    } else {
      this.uploader.onBuildItemForm = (file, form) => {
        form.append("name", this.addMovieForm.get("name").value);
        form.append("genre", this.addMovieForm.get("genre").value[0].text);
        form.append(
          "yearofrelease",
          this.addMovieForm.get("yearofrelease").value
        );
        form.append("rating", this.addMovieForm.get("rating").value);
        form.append("price", this.addMovieForm.get("price").value);
        return { file, form };
      };
      this.uploader.uploadAll();
    }
  }
  createAddMovieForm() {
    this.addMovieForm = this.fb.group({
      name: ["", Validators.required],
      genre: ["", Validators.required],
      yearofrelease: ["2018", Validators.required],
      rating: ["", Validators.required],
      price: ["", Validators.required],
      file: [""]
    });
  }
  private setYears() {
    for (let i = 2018; i >= 1950; i--) {
      this.years.push(i);
    }
  }
}
