
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
    public class OfferAtributeController : ControllerBase
    {

        private readonly IOfferAtributeRepository offerAtributeRep;
        

        public OfferAtributeController(IOfferAtributeRepository offerAtributeRep)
        {
            this.offerAtributeRep = offerAtributeRep;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetOfferAtributesGroup()
        {
            try
            {
                var result = await offerAtributeRep.GetOfferAtributesGroup();
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
        public async Task<ActionResult> GetOfferAtributesGroup(int CountryId)
        {
            try
            {
                var result = await offerAtributeRep.GetOfferAtributesGroup(CountryId);
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
        [HttpGet("{CountryId}/{GroupName}")]
        public async Task<ActionResult> GetOfferAtributesByName(int CountryId, string GroupName)
        {
            try
            {
                var result = await offerAtributeRep.GetOfferAtributesGroupByName(CountryId, GroupName);
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
