using Microsoft.AspNetCore.Http;

namespace Movies.API.Dtos
{
    public class MoviePhotoForCreationDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public IFormFile File { get; set; }

        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }
        
        public bool isMain { get; set; }
    }
}