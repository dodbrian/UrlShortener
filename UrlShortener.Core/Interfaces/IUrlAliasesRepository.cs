using UrlShortener.Core.Model;

namespace UrlShortener.Core.Interfaces
{
    public interface IUrlAliasesRepository
    {
        /// <summary>
        /// Creates new UrlAlias
        /// </summary>
        /// <param name="urlAlias">New UrlAlias</param>
        void Create(UrlAlias urlAlias);

        /// <summary>
        /// Retrieves UrlAlias by Id
        /// </summary>
        /// <param name="id">UrlAlias identity</param>
        /// <returns>UrlAlias specified by Id</returns>
        UrlAlias GetUrlAlias(long id);

        /// <summary>
        /// Deletes UrlAlias
        /// </summary>
        /// <param name="id">UrlAlias identity</param>
        void Delete(long id);

        /// <summary>
        /// Checks for existence of UrlAlias
        /// </summary>
        /// <param name="id">UrlAlias identity</param>
        /// <returns>True, if UrlAlias exists</returns>
        bool Exists(long id);

        /// <summary>
        /// Saves changes to data context
        /// </summary>
        void SaveChanges();
    }
}