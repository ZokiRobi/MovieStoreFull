using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Movies.API.Data;
using Movies.API.Dtos;
using Movies.API.Helpers;
using Movies.API.Models;
using Movies.API.Extensions;
using System.Globalization;
using Microsoft.AspNetCore.Authorization;

namespace Movies.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class MovieController : Controller
    {
        public MoviesContext _context { get; }
        private readonly IOptions<CloudinarySettings> _cloudConfig;
        private Cloudinary _cloudinary;
        private readonly IMapper _mapper;
        public MovieController(MoviesContext context, IOptions<CloudinarySettings> cloudConfig, IMapper mapper)
        {
            this._mapper = mapper;
            _context = context;
            _cloudConfig = cloudConfig;
            Account acc = new Account(
               _cloudConfig.Value.CloudName,
               _cloudConfig.Value.ApiKey,
               _cloudConfig.Value.ApiSecret
               );
            _cloudinary = new Cloudinary(acc);
        }
        [HttpGet]
        [AllowAnonymous]
        public  async Task<IActionResult> GetMovies(MovieParams movieParams)
        {
            var movies = _context.Movies.Include(x => x.Photos).OrderByDescending(x => x.YearOfRelease).AsQueryable();
            if (!string.IsNullOrEmpty(movieParams.Genre))
                movies = movies.Where(m => m.Genre == movieParams.Genre);

            if(!string.IsNullOrEmpty(movieParams.Name))
                movies = movies.Where(m => m.Name.ToLower().StartsWith(movieParams.Name.ToLower()));

            if(!string.IsNullOrEmpty(movieParams.OrderBy) && movieParams.OrderBy == "price")
                movies = movies.OrderByDescending(x => x.Price);

            if(!string.IsNullOrEmpty(movieParams.OrderBy) && movieParams.OrderBy == "year")
                movies = movies.OrderByDescending(x => x.YearOfRelease);

            var pagedMovies = await PagedList<Movie>.CreateAsync(movies, movieParams.PageNumber, movieParams.PageSize);
            var moviesToReturn = _mapper.Map<IEnumerable<MovieForListDto>>(pagedMovies);
            Response.AddPagination(pagedMovies.CurrentPage, pagedMovies.PageSize, pagedMovies.TotalCount, pagedMovies.TotalPages);
            return Ok(moviesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovie(int id)
        {
            var movie = await _context.Movies.Include(x => x.Photos).FirstOrDefaultAsync(x => x.Id == id);
            var movieForReturn = new MovieForListDto();
            var mappedMovie = _mapper.Map(movie,movieForReturn);
            movieForReturn.Photos = movieForReturn.Photos.OrderByDescending(x => x.isMain == true);
            return Ok(mappedMovie);
        }

        [HttpPost]
        public IActionResult AddMovie([FromForm]MovieForAddingDto movieForAddingDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var file = movieForAddingDto.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(300).Height(450)
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);

                }
                movieForAddingDto.PublicId = uploadResult.PublicId;
                movieForAddingDto.PhotoUrl = uploadResult.Uri.ToString();
            }

            var movie = _mapper.Map<Movie>(movieForAddingDto);
            var photo = new Photo
            {
                Url = movieForAddingDto.PhotoUrl,
                PublicId = movieForAddingDto.PublicId,
                Movie = movie
            };

            if (!movie.Photos.Any())
            {
                photo.isMain = true;
            }

            movie.Photos.Add(photo);

            _context.Movies.Add(movie);
            var movieToReturn = new MovieForListDto();


            _context.SaveChanges();
            _mapper.Map(movie, movieToReturn);

            return Ok(movieToReturn);
        }

        [HttpPost("addMovieWithoutPhoto", Name = "AddWithOutPhoto")]
        public IActionResult AddWithOutPhoto([FromBody] MovieForAddingDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movie = new Movie();
            _mapper.Map(dto, movie);
            _context.Add(movie);
            _context.SaveChanges();

            return Ok(movie);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]MovieForEditDto editDto)
        {
            var movieToEdit = _context.Movies.Include(p => p.Photos).FirstOrDefault(x => x.Id == id);
            var photos = movieToEdit.Photos;
            if (movieToEdit == null)
            {
                return BadRequest();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            movieToEdit.Genre = editDto.Genre;
            movieToEdit.Name = editDto.Name;
            movieToEdit.Price = editDto.Price;
            movieToEdit.Rating = editDto.Rating;
            movieToEdit.Photos = photos;
            movieToEdit.YearOfRelease = editDto.YearOfRelease;

            _context.Movies.Update(movieToEdit);
            _context.SaveChanges();
            return Ok(movieToEdit);
        }

        [HttpPost("editPhotos/{movieId}")]
        public IActionResult EditMoviePhotos([FromForm]MoviePhotoForCreationDto PhotoDto, int movieId)
        {
            var movie = _context.Movies.Include(p => p.Photos).FirstOrDefault(x => x.Id == movieId);
            if (movie == null)
            {
                return BadRequest("Movie does not exist");
            }
            var file = PhotoDto.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {

                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(600).Height(600)
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);

                }
                PhotoDto.PublicId = uploadResult.PublicId;
                PhotoDto.PhotoUrl = uploadResult.Uri.ToString();
            }

            movie.PhotoUrl = PhotoDto.PhotoUrl;
            var photo = new Photo
            {
                Url = PhotoDto.PhotoUrl,
                PublicId = PhotoDto.PublicId,
                Movie = movie
            };
            movie.Photos.Add(photo);
            _context.Movies.Update(movie);
            _context.SaveChanges();
            return Ok(photo);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var movie = _context.Movies.Find(id);
            if (movie == null)
                return BadRequest();

            _context.Movies.Remove(movie);
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("{movieId}/setMain/{photoId}")]
        public IActionResult SetMainPhoto(int movieId, int photoId)
        {
            var movie = _context.Movies.Include(x => x.Photos).FirstOrDefault(x => x.Id == movieId);
            if (movie == null)
                return BadRequest();
            var currentMainPhoto = movie.Photos.FirstOrDefault(x => x.isMain);
            var newMainPhoto = movie.Photos.FirstOrDefault(x => x.Id == photoId);
            if (newMainPhoto.isMain != true)
            {
                newMainPhoto.isMain = true;
                if (currentMainPhoto != null)
                    currentMainPhoto.isMain = false;
            }

            _context.Movies.Update(movie);
            _context.SaveChanges();
            return Ok(newMainPhoto);
        }

        [HttpDelete("{movieId}/deletePhoto/{photoid}")]
        public IActionResult DeletePhoto(int movieId, int photoId)
        {
            var movie = _context.Movies.Include(x => x.Photos).FirstOrDefault(x => x.Id == movieId);
            if (movie == null)
                return BadRequest();

            var photo = movie.Photos.FirstOrDefault(x => x.Id == photoId);
            if (photo != null)
                movie.Photos.Remove(photo);

            _context.Movies.Update(movie);
            var deleteParams = new DeletionParams(photo.PublicId);
            _cloudinary.Destroy(deleteParams);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPost("addToCart/{movieId}")]
        public IActionResult AddToCart(int movieId)
        {
            var movie = _context.Movies.Find(movieId);
            movie.InCart = true;
            _context.Movies.Update(movie);
            _context.SaveChanges();
            return Ok();
        }
        [HttpPost("removeFromCart/{movieId}")]
        public IActionResult RemoveFromCart(int movieId)
        {
            var movie = _context.Movies.Find(movieId);
            movie.InCart = false;
            _context.Movies.Update(movie);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("moviesInCart")]
        [AllowAnonymous]
        public IActionResult MoviesInCart()
        {
            var movies = _context.Movies.Where(m => m.InCart == true);
            return Ok(movies.ToArray());
        }

        [HttpGet("clearCart")]
        [AllowAnonymous]
        public async Task<IActionResult> ClearCart(MovieParams movieParams)
        {
            var movies = _context.Movies.Include(x => x.Photos);
            foreach (var movie in movies)
            {
                movie.InCart = false;
            }
            var pagedMovies = await PagedList<Movie>.CreateAsync(movies, movieParams.PageNumber, movieParams.PageSize);
            var moviesToReturn = _mapper.Map<IEnumerable<MovieForListDto>>(pagedMovies);
            _context.SaveChanges();
            return Ok(moviesToReturn);
        }

        [HttpGet("AddToFavorites")]
        public IActionResult AddToFavorites([FromQuery]int movieId, int userId)
        {
            var movie = _context.Movies.Find(movieId);
            var user = _context.Users.Find(userId);

            if(movie == null || user == null){
                return BadRequest();
            }
            var favoriteMovie = new FavoriteMovie
            {
                User = user,
                Movie = movie
            };
            _context.FavoriteMovies.Add(favoriteMovie);
            _context.SaveChanges();
            return Ok(favoriteMovie); 
        }
        [HttpGet("checkIsMovieInFavorites")]
        public bool checkIsMovieInFavorites(int movieId,int userId)
        {
            return _context.FavoriteMovies.Any(x => x.MovieId == movieId && x.UserId == userId);
        }

        [HttpGet("removeFromFavorites")]
        public IActionResult removeFromFavorites(int? movieId,int? userId)
        {
            if(movieId != null || userId != null)
            {
                var favMovie = _context.FavoriteMovies.FirstOrDefault(x => x.UserId == userId && x.MovieId == movieId);
                if(favMovie != null){
                _context.FavoriteMovies.Remove(favMovie);
                _context.SaveChanges();
                }
                return Ok(favMovie);
            }
            return BadRequest();
        }

        [HttpGet("favoriteMovies")]
        public IActionResult GetFavoriteMovies(int userId)
        {
            var favMovies = _context.FavoriteMovies.Where(x => x.UserId == userId);
            var movies = _context.Movies.Include(x => x.Photos).ToList();
            var favToReturn = new List<Movie>();
            foreach(var faMov in favMovies)
            {
                favToReturn.AddRange(movies.Where(x => x.Id == faMov.MovieId).ToList());
            }

            return Ok(favToReturn);
        }

    }
}
