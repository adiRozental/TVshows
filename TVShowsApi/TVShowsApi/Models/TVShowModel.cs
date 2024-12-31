using System.Text.Json.Serialization;

namespace TVShowsApi.Models
{
    public class TVShow
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("genres")]
        public List<string> Genres { get; set; }

        [JsonPropertyName("image")]
        public Image Image { get; set; }

        [JsonPropertyName("premiered")]
        public string Premiered { get; set; }

        [JsonPropertyName("language")]
        public string Language { get; set; }

        [JsonPropertyName("rating")]
        public Rating Rating { get; set; }

        [JsonPropertyName("summary")]
        public string Summary { get; set; }
    }

    public class SearchResult
    {
        public TVShow show { get; set; }
    }

    public class Image
    {
        [JsonPropertyName("medium")]
        public string Medium { get; set; }

        [JsonPropertyName("original")]
        public string Original { get; set; }
    }

    public class Rating
    {
        [JsonPropertyName("average")]
        public double? Average { get; set; }
    }

    // DTO for filtered data
    public class ShowDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<string> Genres { get; set; }
        public string Image { get; set; }
        public string Premiered { get; set; }
        public string Language { get; set; }
        public double? Rating { get; set; }
        public string Summary { get; set; }
    }
}
