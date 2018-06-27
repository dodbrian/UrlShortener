using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using UrlShortener.Core.Interfaces;
using UrlShortener.Core.Model;
using UrlShortener.Web.Dto;

namespace UrlShortener.Web.Controllers
{
    /// <summary>
    /// UrlAliases controller
    /// </summary>
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

        /// <summary>
        /// Returns UrlAlias by Id
        /// </summary>
        /// <param name="id">UrlAlias identity</param>
        /// <returns>Opertaion result</returns>
        [HttpGet("{id}", Name = GetUrlAliasName)]
        public IActionResult GetUrlAlias(long id)
        {
            var urlAlias = _urlAliasesRepository.GetUrlAlias(id);
            if (urlAlias == null) return NotFound();

            return Ok(_mapper.Map<UrlAliasDto>(urlAlias));
        }

        /// <summary>
        /// Returns UrlAlias by its name
        /// </summary>
        /// <param name="alias">UrlAlias name</param>
        /// <returns>Opertaion result</returns>
        [HttpGet("getByAlias/{alias}")]
        public IActionResult GetUrlAliasByAlias(string alias)
        {
            alias = alias?.Trim();
            if (string.IsNullOrWhiteSpace(alias)) return BadRequest();

            var urlAlias = _urlAliasesRepository.GetUrlAliasByAlias(alias);
            if (urlAlias == null) return NotFound();

            return Ok(_mapper.Map<UrlAliasDto>(urlAlias));
        }

        /// <summary>
        /// Creates new UrlAlias
        /// </summary>
        /// <param name="urlAliasDto">UrlAlias to be created</param>
        /// <returns>Opertaion result</returns>
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

        /// <summary>
        /// Updates existing UrlAlias
        /// </summary>
        /// <param name="id">UrlAlias identity</param>
        /// <param name="urlAliasDto">UrlAlias to be updated</param>
        /// <returns>Opertaion result</returns>
        [HttpPut("{id}")]
        public IActionResult UpdateUrlAlias(long id, [FromBody] UrlAliasUpdateDto urlAliasDto)
        {
            if (id <= 0
                || urlAliasDto == null
                || string.IsNullOrWhiteSpace(urlAliasDto.OriginalUrl)
                || string.IsNullOrWhiteSpace(urlAliasDto.Alias))
                return BadRequest();

            var urlAlias = _urlAliasesRepository.GetUrlAlias(id);
            if (urlAlias == null) return NotFound();

            _mapper.Map(urlAliasDto, urlAlias);
            _urlAliasesRepository.SaveChanges();

            return NoContent();
        }

        /// <summary>
        /// Deletes existing UrlAlias
        /// </summary>
        /// <param name="id">UrlAlias identity</param>
        /// <returns>Opertaion result</returns>
        [HttpDelete("{id}")]
        public IActionResult DeleteUrlAlias(long id)
        {
            if (id <= 0) return BadRequest();
            if (!_urlAliasesRepository.Exists(id)) return NotFound();

            _urlAliasesRepository.Delete(id);
            _urlAliasesRepository.SaveChanges();

            return NoContent();
        }
    }
}