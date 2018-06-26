using AutoMapper;
using UrlShortener.Core.Model;
using UrlShortener.Web.Dto;

namespace UrlShortener.Web.Mapping
{
    public class UrlShortenerMappingProfile : Profile
    {
        public UrlShortenerMappingProfile()
        {
            CreateMap<UrlAliasCreateDto, UrlAlias>();
        }
    }
}