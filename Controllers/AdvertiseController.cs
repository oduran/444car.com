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
    public class AdvertiseController : ControllerBase
    {
        private readonly AppDbContext _context;
        private IWebHostEnvironment iwebHostEnvironment;

        private readonly IAdvertiseRepository AdvertiseRep;
        private readonly IBrandRepository BrandRep;
        private readonly IOfferRepository OfferRep;
        private readonly IJWTTokenService authService;
        private readonly ISendEmailRepository sendMailRepo;
        private readonly IUserRepository userRepo;
        private readonly ILogRepository logRepo;

        public AdvertiseController(IWebHostEnvironment _iwebHostEnvironment, IOfferRepository _OfferRep, IAdvertiseRepository AdvertiseRep, IBrandRepository BrandRep, IJWTTokenService _authService,
            IUserRepository _userRepo,ISendEmailRepository _sendMailRepo, ILogRepository _logRepo)
        {
            this.AdvertiseRep = AdvertiseRep;
            this.BrandRep = BrandRep;
            this.iwebHostEnvironment = _iwebHostEnvironment;
            this.authService = _authService;
            this.userRepo = _userRepo;
            this.sendMailRepo = _sendMailRepo;
            this.OfferRep = _OfferRep;
            this.logRepo = _logRepo;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> UpdateAdvertiseImages()
        {
            try
            {
                var result2 = new List<FileUploadResult>();
                var files = HttpContext.Request.Form.Files;
                //long advertiseId =  _context.t_advertises.Max(p => p.id); //Guid.NewGuid().ToString(); //ilan no olacak
                var keys = HttpContext.Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
                string advertiseId = keys["adId"];
                var a = System.IO.Directory.CreateDirectory("ClientApp/build/newhttpdocs/uploaded/advertiseDocs/" + advertiseId);
                _ = await AdvertiseRep.ClearAdDocs(long.Parse(advertiseId));

                foreach (var file in files)
                {
                    t_AdvertisesImage adImg = new t_AdvertisesImage();

                    var path = Path.Combine("", "newhttpdocs/uploaded/advertiseDocs/" + advertiseId, file.FileName);
                    var path1 = Path.Combine("", "ClientApp/build/newhttpdocs/uploaded/advertiseDocs/" + advertiseId, file.FileName);
                    var stream = new FileStream(path1, FileMode.Create);
                    await file.CopyToAsync(stream);
                    result2.Add(new FileUploadResult() { Name = file.FileName, Length = file.Length });
                    adImg.advertise_id = long.Parse(advertiseId);
                    adImg.images_link = path;
                    _ = await AdvertiseRep.AddAdDocs(adImg);
                }

                //TODO : Mail gonderimi yapılacak

                t_Advertises advertise = await AdvertiseRep.GetAdvertisesById(long.Parse(advertiseId));
                advertise.advertise_start_date = DateTime.Now;
                advertise.advertise_end_date = FindLastAdvertiseDate();//DateTime.Now.AddDays(3);
                advertise.status = "A";
                await AdvertiseRep.UpdateAdvertise(advertise);

                return await Task.FromResult(Ok());
            }
            catch (Exception e)
            {
                return Ok(-1);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> UploadAdvertiseImages()
        {
            try
            {
                var result2 = new List<FileUploadResult>();
                var files = HttpContext.Request.Form.Files;
                //long advertiseId =  _context.t_advertises.Max(p => p.id); //Guid.NewGuid().ToString(); //ilan no olacak
                var keys = HttpContext.Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
                string advertiseId = keys["adId"];
                var a = System.IO.Directory.CreateDirectory("ClientApp/build/newhttpdocs/uploaded/advertiseDocs/" + advertiseId);
                _ = await AdvertiseRep.ClearAdDocs(long.Parse(advertiseId));

                foreach (var file in files)
                {
                    t_AdvertisesImage adImg = new t_AdvertisesImage();

                    var path = Path.Combine("", "newhttpdocs/uploaded/advertiseDocs/" + advertiseId, file.FileName);
                    var path1 = Path.Combine("", "ClientApp/build/newhttpdocs/uploaded/advertiseDocs/" + advertiseId, file.FileName);
                    var stream = new FileStream(path1, FileMode.Create);
                    await file.CopyToAsync(stream);
                    result2.Add(new FileUploadResult() { Name = file.FileName, Length = file.Length });
                    adImg.advertise_id = long.Parse(advertiseId);
                    adImg.images_link = path;
                    _ = await AdvertiseRep.AddAdDocs(adImg);
                }
                return await Task.FromResult(Ok());
            }
            catch (Exception e)
            {
                return Ok(-1);
            }
        }
        
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> RemoveAdvertiseImages(AdImageListDto imageList)
        {
            try
            {
                bool flag = await AdvertiseRep.RemoveAd(imageList); //işlemler başarılı olursa ilanın başlangıç ve bitiş zamanını güncelle
                if (flag)
                {

                    t_Advertises advertise = await AdvertiseRep.GetAdvertisesById(imageList.id);
                    advertise.advertise_start_date = DateTime.Now;
                    advertise.advertise_end_date = DateTime.Now.AddDays(3);
                    advertise.status = "A";
                    await AdvertiseRep.UpdateAdvertise(advertise);

                    return await Task.FromResult(Ok());
                }

                return await Task.FromResult(Ok(-1));
            }
            catch (Exception e)
            {
                return Ok(-1);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> AddAdvertise(object jsonObj)
        {
            //var result = await AdvertiseRep.AddAdvertise(reqObj.AdvertisesObj, reqObj.AdvertisesDetailObjAdvertisesDetailObj, reqObj.AdvertisesImageObj);
            var obj = JObject.Parse(jsonObj.ToString());
            JObject RequestAdvertises = (JObject)obj["RequestAdvertises"];
            JObject AdvertisesObjArr = (JObject)RequestAdvertises["AdvertisesObj"];
            JArray AdvertisesDetailObjArr = (JArray)RequestAdvertises["AdvertisesDetailObj"];
            //JArray AdvertisesImageObjArr = (JArray)RequestAdvertises["AdvertisesImageObj"];

            List<t_AdvertisesDetail> detailList = new List<t_AdvertisesDetail>();
            for (int i = 0; i < AdvertisesDetailObjArr.Count; i++)
            {
                t_AdvertisesDetail dd = new t_AdvertisesDetail();
                var atribute_id = JObject.Parse(AdvertisesDetailObjArr[i].ToString())["atribute_id"].Value<long>();
                var value = JObject.Parse(AdvertisesDetailObjArr[i].ToString())["value"].Value<string>();
                dd.atribute_id = (int)long.Parse(atribute_id.ToString());
                dd.value = int.Parse(value.ToString());
                dd.advertise_id = 0;
                dd.id = 0;
                detailList.Add(dd);
            }

            var brandId = AdvertisesObjArr["brand_id"].Value<int>();


            if (brandId > 0)
            {
                var plaqueControl = await ChkPlaque(AdvertisesObjArr["plaque"].Value<string>());
                if (plaqueControl == null || plaqueControl.code == "")
                {
                    return Ok(new { result = "Hatalı Plaka..!" });
                }

                t_Advertises AdvertisesObj = new t_Advertises();
                AdvertisesObj.user_id = AdvertisesObjArr["user_id"].Value<long>();
                AdvertisesObj.sale_price = AdvertisesObjArr["sale_price"].Value<decimal>();
                AdvertisesObj.rental_period = AdvertisesObjArr["rental_period"].Value<int>();
                AdvertisesObj.usage = AdvertisesObjArr["usage"].Value<int>();
                AdvertisesObj.state_id = AdvertisesObjArr["state_id"].Value<int>();
                AdvertisesObj.city = AdvertisesObjArr["city"].Value<string>();
                AdvertisesObj.location = AdvertisesObjArr["location"].Value<string>();
                AdvertisesObj.posta_code = AdvertisesObjArr["posta_code"].Value<string>();
                AdvertisesObj.posta_description = AdvertisesObjArr["posta_description"].Value<string>();
                AdvertisesObj.plaque = AdvertisesObjArr["plaque"].Value<string>();
                AdvertisesObj.chassis = AdvertisesObjArr["chassis"].Value<string>();
                AdvertisesObj.brand_id = brandId;
                AdvertisesObj.production_month_id = 0;
                AdvertisesObj.production_year_id = 0;
                AdvertisesObj.model_id = 0;
                AdvertisesObj.fueltype_id = 0;
                AdvertisesObj.ps = "";
                AdvertisesObj.model_type_id = 0;
                AdvertisesObj.vehicle_body_type_id = 0;
                AdvertisesObj.vehicle_production_period_id = 0;
                AdvertisesObj.number_of_vehicle_owners = 0;
                AdvertisesObj.checkbook = AdvertisesObjArr["checkbook"].Value<int>();
                AdvertisesObj.non_smoking = AdvertisesObjArr["non_smoking"].Value<int>();
                AdvertisesObj.kilometer = AdvertisesObjArr["kilometer"].Value<string>();
                AdvertisesObj.color_id = 0;
                AdvertisesObj.metalic_color = AdvertisesObjArr["metallic_color"].Value<int>();
                AdvertisesObj.number_of_doors = 0;
                AdvertisesObj.gear = 0;
                AdvertisesObj.engine_capacity_id = 0;
                AdvertisesObj.emission_id = 0;
                AdvertisesObj.description = AdvertisesObjArr["description"].Value<string>();
                AdvertisesObj.created_dt = DateTime.Now;
                AdvertisesObj.created_by = AdvertisesObjArr["user_id"].Value<string>();
                AdvertisesObj.status = "O";
                AdvertisesObj.diffrent_car_choose = AdvertisesObjArr["diffrent_car_choose"].Value<int>();
                AdvertisesObj.warranty = AdvertisesObjArr["warranty"].Value<int>();
                AdvertisesObj.extended_warranty = AdvertisesObjArr["extended_warranty"].Value<int>();

                var result = await AdvertiseRep.AddAdvertise(AdvertisesObj, detailList);
                //SaveFileToDatabase(id, fileBytes, filename, contentType);

                try
                {
                    var ptype = 8;
                    var pLogAciklama = "ilan onay bekliyor";

                    t_UsersLog logObj = new t_UsersLog();
                    logObj.created_dt = DateTime.Now;
                    logObj.userid = AdvertisesObjArr["user_id"].Value<long>();
                    logObj.typeid = ptype;
                    logObj.description = pLogAciklama;
                    logObj.advertise_id = result;

                    await logRepo.AddLogEvent(logObj);
                }
                catch
                {
                    //log atılırken hata alınırsa dikkate alma
                }

                return Ok(new { result = result });
            }
            else
            {
                return Ok(new { result = "Kayıt Bulunamadı..!" });
            }

        }

        public async Task<t_Plaques> ChkPlaque(string plaques)
        {
            string[] code = plaques.Split('-');
            var result = await AdvertiseRep.ChkPlaques(code[0]);
            if (result != null)
            {
                var newResult = await AdvertiseRep.ChkAllPlaques(code[0]);
                if(newResult != null)
                {
                    t_Plaques rslt = new t_Plaques();
                    rslt.code = plaques;

                    return rslt;
                }
            }
            
            return result;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> AddAdvertiseNew(object jsonObj)
        {
            try
            {
                var obj = JObject.Parse(jsonObj.ToString());
                JObject RequestAdvertises = (JObject)obj["RequestAdvertises"];

                JObject AdvertisesObjArr = (JObject)RequestAdvertises["AdvertisesObj"];
                JArray AdvertisesDetailObjArr = (JArray)RequestAdvertises["AdvertisesDetailObj"];
                JArray AdvertisesDetailSpecialObjArr = (JArray)RequestAdvertises["AdvertisesDetailSpecialObj"];

                List<t_AdvertisesDetail> detailList = new List<t_AdvertisesDetail>();
                for (int i = 0; i < AdvertisesDetailObjArr.Count; i++)
                {
                    t_AdvertisesDetail dd = new t_AdvertisesDetail();
                    var atribute_id = JObject.Parse(AdvertisesDetailObjArr[i].ToString())["atribute_id"].Value<long>();
                    var value = JObject.Parse(AdvertisesDetailObjArr[i].ToString())["value"].Value<string>();
                    dd.atribute_id = (int)long.Parse(atribute_id.ToString());
                    dd.value = int.Parse(value.ToString());
                    dd.advertise_id = 0;
                    dd.id = 0;
                    detailList.Add(dd);
                }

                List<t_AdvertisesRentCarDetail> detailOthesRentCarList = new List<t_AdvertisesRentCarDetail>();
                //farklı bir araç kiralayabileceğini seçmiş ise bu alan kullanılır;
                if (AdvertisesObjArr["diffrent_car_choose"].Value<int>() == 1)
                {
                    for (int i = 0; i < AdvertisesDetailSpecialObjArr.Count; i++)
                    {
                        if (JObject.Parse(AdvertisesDetailSpecialObjArr[i].ToString())["brand"].Value<string>() == "")
                        {

                        }
                        else
                        {
                            t_AdvertisesRentCarDetail ee = new t_AdvertisesRentCarDetail();
                            //var advertise_id = JObject.Parse(AdvertisesDetailSpecialObjArr[i].ToString())["advertise_id"].Value<long>();
                            var brand = JObject.Parse(AdvertisesDetailSpecialObjArr[i].ToString())["brand"].Value<string>();
                            var serial = JObject.Parse(AdvertisesDetailSpecialObjArr[i].ToString())["serial"].Value<string>();
                            var vehicle_body_type = JObject.Parse(AdvertisesDetailSpecialObjArr[i].ToString())["vehicle_body_type"].Value<string>();
                            var fuel_type = JObject.Parse(AdvertisesDetailSpecialObjArr[i].ToString())["fuel_type"].Value<string>();
                            var rental_period = JObject.Parse(AdvertisesDetailSpecialObjArr[i].ToString())["rental_period"].Value<int>();
                            var usage = JObject.Parse(AdvertisesDetailSpecialObjArr[i].ToString())["usage"].Value<int>();

                            ee.advertise_id = 0;
                            ee.brand = brand;
                            ee.serial = serial;
                            ee.vehicle_body_type = vehicle_body_type;
                            ee.fuel_type = fuel_type;
                            ee.rental_period = rental_period;
                            ee.usage = usage;

                            detailOthesRentCarList.Add(ee);
                        }

                    }
                }
                var brandId = AdvertisesObjArr["brand_id"].Value<int>();


                if (brandId > 0)
                {
                    var plaqueControl = await ChkPlaque(AdvertisesObjArr["plaque"].Value<string>());
                    if (plaqueControl == null || plaqueControl.code == "")
                    {
                        return Ok(new { result = "Hatalı Plaka..!" });
                    }

                    t_Advertises AdvertisesObj = new t_Advertises();
                    AdvertisesObj.user_id = AdvertisesObjArr["user_id"].Value<long>();
                    AdvertisesObj.sale_price = AdvertisesObjArr["sale_price"].Value<decimal>();
                    AdvertisesObj.rental_period = AdvertisesObjArr["rental_period"].Value<int>();
                    AdvertisesObj.usage = AdvertisesObjArr["usage"].Value<int>();
                    AdvertisesObj.state_id = 0;//AdvertisesObjArr["state_id"].Value<int>();
                    AdvertisesObj.city = "";// AdvertisesObjArr["city"].Value<string>();
                    AdvertisesObj.location = "";//AdvertisesObjArr["location"].Value<string>();
                    AdvertisesObj.posta_code = "";//AdvertisesObjArr["posta_code"].Value<string>();
                    AdvertisesObj.posta_description = AdvertisesObjArr["posta_description"].Value<string>();
                    AdvertisesObj.plaque = AdvertisesObjArr["plaque"].Value<string>();
                    AdvertisesObj.chassis = AdvertisesObjArr["chassis"].Value<string>();
                    AdvertisesObj.brand_id = brandId;
                    AdvertisesObj.production_month_id = 0;
                    AdvertisesObj.production_year_id = 0;
                    AdvertisesObj.model_id = 0;
                    AdvertisesObj.fueltype_id = 0;
                    AdvertisesObj.ps = "";
                    AdvertisesObj.model_type_id = 0;
                    AdvertisesObj.vehicle_body_type_id = 0;
                    AdvertisesObj.vehicle_production_period_id = 0;
                    AdvertisesObj.number_of_vehicle_owners = 0;
                    AdvertisesObj.checkbook = AdvertisesObjArr["checkbook"].Value<int>();
                    AdvertisesObj.non_smoking = AdvertisesObjArr["non_smoking"].Value<int>();
                    AdvertisesObj.kilometer = AdvertisesObjArr["kilometer"].Value<string>();
                    AdvertisesObj.color_id = 0;
                    AdvertisesObj.metalic_color = AdvertisesObjArr["metallic_color"].Value<int>();
                    AdvertisesObj.number_of_doors = 0;
                    AdvertisesObj.gear = 0;
                    AdvertisesObj.engine_capacity_id = 0;
                    AdvertisesObj.emission_id = 0;
                    AdvertisesObj.description = AdvertisesObjArr["description"].Value<string>();
                    AdvertisesObj.created_dt = DateTime.Now;
                    AdvertisesObj.created_by = AdvertisesObjArr["user_id"].Value<string>();
                    AdvertisesObj.status = "O";
                    AdvertisesObj.diffrent_car_choose = AdvertisesObjArr["diffrent_car_choose"].Value<int>();
                    AdvertisesObj.warranty = AdvertisesObjArr["warranty"].Value<int>();
                    AdvertisesObj.extended_warranty = AdvertisesObjArr["extended_warranty"].Value<int>();

                    var result = await AdvertiseRep.AddAdvertiseNew(AdvertisesObj, detailList, detailOthesRentCarList);


                    //SaveFileToDatabase(id, fileBytes, filename, contentType);

                    try
                    {
                        Mail emailObj = new Mail();
                        t_Users user = await userRepo.GetUserById(AdvertisesObj.user_id);
                        List<t_Users> userAdminList = await userRepo.GetUserByRole(1);
                        if(userAdminList != null)
                        {
                            for (int i = 0; i < userAdminList.Count; i++)
                            {
                                emailObj.email += userAdminList[i].email + ";";
                            }
                            emailObj.subject = "Onay Bekleyen İlan No= " + result;
                            emailObj.messageText = user.username + " tarafından yeni bir ilan girişi yapılmıştır. " + result + " No lu ilan incelenmek üzere onay bekleyen işlemlere alınmıştır";

                            var resultGuid = await sendMailRepo.SendMail(emailObj);
                        }
                    }
                    catch 
                    {
                        //mail gonderiminde hata alınırsa işlem yarım kalmasın 
                    }

                    try
                    {
                        var ptype = 8;
                        var pLogAciklama = "ilan onay bekliyor";

                        t_UsersLog logObj = new t_UsersLog();
                        logObj.created_dt = DateTime.Now;
                        logObj.userid = AdvertisesObjArr["user_id"].Value<long>();
                        logObj.typeid = ptype;
                        logObj.description = pLogAciklama;
                        logObj.advertise_id = result;

                        await logRepo.AddLogEvent(logObj);
                    }
                    catch
                    {
                        //log atılırken hata alınırsa dikkate alma
                    }



                    return Ok(new { result = result });
                }
                else
                {
                    return Ok(new { result = "Kayıt Bulunamadı..!" });
                }
            }
            catch (Exception e)
            {
                return Ok(new { result = e });
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetAdvertises()
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

                var user = await userRepo.GetUserByMail(currentUser);
                List<AdvertisesDto> resultList = await AdvertiseRep.GetAdvertisesByUserId(user.id);
                foreach (var item in resultList)
                {
                  
                     List<t_Offers> offerList = await OfferRep.GetOfferById(item.advertisesId);
                     item.offerList = offerList;
                }

                return Ok(new { result = resultList });
            }
            catch
            {
                return BadRequest(new { result = "Kayıt Bulunamadı..!" });
            }
        }


        //kurumsal frmalar için son ilanların listesi 
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetLastAdvertises()
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

                var user = await userRepo.GetUserByMail(currentUser);
                
                if (user.role == 1)
                {
                    var result = await AdvertiseRep.GetWatingConfirm();

                    return Ok(new { result = result });
                }
                else if (user.logintype == 3)
                {
                    var result = await AdvertiseRep.GetLastAdvertises(user.id);

                    return Ok(new { result = result });
                }
                else
                {
                    return BadRequest("kayıt Bulunamadı..!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(new { result = "Kayıt Bulunamadı..!" });
            }
        }

        [AllowAnonymous]
        [HttpGet("{advertiseId}")]
        public async Task<ActionResult> GetAdvertisesById(long advertiseId)
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

                //var user = await userRepo.GetUserByMail(currentUser);
                var result = await AdvertiseRep.GetAdvertisesById(advertiseId);

                return Ok(new { result = result });
            }
            catch (Exception e)
            {

                return BadRequest(new { result = "Kayıt Bulunamadı..!" });
            }
        }

        [AllowAnonymous]
        [HttpGet("{advertiseId}")]
        public async Task<ActionResult> GetAdvertiseDetailByAdvertseId(long advertiseId)
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

                //var user = await userRepo.GetUserByMail(currentUser);
                var result = await AdvertiseRep.GetAdvertiseDetailByAdvertseId(advertiseId);

                return Ok(new { result = result });
            }
            catch
            {
                return BadRequest(new { result = "Kayıt Bulunamadı..!" });
            }
        }

        [AllowAnonymous]
        [HttpGet("{advertiseId}")]
        public async Task<ActionResult> GetAdvertiseImageByAdvertiseId(long advertiseId)
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

                //var user = await userRepo.GetUserByMail(currentUser);
                var result = await AdvertiseRep.GetAdvertiseImageByAdvertiseId(advertiseId);

                return Ok(new { result = result });
            }
            catch
            {
                return BadRequest(new { result = "Kayıt Bulunamadı..!" });
            }
        }

        [AllowAnonymous]
        [HttpGet("{advertiseId}")]
        public async Task<ActionResult> GetDifferentRentCarsByAdvertiseId(long advertiseId)
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

                var result = await AdvertiseRep.GetDifferentCarChoiceByAdvertiseId(advertiseId);
                if (result == null)
                    return NotFound();

                return Ok(new { result = result });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrievering data from database " + ex.ToString());
            }
        }

        [HttpPost]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Post([FromRoute] Guid id, [FromForm] IFormFile body)
        {
            return Ok(new { result = "Kayıt Bulunamadı..!" });
        }


        public bool GetWorkDate(DateTime date)
        {

            if (date == null)
                return false;

            // Convert date representation to a number indicating the day of week
            var i = (int)date.DayOfWeek;
            if (i > 0 && i < 6)
                return true;


            return false;
        }
        public DateTime FindLastAdvertiseDate()
        {

            var date = DateTime.Now;
            for (int i = 1; i < 4; i++)
            {
                for (int j = 0; j < 20; j++)
                {
                    date = DateTime.Now.AddDays(i + j);
                    if (GetWorkDate(date) == true)
                    {
                        break;
                    }
                }

                if (i == 3)
                    break;
            }

            return date;
        }
    }
}
