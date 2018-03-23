using Microsoft.EntityFrameworkCore;
using Movies.API.Models;

namespace Movies.API.Data
{
    public class MoviesContext : DbContext
    {
        public MoviesContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Movie> Movies { get; set; }  
        public DbSet<User> Users { get; set; }   

        public DbSet<FavoriteMovie> FavoriteMovies { get; set; }
    }
}