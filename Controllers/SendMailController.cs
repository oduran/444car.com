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
    [ApiController]
    [Route("[controller]/[action]")]
    public class SendMailController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly ISendEmailRepository sendMailRep;

        public SendMailController(ISendEmailRepository sendMailRep)
        {
            this.sendMailRep = sendMailRep;
        }



        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetAllMails(int days)
        {
            try
            {
                var result = await sendMailRep.GetAllMails(days);
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
        public async Task<ActionResult> GetAllWaitingMails(int days)
        {
            try
            {
                var result = await sendMailRep.GetAllWaitingMails(days);
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
        public async Task<ActionResult> SendMailFromUI([FromBody]Mail mailObj)
        {
            var guidId = Guid.NewGuid();
            _ = await sendMailRep.SendMail(mailObj, guidId);

            return Ok();
        }
    }
}
