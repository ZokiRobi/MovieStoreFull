using System;
using System.Collections.Generic;
using System.Linq;
using Movies.API.Models;
using Newtonsoft.Json;

namespace Movies.API.Data
{
    public class Seed
    {
        private readonly MoviesContext _context;

        public Seed(MoviesContext context)
        {
            _context = context;
        }

        public void SeedAll()
        {
            try
            {
                SeedMovies();
                SeedUsers();
            }
            catch (Exception)
            {
            }

        }
        private void SeedUsers()
        {
            if (!_context.Users.Any())
            {
                byte[] AdminPasswordHash, AdminPasswordSalt;
                CreatePasswordHash("admin", out AdminPasswordHash, out AdminPasswordSalt);
                var admin = new User
                {
                    Username = "Admin",
                    PasswordHash = AdminPasswordHash,
                    PasswordSalt = AdminPasswordSalt,
                    Role = "admin"
                };

                byte[] UserPasswordHash, UserPasswordSalt;
                CreatePasswordHash("user1", out UserPasswordHash, out UserPasswordSalt);
                var user = new User
                {
                    Username = "User",
                    PasswordHash = UserPasswordHash,
                    PasswordSalt = UserPasswordSalt,
                    Role = ""
                };
                _context.Users.AddRange(admin, user);
                _context.SaveChanges();
            }
        }
        private void SeedMovies()
        {
            if (!_context.Movies.Any())
            {
                var movieData = System.IO.File.ReadAllText("Data/moviesForSeed.json");
                var movies = JsonConvert.DeserializeObject<List<Movie>>(movieData);
                _context.Movies.AddRange(movies);
                _context.SaveChanges();
            }
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

    }
}