
using _444Car.AuthServices;
using _444Car.Interface;
using _444Car.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _444Car.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class CityController : ControllerBase
    {

        private readonly IJWTTokenService _jwtService;
        private readonly ICityRepository _cityRepo;

        public CityController(IJWTTokenService jwtService, ICityRepository cityRepo)
        {
            _jwtService = jwtService;
            _cityRepo = cityRepo;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetCities()
        {
            try
            {
                string cookieValueFromContext = HttpContext.Request.Cookies["444Car"];
                var currentUser = _jwtService.DecodeJWT(cookieValueFromContext);
                if (currentUser == null)
                {
                    return BadRequest(ModelState);
                }
                var result = await _cityRepo.GetCities();
                if (result == null)
                    return NotFound();

                return Ok(new { result = result });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievering data from database " + ex.ToString());
            }
        }

        [AllowAnonymous]
        [HttpGet("{CountryId}")]
        public async Task<ActionResult> GetCities(int CountryId)
        {
            try
            {
                string cookieValueFromContext = HttpContext.Request.Cookies["444Car"];
                var currentUser = _jwtService.DecodeJWT(cookieValueFromContext);
                
                if (currentUser == null)
                {
                    return BadRequest(ModelState);
                }
                
                var  result = await _cityRepo.GetCities(CountryId);
                
                if (result == null)
                    return NotFound();

                return Ok(new { result = result });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievering data from database " + ex.ToString());
            }
        }
    }
}
