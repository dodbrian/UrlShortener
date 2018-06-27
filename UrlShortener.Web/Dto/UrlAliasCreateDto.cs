namespace UrlShortener.Web.Dto
{
    /// <summary>
    /// UrlAlias DTO used for creation
    /// </summary>
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