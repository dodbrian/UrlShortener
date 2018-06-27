namespace UrlShortener.Core.Model
{
    /// <summary>
    /// UrlAlias model
    /// </summary>
    public class UrlAlias
    {
        private UrlAlias() { }

        /// <summary>
        /// Creates new UrlAlias
        /// <paramref name="originalUrl">Original full-length URL</paramref>
        /// <paramref name="alias">Shortened URL name</paramref>
        /// </summary>
        public UrlAlias(string originalUrl, string alias)
        {
            OriginalUrl = originalUrl;
            Alias = alias;
        }

        /// <summary>
        /// UrlAlias identity
        /// </summary>
        public long Id { get; private set; }

        /// <summary>
        /// Original full-length URL
        /// </summary>
        public string OriginalUrl { get; private set; }

        /// <summary>
        /// Shortened URL name
        /// </summary>
        public string Alias { get; private set; }
    }
}