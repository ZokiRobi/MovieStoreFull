namespace Movies.API.Dtos
{
    public class MoviePhotoForReturnDto
    {
        public string PhotoUrl { get; set; }
        public string PublicId { get; set; }

        public bool isMain { get; set; }
    }
}