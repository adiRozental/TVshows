using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
using TVShowsApi.Models;

namespace TVShowsApi.Controllers
{
    public class ShowsController : Controller
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ShowsController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("api/shows")]
        public async Task<IActionResult> GetShows([FromQuery] string query = "")
        {
            string apiUrl = "https://api.tvmaze.com/shows";
            if (!string.IsNullOrEmpty(query))
            {
                apiUrl = $"https://api.tvmaze.com/search/shows?q={query}";
            }

            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync(apiUrl);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException("Failed to fetch data from TVMaze API.");
            }

            var responseData = await response.Content.ReadAsStringAsync();


            IEnumerable<ShowDto> shows;

            if (string.IsNullOrEmpty(query))
            {
                // Deserialize the data
                var showsData = JsonSerializer.Deserialize<List<TVShow>>(responseData);

                // Map the required fields
                 shows = showsData.Select(show => new ShowDto
                {
                     Id = show.Id,
                     Name = show.Name,
                    Genres = show.Genres,
                    Image = show.Image?.Medium ?? "",
                    Premiered = show.Premiered,
                    Language = show.Language,
                    Rating = show.Rating?.Average,
                    Summary = show.Summary
                });
            }
            else
            {
                var showsData = JsonSerializer.Deserialize<List<SearchResult>>(responseData);
                shows = showsData.Select(nshow => new ShowDto
                {
                    Id = nshow.show.Id,
                    Name = nshow.show.Name,
                    Genres = nshow.show.Genres,
                    Image = nshow.show.Image?.Medium ?? "",
                    Premiered = nshow.show.Premiered,
                    Language = nshow.show.Language,
                    Rating = nshow.show.Rating?.Average,
                    Summary = nshow.show.Summary
                });
            }

            return Ok(shows);
        }
        [HttpGet("api/shows/{id}/episodes")]
        public async Task<IActionResult> GetEpisodes(int id )
        {
            string  apiUrl = $"https://api.tvmaze.com/shows/{id}/episodes";
           
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync(apiUrl);

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException("Failed to fetch data from TVMaze API.");
            }
            var responseData = await response.Content.ReadAsStringAsync();

            return Ok(responseData);
        }

    }

    
}
