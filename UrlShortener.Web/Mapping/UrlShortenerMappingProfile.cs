using AutoMapper;
using UrlShortener.Core.Model;
using UrlShortener.Web.Dto;

namespace UrlShortener.Web.Mapping
{
    /// <summary>
    /// Automapper Profile
    /// </summary>
    public class UrlShortenerMappingProfile : Profile
    {
        public UrlShortenerMappingProfile()
        {
            CreateMap<UrlAliasCreateDto, UrlAlias>();
            CreateMap<UrlAliasUpdateDto, UrlAlias>();
        }
    }
}