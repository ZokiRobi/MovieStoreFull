using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Movies.API.Dtos
{
    public class MovieForEditDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Genre { get; set; }

        [Required]
        public int YearOfRelease { get; set; }

        [Required]
        public int Rating { get; set; }

        public IFormFile File { get; set; }


        [Required]
        public double Price { get; set; }
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
    }
}