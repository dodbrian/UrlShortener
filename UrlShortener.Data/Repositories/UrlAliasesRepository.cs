using System;
using System.Linq;
using UrlShortener.Core.Interfaces;
using UrlShortener.Core.Model;
using UrlShortener.Data.Context;

namespace UrlShortener.Data.Repositories
{
    public class UrlAliasesRepository : IUrlAliasesRepository
    {
        private readonly UrlShortenerContext _context;

        public UrlAliasesRepository(UrlShortenerContext context)
        {
            _context = context;
        }

        public void Create(UrlAlias urlAlias)
        {
            if (urlAlias == null) throw new ArgumentNullException(nameof(urlAlias));

            _context.UrlAliases.Add(urlAlias);
        }

        public void Delete(long id)
        {
            var urlAlias = _context.UrlAliases.FirstOrDefault(alias => alias.Id == id);
            if (urlAlias == null) return;

            _context.UrlAliases.Remove(urlAlias);
        }

        public bool Exists(long id)
        {
            return _context.UrlAliases.Any(alias => alias.Id == id);
        }

        public UrlAlias GetUrlAlias(long id)
        {
            return _context.UrlAliases.FirstOrDefault(alias => alias.Id == id);
        }

        public UrlAlias GetUrlAliasByAlias(string urlAlias)
        {
            return _context.UrlAliases
                .FirstOrDefault(alias => alias.Alias == urlAlias);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}