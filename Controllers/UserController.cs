using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using _444Car.AuthServices;
using _444Car.Interface;
using _444Car.InternalModels;
using _444Car.Models;
using _444Car.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using _444Car.AuthServices;
using _444Car.Interface;
using _444Car.InternalModels;
using _444Car.Models;
using _444Car.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using System.Net.Http.Headers;
using Microsoft.Extensions.Options;

namespace _444Car.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly IJWTTokenService _authService;
        private readonly IAuthRepository _repo;
        private readonly IForgotPasswordRepository _passRepo;
        private readonly IUserRepository _userRepo;
        private readonly ISendEmailRepository _sendMailRepo;
        private readonly ILogRepository _logRepo;
        private readonly OtpDto otpOptions;

        public UserController(IAuthRepository repo, IJWTTokenService authService, IForgotPasswordRepository passRepo, IUserRepository userRepo, 
            ISendEmailRepository sendMailRepo, ILogRepository logRepo,IOptions<OtpDto> options)
        {
            _authService = authService;
            _passRepo = passRepo;
            _userRepo = userRepo;
            _repo = repo;
            _sendMailRepo = sendMailRepo;
            _logRepo = logRepo;
            otpOptions = options.Value;
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Login(UserLogin userObj)
        {
            long userid = -1;
            var userEmail = "";
            try
            {
                var userFromRepo = await _repo.Login(userObj.email.ToLower(), userObj.password);
                if (userFromRepo == null) //User login failed
                    return Ok(new { StatusCode = 500, Description = "User not found" });

                userid = userFromRepo.id;
                userEmail = userObj.email.ToLower();

                //Kullanıcı mailini onalamadığı sürece sisteme ne login olabilir nede yeniden register olabilir.
                if (userFromRepo.status == "O")
                {
                    return Ok(new { StatusCode = 500, Description = "Please check your email address" });
                }

                string token = _authService.GenerateToken(userObj);
                Response.Cookies.Append("444Car", token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

                try
                {
                    var ptype = 1;
                    var pLogAciklama = "uygulamaya giriş işlemi";

                    t_UsersLog logObj = new t_UsersLog();
                    logObj.created_dt = DateTime.Now;
                    logObj.userid = userFromRepo.id;
                    logObj.typeid = ptype;
                    logObj.description = pLogAciklama;

                    await _logRepo.AddLogEvent(logObj);
                }
                catch 
                {
                    //log atılırken hata alınırsa dikkate alma
                }

                bool registrationFlag = (String.IsNullOrEmpty(userFromRepo.mobile)) ? false : true;
                return Ok(new { StatusCode = 200, token = token ,registration= registrationFlag });

            }
            catch (Exception ex)
            {

                try
                {
                    var ptype = 3;
                    var pLogAciklama = userEmail + " için giriş işlemi yapılamadı";

                    t_UsersLog logObj = new t_UsersLog();
                    logObj.created_dt = DateTime.Now;
                    logObj.userid = userid;
                    logObj.typeid = ptype;
                    logObj.description = pLogAciklama;

                    await _logRepo.AddLogEvent(logObj);
                }
                catch
                {
                    //log atılırken hata alınırsa dikkate alma
                }

                //WritesLog.Log(ex.Message);
                return Ok(new { StatusCode = 500, Description = "Error retrieveing data from database" });
            }
        }
 
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> UploadUserProfileDocuments()
        {
            try
            {
                var result2 = new List<FileUploadResult>();
                var files = HttpContext.Request.Form.Files;
                var keys = HttpContext.Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
                string user_id = keys["user_id"];
                string document_type = keys["document_type_id"];
                string created_by = keys["created_by"];
                string guidString = keys["guid"]; //ilan no olacak
                var createDirectory = System.IO.Directory.CreateDirectory("httpdocs/uploaded/userDocs/" + guidString);

                foreach (var file in files)
                {
                    t_UserDocuments userDocs = new t_UserDocuments();
                    userDocs.user_id = Int32.Parse(user_id);
                    userDocs.document_type_id = Int32.Parse(document_type);
                    userDocs.document_link = "/uploaded/userDocs/" + guidString + "/" + file.FileName;
                    userDocs.created_by = created_by;
                    userDocs.created_dt = DateTime.Now;
                    userDocs.status = "A";
                    var path = Path.Combine("", "httpdocs/uploaded/userDocs/" + guidString, file.FileName);
                    var stream = new FileStream(path, FileMode.Create);
                    await file.CopyToAsync(stream);
                    result2.Add(new FileUploadResult() { Name = file.FileName, Length = file.Length });
                    _ = await _userRepo.AddUserDocs(userDocs);
                }
                return await Task.FromResult(Ok());
            }
            catch (Exception ex)
            {
                return await Task.FromResult(Ok());
            }
        }
        
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> UpdateUserProfileDocument()
        {
            try
            {
                var result2 = new List<FileUploadResult>();
                var files = HttpContext.Request.Form.Files;
                var keys = HttpContext.Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
                string user_id = keys["user_id"];
                string document_type = keys["document_type_id"];
                string created_by = keys["created_by"];
                string document_link = keys["document_link"]; //ilan no olacak
                string old_document_link = keys["old_document_link"]; //ilan no olacak

                foreach (var file in files)
                {
                    t_UserDocuments userDoc = new t_UserDocuments();
                    userDoc.user_id = Int32.Parse(user_id);
                    userDoc.document_type_id = Int32.Parse(document_type);
                    userDoc.document_link = old_document_link;
                    userDoc.created_by = created_by;
                    userDoc.created_dt = DateTime.Now;
                    userDoc.status = "A";
                    _ = await _userRepo.DeleteUserDoc(userDoc);
                    //yeni ekleyeceği kaydın linki
                    userDoc.document_link = document_link + "/" + file.FileName;
                    var path = Path.Combine("", "httpdocs" + document_link+"/", file.FileName);
                    var stream = new FileStream(path, FileMode.Create);
                    await file.CopyToAsync(stream);
                    result2.Add(new FileUploadResult() { Name = file.FileName, Length = file.Length });
                    _ = await _userRepo.AddUserDocs(userDoc);
                }
                return await Task.FromResult(Ok());
            }
            catch (Exception ex)
            {
                return await Task.FromResult(Ok());
            }
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserRegistration userForRegisterDto)
        { //Data Transfer Object containing username and password.
            // validate request
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var userName = userForRegisterDto.Email.ToLower(CultureInfo.CurrentCulture);
            var userType = 1; //ilan verebilen normal kullanıcı
            userForRegisterDto.Email = userName; //Convert username to lower case before storing in database.

            if (!string.IsNullOrEmpty(userForRegisterDto.CompanyNo))
            {
                userType = 2; //sadece ilan verebilen firma
                userName = userForRegisterDto.CompanyNo; //kullanıcı kurumsal ise company name alanı username de tutulur
                if (userForRegisterDto.SpecialCompany == 1)
                {
                    userType = 3; //teklif verebilen firma 
                }
            }

            var result = await _repo.UserExistsRegister(userForRegisterDto.Email);
            int type = 0;
            var mailGonder = true;
            if (result != null)
            {
                if (result.status == "A")
                {
                    return BadRequest("Email is already taken");
                }
                else if (result.status == "O" && result.logintype == userType)
                {
                    type = 1;
                    //kullanıcı bu mail için modified_dt si 48 saatten fazla ise yeniden register olabilmeli
                    //if (DateTime.Now.AddHours(-24) < result.modified_dt)
                    //{
                    //    mailGonder = false;
                    //}
                }
                else
                {
                    return BadRequest("No transaction can be made with this e-mail");
                }
            }

            var userToCreate = new t_Users
            {
                email = userForRegisterDto.Email,
                vkn = userForRegisterDto.CompanyNo,
                logintype = userType,
                role = 5,
                username = userName
            };

            var createUser = await _repo.Register(userToCreate, userForRegisterDto.Password, type);
            if (mailGonder)
            {
                var guidId = Guid.NewGuid();
                var linkAddress = "https://test.444car.com/User/UpdateStatusFromUser/" + guidId;

                Mail emailObj = new Mail();
                emailObj.email = userForRegisterDto.Email;
                emailObj.subject = "444CAR Registration";
                emailObj.messageText = "Aşağıdaki link üzerinden giriş onayı yapabilirsiniz. <br/> <a href='" + linkAddress + "' >Register</a>";
                emailObj.username = userName;

                var resultGuid = await _sendMailRepo.SendMail(emailObj);
                if (resultGuid > 0) // bunu neden register işleminde ekliyoruz ?
                {
                    var userid = createUser.id;
                    if (type == 1)
                        userid = result.id;
                    var x = await _passRepo.AddForgotPassword(userid, guidId, 3);
                }


            }
            return StatusCode(201);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CheckUser([FromBody] object reqObj)
        {
            var obj = JObject.Parse(reqObj.ToString());
            string email = obj.GetValue("email").ToString();
            t_Users _user = await _userRepo.GetUserByMail(email);
            if (_user != null)
            {
                return StatusCode(200);
            }

            return StatusCode(204);

        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SetPassword([FromBody] object reqObj)
        {

            try
            {
                var obj = JObject.Parse(reqObj.ToString());
                string password = obj.GetValue("password").ToString();
                var _guid = Guid.Parse(obj.GetValue("guid").ToString());

                t_ForgotPasswords _pass = await _passRepo.GetItemByGuid(_guid);
                t_Users _user = await _userRepo.GetUserById(_pass.userid);

                var res = await _userRepo.SetUserPassword(_pass.userid, password);
                if (res > 0)
                    return StatusCode(200);
                else
                    return BadRequest();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Başarısız");
            }

        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetUserProfiles()
        {

            try
            {
               var _userProfiles = await _userRepo.GetUserProfiles();
                
                return Ok(new { result = _userProfiles });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Başarısız");
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SendOtpCode(Otp obj)
        {

            try
            {
                Random generator = new Random();
                int r = generator.Next(100000, 1000000);

                OtpDto otpObj = new OtpDto();
                SmsInfo smsInfo = new SmsInfo();
                smsInfo.messagetext = "Tek kullanımlık şifreniz : "+r.ToString();
                smsInfo.receipent = obj.phoneNumber;
                otpObj.smsmessages.Add(smsInfo);
                otpObj.user = otpOptions.user;
                otpObj.password = otpOptions.password;
                otpObj.originator = otpOptions.originator;
                HttpClient Client = new HttpClient();
                
                // Client.DefaultRequestHeaders.Add("X-Vfk-Server-Key", "ssoa6dce46a4068f7ecce6e1cbd16e6fae331892fa63715ff95d72ed15d7a");
                var json = JsonConvert.SerializeObject(otpObj);
                var data = new StringContent(json, Encoding.UTF8, "application/json");
                //var response = await Client.PostAsync("https://web-rest.verifykit.com/v1.0/send-otp", data);
                var response = await Client.PostAsync("https://ws.jetsms.com.tr/api/sendsms", data);
                var result = response.Content.ReadAsStringAsync().Result;
                if(response.StatusCode.ToString() == "OK")
                {
                    return Ok(new { result = result, code = r.ToString() });
                }
                // var _userProfiles = await _userRepo.GetUserProfiles();

                return Ok(new { result = result, code ="" }) ;
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Başarısız");
            }
        }
        
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CheckOtp(CheckOtpDto obj)
        {

            try
            {

                HttpClient Client = new HttpClient();
                Client.DefaultRequestHeaders.Add("X-Vfk-Server-Key", "ssoa6dce46a4068f7ecce6e1cbd16e6fae331892fa63715ff95d72ed15d7a");
                var json = JsonConvert.SerializeObject(obj);
                var data = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await Client.PostAsync("https://web-rest.verifykit.com/v1.0/check-otp", data);
                var result = response.Content.ReadAsStringAsync().Result;

                return Ok(new { result = result });
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Başarısız");
            }
        }

        [AllowAnonymous]
        [HttpPost]

        //public async Task<IActionResult> UpdateUserProfileById(UserProfilesDto userProfileObj)
        public async Task<IActionResult> UpdateUserProfileById(object jsonObj)
        {
            string cookieValueFromContext = HttpContext.Request.Cookies["444Car"];
            var currentUser = _authService.DecodeJWT(cookieValueFromContext);
            if (currentUser == null)
            {
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var obj = JObject.Parse(jsonObj.ToString());
            //JObject userProfileObj = (JObject)obj["UserProfilesDto"];

            UserProfilesDto UserProfileObj = new UserProfilesDto();
            UserProfileObj.userid = obj["userid"].Value<long>();
            UserProfileObj.name = obj["name"].Value<string>();
            UserProfileObj.surname = obj["surname"].Value<string>();
            UserProfileObj.logintype = obj["logintype"].Value<int>();
            UserProfileObj.mobile = obj["mobile"].Value<string>();
            UserProfileObj.companytitle = obj["companytitle"].Value<string>();
            UserProfileObj.address = obj["address"].Value<string>();
            UserProfileObj.telephone = obj["telephone"].Value<string>();
            UserProfileObj.fax = obj["fax"].Value<string>();
            UserProfileObj.url = obj["url"].Value<string>();
            //UserProfileObj.country = obj["country"].Value<string>();
            UserProfileObj.city = obj["city"].Value<string>();
            //UserProfileObj.subcity = obj["subcity"].Value<string>();
            UserProfileObj.location = obj["location"].Value<string>();
            UserProfileObj.postcode = obj["postcode"].Value<string>();
            UserProfileObj.taxadmin = obj["taxadmin"].Value<string>();
            UserProfileObj.taxidentification = obj["taxidentification"].Value<string>();
            UserProfileObj.taxid = obj["taxid"].Value<string>();
            UserProfileObj.kdvno = obj["kdvno"].Value<string>();
            UserProfileObj.description = obj["description"].Value<string>();
            UserProfileObj.created_dt = DateTime.Now;
            UserProfileObj.modified_by = obj["modified_by"] != null ? obj["modified_by"].Value<string>() : "OWNER";
            //UserProfileObj.modified_dt = obj["modified_dt"] != null ? obj["modified_dt"].Value<DateTime>() : "1900-01-01";


            JArray docObjArr = (JArray)obj["UserDocList"];
            List<t_UserDocuments> docList = new List<t_UserDocuments>();
            if (docObjArr != null)
            {
                for (int i = 0; i < docObjArr.Count; i++)
                {
                    t_UserDocuments dd = new t_UserDocuments();

                    var user_id = JObject.Parse(docObjArr[i].ToString())["user_id"].Value<Int64>();
                    var document_type_id = JObject.Parse(docObjArr[i].ToString())["document_type_id"].Value<Int16>();
                    var document_link = JObject.Parse(docObjArr[i].ToString())["document_link"].Value<string>();
                    var created_by = JObject.Parse(docObjArr[i].ToString())["created_by"].Value<string>();

                    dd.user_id = user_id;
                    dd.document_type_id = document_type_id;
                    dd.document_link = document_link;
                    dd.created_by = created_by;

                    docList.Add(dd);
                }
            }
            var user = await _userRepo.GetUserByMail(currentUser);
            //userProfileObj.userid = user.id;
            var updateUser = await _userRepo.UpdateUserProfileById(UserProfileObj, docList, user);
            if (updateUser == 1)
                return StatusCode(200);
            else
                return StatusCode(500, "Güncelleme işlemi başarısız");
        }

        [HttpGet]
        public async Task<IActionResult> GetUserProfileById()
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            string cookieValueFromContext = HttpContext.Request.Cookies["444Car"];
            var currentUserMail = _authService.DecodeJWT(cookieValueFromContext);
            if (currentUserMail == null)
            {
                return BadRequest(ModelState);
            }
            var user = await _userRepo.GetUserByMail(currentUserMail);
            var userProfileObj = await _userRepo.GetUserProfileById(user.id);
            var userDocs = await _userRepo.GetUserDocs(user.id);
            UserProfilesDto userProfileDtoObj = CreateUserProfileDto(user, userProfileObj,userDocs);

            return Ok(userProfileDtoObj);
        }

        [HttpGet]
        public async Task<IActionResult> GetUserRoleById()
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            string cookieValueFromContext = HttpContext.Request.Cookies["444Car"];
            var currentUserMail = _authService.DecodeJWT(cookieValueFromContext);
            if (currentUserMail == null)
            {
                return BadRequest(ModelState);
            }
            var user = await _userRepo.GetUserByMail(currentUserMail);
            

            return Ok(user.role);
        }
        private UserProfilesDto CreateUserProfileDto(t_Users user, t_UserProfiles userProfile,List<t_UserDocuments> userDocs)
        {
            UserProfilesDto userProfileObj = new UserProfilesDto();
            userProfileObj.name = user.name;
            userProfileObj.logintype = user.logintype;
            userProfileObj.surname = user.surname;
            userProfileObj.email = user.email;
            userProfileObj.userid = user.id;
            userProfileObj.mobile = user.mobile;
            userProfileObj.companytitle = user.vkn;
            userProfileObj.address = (userProfile == null)?"": userProfile.address;
            userProfileObj.telephone = (userProfile == null) ? "" : userProfile.telephone;
            userProfileObj.fax = (userProfile == null) ? "" :  userProfile.fax;
            userProfileObj.url = (userProfile == null) ? "" : userProfile.url;
            userProfileObj.country = (userProfile == null) ? "" : userProfile.country;
            userProfileObj.city = (userProfile == null) ? "" : userProfile.city;
            userProfileObj.subcity = (userProfile == null) ? "" : userProfile.subcity;
            userProfileObj.location = (userProfile == null) ? "" : userProfile.location;
            userProfileObj.postcode = (userProfile == null) ? "" : userProfile.postcode;
            userProfileObj.taxadmin = (userProfile == null) ? "" : (userProfile == null) ? "" : userProfile.taxadmin;
            userProfileObj.taxidentification = (userProfile == null) ? "" : userProfile.taxidentification;
            userProfileObj.taxid = (userProfile == null) ? "" : userProfile.taxid;
            userProfileObj.kdvno = (userProfile == null) ? "" : userProfile.kdvno;
            userProfileObj.description = (userProfile == null) ? "" : userProfile.description;
            userProfileObj.userDocs =  userDocs;

            return userProfileObj;
        }

        [AllowAnonymous]
        [HttpPost("{id}")]
        public async Task<IActionResult> UpdateUserPassErrById(int id)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var updateUser = await _userRepo.UpdateUserPassErrById(id);

                return StatusCode(200);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SendMailForPassword([FromBody] UserDto userDto)
        {
            userDto.email = userDto.email.ToLower(CultureInfo.CurrentCulture); //Convert username to lower case before storing in database.
            t_Users _user = await _repo.GetUser(userDto.email);

            if (_user != null)
            {
                Guid guid = Guid.NewGuid();
                var linkAddress = "https://test.444car.com/#/resetpassword?"+guid.ToString();
               
                Mail mail = new Mail();
                mail.email = _user.email;
                mail.subject = "444Car Reset Password";
                mail.messageText = "Aşağıdaki link üzerinden şifre değişikliği yapabilirsiniz.  <br/> <a href='" + linkAddress + "' >Reset Password Link</a>";

                int result = await _sendMailRepo.SendMail(mail);

                if (result == 1)
                {
                    string res = await _userRepo.AddForgotPassword(_user.id,guid);
                    
                    if(res == "OK")
                    {
                        return Ok(result);
                    }
                    else
                        return BadRequest(res);
                }
                else
                    return BadRequest(result);
            }
            else
            {
                return Ok(-1); //BadRequest("The email address registered in the system was not found..!");
            }
        }



        [AllowAnonymous]
        [HttpGet("{sguidId}")]
        public async Task<IActionResult> UpdateStatusFromUser(string sguidId)
        {
            //gelen guidId ile forgatpassword den user bilgisi alınır.
            Guid guidId = Guid.Parse(sguidId);
            var guidT = await _passRepo.GetItemByGuid(guidId);
            var userId = guidT.userid;
            t_Users _user = await _userRepo.GetUserById(userId);

            // userDto.email = userDto.email.ToLower(CultureInfo.CurrentCulture); //Convert username to lower case before storing in database.
            // t_Users _user = await _repo.GetUser(userDto.email);

            if (_user != null)
            {
                if (_user.status == "O")
                {
                    var loginType = _user.logintype;
                    var status = "A";
                    var modifiedby = "OWNER";

                    var result = await _userRepo.UpdateUserStatusById(_user.id, status, modifiedby);
                    if (result == 1)
                    {
                        var stringFullUrl = "https://test.444car.com/#/";
                        return Redirect(stringFullUrl);
                    }
                    else
                        return BadRequest("Your transaction could not be performed");
                }
                else
                    return null;
            }
            else
            {
                return null;//BadRequest("The email address registered in the system was not found..!");
            }
        }


    }
}
