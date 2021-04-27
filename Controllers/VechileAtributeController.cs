
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
    public class VechileAtributeController : ControllerBase
    {

        private readonly IVechileAtributeRepository vechileAtributeRep;
        

        public VechileAtributeController(IVechileAtributeRepository vechileAtributeRep)
        {
            this.vechileAtributeRep = vechileAtributeRep;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetAtributesGroup()
        {
            try
            {
                var result = await vechileAtributeRep.GetAtributesGroup();
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
        public async Task<ActionResult> GetAtributesGroup(int CountryId)
        {
            try
            {
                var result = await vechileAtributeRep.GetAtributesGroup(CountryId);
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
        public async Task<ActionResult> GetAtributesByName(int CountryId, string GroupName)
        {
            try
            {
                var result = await vechileAtributeRep.GetAtributesGroupByName(CountryId, GroupName);
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
