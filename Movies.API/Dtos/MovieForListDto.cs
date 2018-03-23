using System.Collections.Generic;
using Movies.API.Models;

namespace Movies.API.Dtos
{
    public class MovieForListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Genre { get; set; }
        public int Rating { get; set; }
        public string YearOfRelease { get; set; }
        public string PhotoUrl { get; set; }
        
        public bool InCart { get; set; }
        public IEnumerable<Photo> Photos { get; set; }
        public double Price { get; set; }
    }
}