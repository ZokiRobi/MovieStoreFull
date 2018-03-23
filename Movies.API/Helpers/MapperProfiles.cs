using System.Linq;
using AutoMapper;
using Movies.API.Dtos;
using Movies.API.Models;

namespace Movies.API.Helpers
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            CreateMap<Photo, MoviePhotoForCreationDto>();

            CreateMap<MoviePhotoForCreationDto, Photo>();

            CreateMap<Movie, MovieForAddingDto>();

            CreateMap<MovieForAddingDto, Movie>();

            CreateMap<MoviePhotoForCreationDto,MoviePhotoForReturnDto>();

            CreateMap<Movie, MovieForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.isMain).Url);
            });

            CreateMap<Movie,MovieForEditDto>()
            .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.isMain).Url);
            });
            
            CreateMap<MovieForEditDto,Movie>();

        }
    }
}