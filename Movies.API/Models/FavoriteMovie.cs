namespace Movies.API.Models
{
    public class FavoriteMovie
    {
        public int Id { get; set; }
        public Movie Movie { get; set; }

        public int MovieId { get; set; }

        public User User { get; set; }
        public int UserId { get; set; }
    }
}