using System;

namespace Movies.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }

        public bool isMain { get; set; }
        public string PublicId { get; set; }
        public Movie Movie { get; set; }
        public int MovieId { get; set; }
    }
}