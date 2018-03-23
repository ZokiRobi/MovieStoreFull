using System.ComponentModel.DataAnnotations;

namespace Movies.API.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required,StringLength(8,MinimumLength = 4, ErrorMessage = "Password must be between 4 and 8 charachters.")]
        public string Password { get; set; }
    }
}