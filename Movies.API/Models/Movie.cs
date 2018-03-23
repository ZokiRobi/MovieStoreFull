using System.Collections.Generic;

namespace Movies.API.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Genre { get; set; }
        public int YearOfRelease { get; set; }
        public int Rating { get; set; }

        public bool InCart { get; set; }
        public double Price { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public Movie()
        {
            Photos = new List<Photo>();
        }
    }
}