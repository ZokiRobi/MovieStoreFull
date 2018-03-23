namespace Movies.API.Helpers
{
    public class MovieParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;

        public string Genre { get; set; }

        public string Name { get; set; }

        public string OrderBy { get; set; }
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = value > MaxPageSize ? MaxPageSize : value; }
        }
    }
}