using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UrlShortener.Core.Interfaces;
using UrlShortener.Core.Model;
using UrlShortener.Web.Dto;

namespace UrlShortener.Web.Controllers
{
    [Route("api/urlaliases")]
    public class UlrAliasesController : Controller
    {
        private const string GetUrlAliasName = "GetUrlAlias";
        private readonly IMapper _mapper;
        private readonly IUrlAliasesRepository _urlAliasesRepository;

        public UlrAliasesController(
            IMapper mapper,
            IUrlAliasesRepository urlAliasesRepository)
        {
            _mapper = mapper;
            _urlAliasesRepository = urlAliasesRepository;
        }

        [HttpGet("{id}", Name = GetUrlAliasName)]
        public IActionResult GetUrlAlias(long id)
        {
            var urlAlias = _urlAliasesRepository.GetUrlAlias(id);
            if (urlAlias == null) return BadRequest();

            return Ok(_mapper.Map<UrlAliasDto>(urlAlias));
        }

        [HttpPost]
        public IActionResult CreateUrlAlias([FromBody] UrlAliasCreateDto urlAliasDto)
        {
            if (urlAliasDto == null
                || string.IsNullOrWhiteSpace(urlAliasDto.OriginalUrl)
                || string.IsNullOrWhiteSpace(urlAliasDto.Alias))
                return BadRequest();

            var urlAlias = _mapper.Map<UrlAlias>(urlAliasDto);
            _urlAliasesRepository.Create(urlAlias);
            _urlAliasesRepository.SaveChanges();

            return CreatedAtRoute(GetUrlAliasName, new { id = urlAlias.Id }, _mapper.Map<UrlAliasDto>(urlAlias));
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUrlAlias(long id, [FromBody] UrlAliasUpdateDto urlAliasDto)
        {
            if (id <= 0
                || urlAliasDto == null
                || string.IsNullOrWhiteSpace(urlAliasDto.OriginalUrl)
                || string.IsNullOrWhiteSpace(urlAliasDto.Alias))
                return BadRequest();

            var urlAlias = _urlAliasesRepository.GetUrlAlias(id);
            if (urlAlias == null) return BadRequest();

            _mapper.Map(urlAliasDto, urlAlias);
            _urlAliasesRepository.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUrlAlias(long id)
        {
            if (id <= 0 || !_urlAliasesRepository.Exists(id)) return BadRequest();

            _urlAliasesRepository.Delete(id);
            _urlAliasesRepository.SaveChanges();

            return NoContent();
        }
    }
}