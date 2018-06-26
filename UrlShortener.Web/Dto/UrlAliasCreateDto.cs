namespace UrlShortener.Web.Dto
{
    public class UrlAliasCreateDto
    {
        /// <summary>
        /// Original full-length URL
        /// </summary>
        public string OriginalUrl { get; set; }

        /// <summary>
        /// Shortened URL name
        /// </summary>
        public string Alias { get; set; }
    }

}