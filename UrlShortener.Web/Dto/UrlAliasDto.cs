namespace UrlShortener.Web.Dto
{
    public class UrlAliasDto
    {
        /// <summary>
        /// UrlAlias identity
        /// </summary>
        public long Id { get; set; }

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