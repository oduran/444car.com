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
    public class OfferController : ControllerBase
    {
        private readonly AppDbContext _context;
        private IWebHostEnvironment iwebHostEnvironment;

        private readonly IAdvertiseRepository AdvertiseRep;
        private readonly IJWTTokenService authService;
        private readonly ISendEmailRepository sendMailRepo;
        private readonly IUserRepository userRepo;
        private readonly IOfferRepository offerRepo;
        private readonly ILogRepository logRepo;

        public OfferController(IWebHostEnvironment _iwebHostEnvironment, IAdvertiseRepository AdvertiseRep, IJWTTokenService _authService,
            IUserRepository _userRepo,ISendEmailRepository _sendMailRepo, IOfferRepository _offerRepo, ILogRepository _logRepo)
        {
            this.AdvertiseRep = AdvertiseRep;
            this.iwebHostEnvironment = _iwebHostEnvironment;
            this.authService = _authService;
            this.userRepo = _userRepo;
            this.sendMailRepo = _sendMailRepo;
            this.offerRepo = _offerRepo;
            this.logRepo = _logRepo;
        }

       
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> AddOffer(object jsonObj)
        {
            try
            {
                var obj = JObject.Parse(jsonObj.ToString());
                JObject RequestOffer = (JObject)obj["RequestOffers"];

                JObject OffersObjArr = (JObject)RequestOffer["RequestOffer"];
                JArray OffersDetailObjArr = (JArray)RequestOffer["OffersDetailObj"];
                

                List<t_OffersDetail> detailList = new List<t_OffersDetail>();
                for (int i = 0; i < OffersDetailObjArr.Count; i++)
                {
                    t_OffersDetail dd = new t_OffersDetail();
                    var atribute_id = JObject.Parse(OffersDetailObjArr[i].ToString())["atribute_id"].Value<long>();
                    var value = JObject.Parse(OffersDetailObjArr[i].ToString())["value"].Value<string>();
                    dd.offer_id = -1;
                    dd.atribute_id = Convert.ToInt64(atribute_id);
                    dd.value = int.Parse(value.ToString());
                    dd.id = 0;
                    detailList.Add(dd);
                }
                
                t_Offers offersObj = new t_Offers();
                offersObj.advertise_id = OffersObjArr["advertise_id"].Value<long>();
                offersObj.user_id = OffersObjArr["user_id"].Value<long>();
                offersObj.offer_value = OffersObjArr["offer_value"].Value<long>();
                offersObj.usage = OffersObjArr["usage"].Value<Int32>();
                offersObj.rental_period = OffersObjArr["rental_period"].Value<Int16>();
                offersObj.payment1 = OffersObjArr["payment1"].Value<long>();
                offersObj.payment2 = OffersObjArr["payment2"].Value<long>();
                offersObj.payment3 = OffersObjArr["payment3"].Value<long>();
                offersObj.offer_due_date = OffersObjArr["offer_due_date"].Value<DateTime>();
                offersObj.created_dt = DateTime.Now;
                offersObj.modified_dt = DateTime.Now;
                offersObj.status = "A";
                offersObj.any_other_car_for_rent = OffersObjArr["any_other_car_for_rent"].Value<Int16>();

                var result = await offerRepo.AddOffer(offersObj, detailList);


                try
                {
                    var ptype = 9;
                    var pLogAciklama = "Teklif yapıldı";

                    string cookieValueFromContext = HttpContext.Request.Cookies["444Car"];
                    var currentUser = authService.DecodeJWT(cookieValueFromContext);
                    var user = await userRepo.GetUserByMail(currentUser);
                    
                    t_UsersLog logObj = new t_UsersLog();
                    logObj.created_dt = DateTime.Now;
                    logObj.userid = user.id;
                    logObj.typeid = ptype;
                    logObj.description = pLogAciklama;
                    logObj.advertise_id = OffersObjArr["advertise_id"].Value<long>();
                    logObj.offer_id = result;

                    await logRepo.AddLogEvent(logObj);
                }
                catch
                {
                    //log atılırken hata alınırsa dikkate alma
                }


                return Ok(new { result = result });
                
            }
            catch (Exception e)
            {
                return Ok(new { result = e });
            }
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> UpdateOffer(object jsonObj)
        {
            try
            {
                var obj = JObject.Parse(jsonObj.ToString());
                JObject RequestOffer = (JObject)obj["RequestOffers"];

                JObject OffersObjArr = (JObject)RequestOffer["RequestOffer"];
                JArray OffersDetailObjArr = (JArray)RequestOffer["OffersDetailObj"];


                List<t_OffersDetail> detailList = new List<t_OffersDetail>();
                for (int i = 0; i < OffersDetailObjArr.Count; i++)
                {
                    t_OffersDetail dd = new t_OffersDetail();
                    var atribute_id = JObject.Parse(OffersDetailObjArr[i].ToString())["atribute_id"].Value<long>();
                    var value = JObject.Parse(OffersDetailObjArr[i].ToString())["value"].Value<string>();
                    dd.offer_id = JObject.Parse(OffersDetailObjArr[i].ToString())["offer_id"].Value<long>();
                    dd.atribute_id = Convert.ToInt64(atribute_id);
                    dd.value = int.Parse(value.ToString());
                    dd.id = JObject.Parse(OffersDetailObjArr[i].ToString())["id"].Value<long>();
                    
                    detailList.Add(dd);
                }

                t_Offers offersObj = new t_Offers();
                offersObj.id = OffersObjArr["id"].Value<long>();
                offersObj.advertise_id = OffersObjArr["advertise_id"].Value<long>();
                offersObj.user_id = OffersObjArr["user_id"].Value<long>();
                offersObj.offer_value = OffersObjArr["offer_value"].Value<long>();
                offersObj.usage = OffersObjArr["usage"].Value<Int32>();
                offersObj.rental_period = OffersObjArr["rental_period"].Value<Int16>();
                offersObj.payment1 = OffersObjArr["payment1"].Value<long>();
                offersObj.payment2 = OffersObjArr["payment2"].Value<long>();
                offersObj.payment3 = OffersObjArr["payment3"].Value<long>();
                offersObj.offer_due_date = OffersObjArr["offer_due_date"].Value<DateTime>();
                offersObj.modified_dt = DateTime.Now;
                offersObj.any_other_car_for_rent = OffersObjArr["any_other_car_for_rent"].Value<Int16>();


                //ilanın son günü bugünden küçük ise işlem yapılmamalı..!
                var advertises = await AdvertiseRep.GetAdvertisesById(offersObj.advertise_id);
                if (advertises == null)
                    return Ok(new { result = "İlan bulunamadı..!" });

                if (DateTime.Now > advertises.advertise_end_date)
                    return Ok(new { result = "İlan teklife kapalı..!" });

                var result = await offerRepo.UpdateOffer(offersObj, detailList);


                try
                {
                    var ptype = 91;
                    var pLogAciklama = "Teklif Güncellendi";

                    string cookieValueFromContext = HttpContext.Request.Cookies["444Car"];
                    var currentUser = authService.DecodeJWT(cookieValueFromContext);
                    var user = await userRepo.GetUserByMail(currentUser);

                    t_UsersLog logObj = new t_UsersLog();
                    logObj.created_dt = DateTime.Now;
                    logObj.userid = user.id;
                    logObj.typeid = ptype;
                    logObj.description = pLogAciklama;
                    logObj.advertise_id = OffersObjArr["advertise_id"].Value<long>();
                    logObj.offer_id = OffersObjArr["id"].Value<long>();

                    await logRepo.AddLogEvent(logObj);
                }
                catch
                {
                    //log atılırken hata alınırsa dikkate alma
                }



                return Ok(new { result = result });

            }
            catch (Exception e)
            {
                return Ok(new { result = e });
            }
        }


        // Kullanıcının ofer ları
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetUserOffers()
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
                    List<t_Offers> resultList = await offerRepo.GetAllOffer();
                    return Ok(new { result = resultList });
                }
                else if (user.logintype == 3)
                {
                    List<t_Offers> resultList = await offerRepo.GetOfferById(user.id);
                    return Ok(new { result = resultList });
                }
                else
                {
                    return BadRequest(new { result = "Yekiniz yok..!" });
                }

            }
            catch
            {
                return BadRequest(new { result = "Kayıt Bulunamadı..!" });
            }
        }


        

        [AllowAnonymous]
        [HttpGet("{offerId}")]
        public async Task<ActionResult> GetOfferDetailById(long offerId)
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

                var result = await offerRepo.GetOfferDetailById(offerId);

                return Ok(new { result = result });
            }
            catch
            {
                return BadRequest(new { result = "Kayıt Bulunamadı..!" });
            }
        }


        [AllowAnonymous]
        [HttpGet("{advertiseId}, {countryId}")]
        public async Task<ActionResult> GetInComingOffers(long advertiseId, int countryId)
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
                if (user.logintype == 1)
                {

                    List<CarCompanyOffer> resultOferObj = new List<CarCompanyOffer>();
                    List <ServiceBy444Car> resultServiceOffer = new List<ServiceBy444Car>();
                    List <StandartFreeService> resultStandartObj = new List<StandartFreeService>();
                    List<ExtraFreeServices> resultExtraObj = new List<ExtraFreeServices>();
                    List<CarCompany> resultCompanyObj = new List<CarCompany>();


                    //ilk olarak offer bilgileri çekilir
                    List<t_Offers> resultList = await offerRepo.GetInComingOffers(advertiseId);
                    if (resultList != null)
                    {
                        for (int i = 0; i < resultList.Count; i++)
                        {
                            CarCompanyOffer oferObj = new CarCompanyOffer();
                            oferObj.id = resultList[i].id;
                            oferObj.OfferValue = resultList[i].offer_value;
                            oferObj.MonthlUse = resultList[i].usage;
                            oferObj.RentalTerm = resultList[i].rental_period;
                            oferObj.Payment1 = (int)resultList[i].payment1;
                            oferObj.Payment2 = (int)resultList[i].payment2;
                            oferObj.Payment3 = (int)resultList[i].payment3;
                            oferObj.OfferDueDate = resultList[i].offer_due_date;
                            oferObj.AnyOtherCarForRent = resultList[i].any_other_car_for_rent;

                            resultOferObj.Add(oferObj);

                            var userId = resultList[i].user_id;
                            //Company bilgileri getirilir.
                            var companyUsr = await userRepo.GetUserById(userId);
                            
                            if (companyUsr != null)
                            {
                                CarCompany cObj = new CarCompany();
                                cObj.CompanyTitle = companyUsr.username;
                                var userProfile = await userRepo.GetUserProfileById(userId);
                                cObj.CompanyOfficial = companyUsr.name + " " + companyUsr.surname;
                                cObj.Mobile = companyUsr.mobile;
                                cObj.Telephone = userProfile.telephone;
                                cObj.Fax = userProfile.fax;
                                cObj.Email = companyUsr.email;
                                cObj.Web = userProfile.url;
                                cObj.State = userProfile.country;
                                cObj.City = userProfile.city;
                                cObj.Location = userProfile.location;
                                cObj.Address = userProfile.address;

                                resultCompanyObj.Add(cObj);
                            }


                            //Default servis bilgileri getirilir
                            List<t_OfferAtributes> sabitList = await offerRepo.GetOfferServiceBy444(countryId);
                            if(sabitList != null)
                            {
                                for (int j = 0; i < sabitList.Count; j++)
                                {
                                    ServiceBy444Car serviceList = new ServiceBy444Car();
                                    serviceList.Offerid = oferObj.id;
                                    serviceList.OfferAtributeId =  sabitList[j].id;
                                    serviceList.Description = sabitList[j].value;
                                    serviceList.Value = sabitList[j].defaultvalue;

                                    resultServiceOffer.Add(serviceList);
                                }
                            }

                            //diğer atributelar 
                            var name = "Standart Free Services";
                            List<StandartFreeService> standartList = await offerRepo.GetOfferAtributesById(oferObj.id, name, countryId);
                            if(standartList != null)
                            {
                                for (int j = 0; j < standartList.Count; j++)
                                {
                                    StandartFreeService standartObjList = new StandartFreeService();
                                    standartObjList.Offerid = standartList[j].Offerid;
                                    standartObjList.OfferAtributeId = standartList[j].OfferAtributeId;
                                    standartObjList.Description = standartList[j].Description;
                                    standartObjList.Value = standartList[j].Value;

                                    resultStandartObj.Add(standartObjList);
                                }
                            }

                            name = "Extra Free Services";
                            List<StandartFreeService> ExtraFreeServiceList = await offerRepo.GetOfferAtributesById(oferObj.id, name, countryId);
                            if (standartList != null)
                            {
                                for (int j = 0; j < standartList.Count; j++)
                                {
                                    ExtraFreeServices extraObjList = new ExtraFreeServices();
                                    extraObjList.Offerid = standartList[j].Offerid;
                                    extraObjList.OfferAtributeId = standartList[j].OfferAtributeId;
                                    extraObjList.Description = standartList[j].Description;
                                    extraObjList.Value = standartList[j].Value;

                                    resultExtraObj.Add(extraObjList);
                                }
                            }
                        }

                    }

                    return Ok(new { CarCompanyOfferObj = resultOferObj, ServiceBy444CarObj = resultServiceOffer, StandartFreeServiceObj  = resultStandartObj, ExtraFreeServicesObj  = resultExtraObj, CarCompanyObj = resultCompanyObj });
                }
                else
                {
                    return BadRequest(new { result = "Yekiniz yok..!" });
                }

            }
            catch
            {
                return BadRequest(new { result = "Kayıt Bulunamadı..!" });
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetInComingOffers2()
        {
            try
            {
                long advertiseId = 32;
                int countryId = 2;

                string cookieValueFromContext = HttpContext.Request.Cookies["444Car"];
               

                var user = await userRepo.GetUserByMail("merdol@gmail.com");
                if (user.logintype == 1)
                {

                    List<CarCompanyOffer> resultOferObj = new List<CarCompanyOffer>();
                    List<ServiceBy444Car> resultServiceOffer = new List<ServiceBy444Car>();
                    List<StandartFreeService> resultStandartObj = new List<StandartFreeService>();
                    List<ExtraFreeServices> resultExtraObj = new List<ExtraFreeServices>();
                    List<CarCompany> resultCompanyObj = new List<CarCompany>();


                    //ilk olarak offer bilgileri çekilir
                    List<t_Offers> resultList = await offerRepo.GetInComingOffers(advertiseId);
                    if (resultList != null)
                    {
                        for (int i = 0; i < resultList.Count; i++)
                        {
                            CarCompanyOffer oferObj = new CarCompanyOffer();
                            oferObj.id = resultList[i].id;
                            oferObj.OfferValue = resultList[i].offer_value;
                            oferObj.MonthlUse = resultList[i].usage;
                            oferObj.RentalTerm = resultList[i].rental_period;
                            oferObj.Payment1 = (int)resultList[i].payment1;
                            oferObj.Payment2 = (int)resultList[i].payment2;
                            oferObj.Payment3 = (int)resultList[i].payment3;
                            oferObj.OfferDueDate = resultList[i].offer_due_date;
                            oferObj.AnyOtherCarForRent = resultList[i].any_other_car_for_rent;

                            resultOferObj.Add(oferObj);

                            var userId = resultList[i].user_id;
                            //Company bilgileri getirilir.
                            var companyUsr = await userRepo.GetUserById(userId);

                            if (companyUsr != null)
                            {
                                CarCompany cObj = new CarCompany();
                                cObj.CompanyTitle = companyUsr.username;
                                var userProfile = await userRepo.GetUserProfileById(userId);
                                cObj.CompanyOfficial = companyUsr.name + " " + companyUsr.surname;
                                cObj.Mobile = companyUsr.mobile;
                                cObj.Telephone = userProfile.telephone;
                                cObj.Fax = userProfile.fax;
                                cObj.Email = companyUsr.email;
                                cObj.Web = userProfile.url;
                                cObj.State = userProfile.country;
                                cObj.City = userProfile.city;
                                cObj.Location = userProfile.location;
                                cObj.Address = userProfile.address;

                                resultCompanyObj.Add(cObj);
                            }


                            //Default servis bilgileri getirilir
                            List<t_OfferAtributes> sabitList = await offerRepo.GetOfferServiceBy444(countryId);
                            try
                            {
                                if (sabitList != null)
                                {
                                    for (int j = 0; j < sabitList.Count; j++)
                                    {
                                        ServiceBy444Car serviceList = new ServiceBy444Car();
                                        serviceList.Offerid = oferObj.id;
                                        serviceList.OfferAtributeId = sabitList[j].id;
                                        serviceList.Description = sabitList[j].value;
                                        serviceList.Value = sabitList[j].defaultvalue;

                                        resultServiceOffer.Add(serviceList);
                                    }
                                }
                            }
                            catch (Exception ex)
                            {

                                 throw ex;
                            }

                            //diğer atributelar 
                            var name = "Standart Free Services";
                            List<StandartFreeService> standartList = await offerRepo.GetOfferAtributesById(oferObj.id, name, countryId);
                            if (standartList != null)
                            {
                                for (int j = 0; j < standartList.Count; j++)
                                {
                                    StandartFreeService standartObjList = new StandartFreeService();
                                    standartObjList.Offerid = standartList[j].Offerid;
                                    standartObjList.OfferAtributeId = standartList[j].OfferAtributeId;
                                    standartObjList.Description = standartList[j].Description;
                                    standartObjList.Value = standartList[j].Value;

                                    resultStandartObj.Add(standartObjList);
                                }
                            }

                            name = "Extra Free Services";
                            List<StandartFreeService> ExtraFreeServiceList = await offerRepo.GetOfferAtributesById(oferObj.id, name, countryId);
                            if (standartList != null)
                            {
                                for (int j = 0; j < standartList.Count; j++)
                                {
                                    ExtraFreeServices extraObjList = new ExtraFreeServices();
                                    extraObjList.Offerid = standartList[j].Offerid;
                                    extraObjList.OfferAtributeId = standartList[j].OfferAtributeId;
                                    extraObjList.Description = standartList[j].Description;
                                    extraObjList.Value = standartList[j].Value;

                                    resultExtraObj.Add(extraObjList);
                                }
                            }
                        }

                    }

                    return Ok(new { CarCompanyOfferObj = resultOferObj, ServiceBy444CarObj = resultServiceOffer, StandartFreeServiceObj = resultStandartObj, ExtraFreeServicesObj = resultExtraObj, CarCompanyObj = resultCompanyObj });
                }
                else
                {
                    return BadRequest(new { result = "Yekiniz yok..!" });
                }

            }
            catch(Exception ex)
            {
                    return BadRequest(new { result = "Kayıt Bulunamadı..!" });
            }
        }

    }
}
