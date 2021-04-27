using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using _444Car.AuthServices;
using _444Car.Interface;
using _444Car.InternalModels;
using _444Car.Models;
using _444Car.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace _444Car.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly AppDbContext _context;
        private IWebHostEnvironment iwebHostEnvironment;

        private readonly IAdvertiseRepository AdvertiseRep;
        private readonly IBrandRepository BrandRep;
        private readonly IJWTTokenService authService;
        private readonly ISendEmailRepository sendMailRepo;
        private readonly IUserRepository userRepo;
        private readonly ILogRepository logRepo;
        private readonly IPaymentRepository payRepo;

        public PaymentController(IWebHostEnvironment _iwebHostEnvironment, IAdvertiseRepository AdvertiseRep, IBrandRepository BrandRep, IJWTTokenService _authService,
            IUserRepository _userRepo, ISendEmailRepository _sendMailRepo, ILogRepository _logRepo, IPaymentRepository _payRepo)
        {
            this.AdvertiseRep = AdvertiseRep;
            this.BrandRep = BrandRep;
            this.iwebHostEnvironment = _iwebHostEnvironment;
            this.authService = _authService;
            this.userRepo = _userRepo;
            this.sendMailRepo = _sendMailRepo;
            this.logRepo = _logRepo;
            this.payRepo = _payRepo;
        }



        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> AddPayment(t_Payments paymentObj)
        {
            var result = await payRepo.AddPayment(paymentObj);

            try
            {
                var ptype = 10;
                var pLogAciklama = "Ödeme Yapıldı";

                t_UsersLog logObj = new t_UsersLog();
                logObj.created_dt = DateTime.Now;
                logObj.userid = paymentObj.user_id;
                logObj.typeid = ptype;
                logObj.description = pLogAciklama;
                logObj.advertise_id = paymentObj.advertise_id;
                logObj.offer_id = paymentObj.offer_id;

                await logRepo.AddLogEvent(logObj);
            }
            catch
            {
                //log atılırken hata alınırsa dikkate alma
            }

            return Ok(new { result = result });
        }



        [AllowAnonymous]
        [HttpGet("{userId}")]
        public async Task<ActionResult> GetPaymentsByUserId(long userId)
        {
            try
            {
                string cookieValueFromContext = HttpContext.Request.Cookies["444Car"];
                var currentUser = authService.DecodeJWT(cookieValueFromContext);

                if (currentUser == null)
                {
                    return BadRequest("Kullanıcı bulunamadı..!");
                }
                if (!ModelState.IsValid)
                    return BadRequest("Kullanıcı bulunamadı");

                
                List<t_Payments> resultList = await payRepo.GetPaymentsByUserId(userId);

                return Ok(new { result = resultList });
            }
            catch
            {
                return BadRequest(new { result = "Kayıt Bulunamadı..!" });
            }
        }

        [AllowAnonymous]
        [HttpGet("{advertisesId}")]
        public async Task<ActionResult> GetPaymentsByAdvertisesId(long advertisesId)
        {
            try
            {
                string cookieValueFromContext = HttpContext.Request.Cookies["444Car"];
                var currentUser = authService.DecodeJWT(cookieValueFromContext);

                if (currentUser == null)
                {
                    return BadRequest("Kullanıcı bulunamadı..!");
                }
                if (!ModelState.IsValid)
                    return BadRequest("Kullanıcı bulunamadı");


                List<t_Payments> resultList = await payRepo.GetPaymentsByAdvertisesId(advertisesId);

                return Ok(new { result = resultList });
            }
            catch
            {
                return BadRequest(new { result = "Kayıt Bulunamadı..!" });
            }
        }

        [AllowAnonymous]
        [HttpGet("{offersId}")]
        public async Task<ActionResult> GetPaymentsByOffersId(long offersId)
        {
            try
            {
                string cookieValueFromContext = HttpContext.Request.Cookies["444Car"];
                var currentUser = authService.DecodeJWT(cookieValueFromContext);

                if (currentUser == null)
                {
                    return BadRequest("Kullanıcı bulunamadı..!");
                }
                if (!ModelState.IsValid)
                    return BadRequest("Kullanıcı bulunamadı");


                List<t_Payments> resultList = await payRepo.GetPaymentsByOffersId(offersId);

                return Ok(new { result = resultList });
            }
            catch
            {
                return BadRequest(new { result = "Kayıt Bulunamadı..!" });
            }
        }




    }
}
