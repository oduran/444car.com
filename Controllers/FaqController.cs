using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _444Car.Interface;
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
    public class FaqController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly IFaqRepository faqRep;

        public FaqController(IFaqRepository faqRep)
        {
            this.faqRep = faqRep;
        }



        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetFaqByType(int type, int language)
        {
            try
            {
                var result = await faqRep.GetFaqByType(type, language);
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
        [HttpGet("{language}")]
        public async Task<ActionResult> GetAllFaqByLanguage(int language)
        {
            try
            {
                var result = await faqRep.GetAllFaqByLanguage(language);
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
        [HttpGet]
        public async Task<ActionResult> GetAllFaqs()
        {
            try
            {
                var result = await faqRep.GetAllFaqs();
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
        [HttpPost]
        public async Task<ActionResult<t_Faq>> AddFaq(t_Faq faqListObj)
        {
            var result = await faqRep.AddFaq(faqListObj);
            return Ok();
        }


        [HttpPost]
        public async Task<ActionResult> UpdateFaq(t_Faq faqObj)
        {
            try
            {

                t_Faq result = await faqRep.UpdateFaq(faqObj);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "UpdateFaq Error retrievering data from database " + ex.ToString());
            }
        }

        [HttpPost]
        public async Task<ActionResult> RemoveFaq(t_Faq faqObj)
        {
            try
            {

                t_Faq result = await faqRep.RemoveFaq(faqObj);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "UpdateFaq Error retrievering data from database " + ex.ToString());
            }
        }

    }
}
