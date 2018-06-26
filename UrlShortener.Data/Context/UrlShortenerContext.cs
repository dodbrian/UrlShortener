using Microsoft.EntityFrameworkCore;
using UrlShortener.Core.Model;

namespace UrlShortener.Data.Context
{
    public class UrlShortenerContext : DbContext
    {
        public DbSet<UrlAlias> UrlAliases { get; set; }

        public UrlShortenerContext(DbContextOptions<UrlShortenerContext> options)
            : base(options) { }
    }
}