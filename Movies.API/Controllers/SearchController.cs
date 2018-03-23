using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Google.Apis.Services;
using Google.Apis.YouTube.v3;

namespace Movies.API.Controllers
{
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        public IActionResult GetTrailer([FromQuery]string movieName)
        {
                 var youtubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = "AIzaSyA6OBXnmVqTHxxvuq78f3rerkdlL1PgyZI",
                ApplicationName = this.GetType().ToString()
            });

            var searchListRequest = youtubeService.Search.List("snippet");
            searchListRequest.Q = movieName; 
            searchListRequest.MaxResults = 5;

           
            var searchListResponse =  searchListRequest.Execute();

            List<string> videos = new List<string>();

            // Add each result to the appropriate list, and then display the lists of
            // matching videos, channels, and playlists.
            foreach (var searchResult in searchListResponse.Items)
            {
                switch (searchResult.Id.Kind)
                {
                    case "youtube#video":
                        videos.Add(searchResult.Id.VideoId);
                        break;
                }
            }

            return Ok(videos);
        }
    }
}