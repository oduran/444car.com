using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _444Car.Interface;
using _444Car.InternalModels;
using _444Car.Models;
using _444Car.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace _444Car.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class BussinesController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly IBussinesRepository BussinesRep;

        public BussinesController(IBussinesRepository BussinesRep)
        {
            this.BussinesRep = BussinesRep;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetColors()
        {
            try
            {

                var result = await BussinesRep.GetCollors();

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
        public async Task<ActionResult> GetColors(int CountryId)
        {
            try
            {

                var result = await BussinesRep.GetCollors(CountryId);

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
