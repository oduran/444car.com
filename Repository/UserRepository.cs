using _444Car.Interface;
using _444Car.InternalModels;
using _444Car.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace _444Car.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<t_Users> GetUserById(long id)
        {
            return await _context.t_Users.Where(x => x.id == id).FirstOrDefaultAsync();
        }
        public async Task<t_Users> GetUserByMail(string mail)
        {
            var user =  await _context.t_Users.Where(x => x.email == mail).FirstOrDefaultAsync();
            if(user == null)
            {
                return null;
            }
            return user;
        }

        public async Task<List<t_Users>> GetUserByRole(int roleId)
        {
            var user = await _context.t_Users.Where(x => x.role == roleId && x.status == "A").ToListAsync();
            if (user == null)
            {
                return null;
            }
            return user;
        }

        public async Task<int> updatePassword(t_Users obj)
        {

            t_Users UserResult = await _context.t_Users.Where(x => x.id == obj.id).FirstOrDefaultAsync();
            UserResult.passwordhash = obj.passwordhash;
            UserResult.passwordsalt = obj.passwordsalt;
            UserResult.pass_err_count = 0;

            _context.SaveChanges();

            return 1;
        }

        public async Task<int> UpdateUserProfileById(UserProfilesDto userProfilesObj, List<t_UserDocuments> docObj, t_Users users)
        {
            var user_id = users.id;
            //user var mı?
            t_Users UserResult = await _context.t_Users.Where(x => x.id == user_id).FirstOrDefaultAsync();
            if (UserResult != null)
            {
                using (var transaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        
                        if(String.IsNullOrEmpty(UserResult.mobile) && userProfilesObj.mobile.Length > 0)
                        {
                            UserResult.status = "T";
                        }
                        UserResult.name = (userProfilesObj.name != null)?userProfilesObj.name.ToUpper():"";
                        UserResult.surname = (userProfilesObj.surname != null) ? userProfilesObj.surname.ToUpper() : "";
                        UserResult.mobile = (userProfilesObj.mobile != null) ? userProfilesObj.mobile : "";
                        UserResult.modified_by = (userProfilesObj.modified_by != null) ? userProfilesObj.modified_by : "";
                        UserResult.modified_dt =  DateTime.Now;
                        if (UserResult.logintype != 1)
                            UserResult.username = userProfilesObj.companytitle.ToUpper();

                        _= await _context.SaveChangesAsync();

                        t_UserProfiles UserProfilesResult = await _context.t_userprofiles.Where(x => x.userid == user_id).FirstOrDefaultAsync();
                        if (UserProfilesResult != null)
                        {
                            UserProfilesResult.address = userProfilesObj.address;
                            UserProfilesResult.city = userProfilesObj.city;
                            UserProfilesResult.country = userProfilesObj.country;
                            UserProfilesResult.modified_dt = DateTime.Now;
                            UserProfilesResult.modified_by = userProfilesObj.modified_by;
                            UserProfilesResult.description = userProfilesObj.description;
                            UserProfilesResult.fax = userProfilesObj.fax;
                            UserProfilesResult.kdvno = userProfilesObj.kdvno;
                            UserProfilesResult.location = userProfilesObj.location;
                            UserProfilesResult.postcode = userProfilesObj.postcode;
                            UserProfilesResult.subcity = userProfilesObj.subcity;
                            UserProfilesResult.taxadmin = userProfilesObj.taxadmin;
                            UserProfilesResult.taxid = userProfilesObj.taxid;
                            UserProfilesResult.taxidentification = userProfilesObj.taxidentification;
                            UserProfilesResult.telephone = userProfilesObj.telephone;
                            UserProfilesResult.url = userProfilesObj.url;

                            if(docObj != null && docObj.Count > 0)
                            {
                                //daha once yüklenmiş resim var mı 
                                for (int i = 0; i < docObj.Count; i++)
                                {
                                    t_UserDocuments result = await _context.t_userdocuments.Where(x => x.user_id == user_id && x.document_type_id == docObj[i].document_type_id && x.status == "A").FirstOrDefaultAsync();
                                    if (result != null)
                                    {
                                        //varsa pasif yap
                                        result.status = "I";
                                        result.modified_dt = DateTime.Now;
                                        result.modified_by = docObj[i].created_by;
                                        //_ = await _context.SaveChangesAsync();
                                    }
                                        //yenisini ekle
                                        t_UserDocuments userDoc = new t_UserDocuments();
                                        userDoc.user_id = user_id;
                                        userDoc.document_type_id = docObj[i].document_type_id;
                                        userDoc.document_link = docObj[i].document_link;
                                        userDoc.created_dt = (DateTime)result.modified_dt;
                                        userDoc.created_by = docObj[i].created_by;
                                        userDoc.status = "A";
                                        _ = await _context.t_userdocuments.AddAsync(userDoc);
                                    
                                }
                                
                            }
                        }
                        else
                        {
                            //nullsa silinmiş yada ilkkez ekleneceği anlamına gelir.
                            t_UserProfiles userProf = new t_UserProfiles();
                            var dtime = DateTime.Now;
                            userProf.address = userProfilesObj.address;
                            userProf.city = userProfilesObj.city;
                            userProf.country = userProfilesObj.country;
                            userProf.created_dt = dtime;
                            userProf.modified_dt = dtime;
                            userProf.modified_by = userProfilesObj.modified_by;
                            userProf.description = userProfilesObj.description;
                            userProf.fax = userProfilesObj.fax;
                            userProf.kdvno = userProfilesObj.kdvno;
                            userProf.location = userProfilesObj.location;
                            userProf.postcode = userProfilesObj.postcode;
                            userProf.subcity = userProfilesObj.subcity;
                            userProf.taxadmin = userProfilesObj.taxadmin;
                            userProf.taxid = userProfilesObj.taxid;
                            if(userProfilesObj.logintype > 1)
                                userProf.taxidentification = userProfilesObj.taxidentification;
                            userProf.telephone = userProfilesObj.telephone;
                            userProf.url = userProfilesObj.url;
                            userProf.userid = user_id;

                            var result = await _context.t_userprofiles.AddAsync(userProf);

                            if (docObj != null && docObj.Count > 0)
                            {
                                for (int i = 0; i < docObj.Count; i++)
                                {
                                    t_UserDocuments userDoc = new t_UserDocuments();
                                    userDoc.user_id = user_id;
                                    userDoc.document_type_id = docObj[i].document_type_id;
                                    userDoc.document_link = docObj[i].document_link;
                                    userDoc.created_dt = dtime;
                                    userDoc.created_by = docObj[i].created_by;
                                    userDoc.status = "A";

                                    _ = await _context.t_userdocuments.AddAsync(userDoc);
                                }
                                
                            }

                        }

                        _ = await _context.SaveChangesAsync();
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        
                        transaction.Rollback();
                        return 0;
                    }
                }

            }
            else
            {
                //user yok
                return 0;
            }

            return 1;
        }

        public async Task<bool> DeleteUserDoc(t_UserDocuments userDoc)
        {
            try
            {
                t_UserDocuments _userDoc = await _context.t_userdocuments.Where(z => z.user_id == userDoc.user_id && z.status == "A" && z.document_link == userDoc.document_link).FirstOrDefaultAsync();
                if(_userDoc != null)
                {
                    _userDoc.status = "İ";
                    _ = await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<bool> AddUserDocs(t_UserDocuments userDoc)
        {
            try
            {
                _ = await _context.t_userdocuments.AddAsync(userDoc);
                _ = await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<int> UpdateUserPassErrById(int Userid)
        {
            
            t_Users UserResult = await _context.t_Users.Where(x => x.id == Userid).FirstOrDefaultAsync();
            if (UserResult != null)
            {
                if (UserResult.pass_err_count >= 3)
                {
                    UserResult.status = "B"; //Kullanıcı blokelenir.
                }
                else
                    UserResult.pass_err_count++;

                _context.SaveChanges();
                return 1;
            }
            else
                return 0;
            
            
        }

        public async Task<string> AddForgotPassword(long userId, Guid guidId)
        {
            try
            {
                    t_ForgotPasswords fpass = new t_ForgotPasswords();
                    fpass.userid = userId;
                    fpass.guid = guidId;
                    fpass.created_dt = DateTime.Now;
                    fpass.status = 0;
                //if (subject == "Reset Password")
                //{
                //    fpass.type = 1;
                //}
                    fpass.type = 1;
                    await _context.t_forgotpasswords.AddAsync(fpass);
                    await _context.SaveChangesAsync();

                    return "OK";
               
            }
            catch (Exception ex)
            {
                return "Hata " + ex.Message.ToString();
            }
        }
        public async Task<List<object>> GetUserProfiles() {

            var userProfiles = await (from ep in _context.t_userprofiles
                              join e in _context.t_userdocuments on ep.userid equals e.user_id
                              join t in _context.t_Users on e.user_id equals t.id
                              where e.user_id == ep.userid
                              select new
                              {
                                  documentLink = e.document_link,
                                  documentType = e.document_type_id,
                                  mobile = t.mobile,
                                  name = t.name,
                                  email = t.email,
                                  status = e.status,
                                  userid = e.user_id
                              }).ToListAsync();




            return userProfiles.Cast<object>().ToList();
        }
        private int SendEmails(string email, string subject, string messageText, string username)
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("info@444car.de");

                message.To.Add(new MailAddress(email));
                message.Subject = subject;
                message.IsBodyHtml = true; //to make message body as html  

                 
                
                string htmlString = @"<table width='100%' border='0' cellspacing='0' cellpadding='0'>
		<tbody>
			<tr>
				<td align='center' bgcolor='#f3f3f3'>
					<p>&nbsp;</p>
					<table width='600' border='0' cellspacing='0' cellpadding='0'>
						<tbody>
							<tr>
								<td colspan='3' bgcolor='#FFFFFF'><img src='https://444car.com/img/o/mailing_top.jpg' width='600'
										height='165' alt='' /></td>
							</tr>
							<tr>
								<td width='53' bgcolor='#FFFFFF'>&nbsp;</td>
								<td width='690' align='center' bgcolor='#FFFFFF'>
									<font face='Arial' size='2'>
										<p><br>
											<font size='+1' color='#40240e'> <strong>444CAR FORM</strong>
											</font>
											<hr>
											<br>
										</p>
									</font>
									<table width='100%' border='0' cellpadding='0' cellspacing='0'>
										<tbody>
											<tr>
												<td width='45%' height='30'><strong>
														<font size='2' face='Arial' color='#474747'> Adı</font>
													</strong></td>
												<td width='55%'>
													<font size='2' face='Arial' color='#474747'>  #username#  </font>
                                                </td>
											</tr>

											<tr>
												<td width='45%' height='30'><strong>
														<font size='2' face='Arial' color='#474747'> Soyadı</font>
													</strong></td>
												<td>
													<font size='2' face='Arial' color='#474747'> #usersurname#</font>
												</td>
											</tr>

											<tr>
												<td width='45%' height='30'><strong>
														<font size='2' face='Arial' color='#474747'> E-Mail</font>
													</strong></td>
												<td>
													<font size='2' face='Arial' color='#474747'> #useremail#</font>
												</td>
											</tr>
											<tr>
												<td width='45%' height='30'><strong>
														<font size='2' face='Arial' color='#474747'>Telefon Numarası
														</font>
													</strong></td>
												<td>
													<font size='2' face='Arial' color='#474747'> #usermobile#</font>
												</td>
											</tr>
											<tr>
												<td width='45%' height='30'><strong>
														<font size='2' face='Arial' color='#474747'>Mesajınız</font>
													</strong></td>
												<td>
													<font size='2' face='Arial' color='#474747'> #usermessage#</font>
												</td>
											</tr>

										</tbody>
									</table>
									<font face='Arial' size='2'>
										<p><br>

										</p>
										<p><strong>24.10.2018 - 14:30</strong><br>
											<br>
											<br>
										</p>
									</font>
								</td>
								<td width='57' bgcolor='#FFFFFF'>&nbsp;</td>
							</tr>
							<tr>
								<td bgcolor='#d5ecf4'>&nbsp;</td>
								<td height='30' align='center' bgcolor='#d5ecf4'>
									<font face='Arial' size='2' color='#000'><strong>www.444car.de</strong></font>
								</td>
								<td bgcolor='#d5ecf4'>&nbsp;</td>
							</tr>
						</tbody>
					</table>
					<p>&nbsp;</p>
					<p>&nbsp;</p>

				</td>
			</tr>
		</tbody>
	</table>";
                htmlString = htmlString.Replace("#username#", username);
                htmlString = htmlString.Replace("#useremail#", email);
                htmlString = htmlString.Replace("#usermessage#", messageText);
                message.Body = htmlString;

                smtp.Port = 587;
                smtp.Host = "mail.444car.com";
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;


                var _passMail = "7Zqhn?48";


                smtp.Credentials = new NetworkCredential("info@444car.de", _passMail);
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);

                return 1;
            }
            catch (Exception ex)
            {
                var xxx = ex.Message;
            }

            return 0;
        }

        public async Task<int> UpdateUserStatusById(long id, string status, string modifiedby)
        {
            t_Users UserResult = await _context.t_Users.Where(x => x.id == id).FirstOrDefaultAsync();
            if (UserResult != null)
            {

                UserResult.status = status;
                UserResult.modified_by = modifiedby;
                UserResult.modified_dt = DateTime.Now;
                //Eğer user üzerinde bir değişiklik yapıldığında loglanacak ise burada o log tutulmalı 
                _context.SaveChanges();
                return 1;
            }
            else
                return 0;
        }

        public async Task<int> SetUserPassword(long userId, string password)
        {
            try
            {
                t_Users _user = await _context.t_Users.Where(x => x.id == userId).FirstOrDefaultAsync();
            
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                _user.passwordhash = passwordHash;
                _user.passwordsalt = passwordSalt;

                //_context.t_Users.Update(_user);
                await _context.SaveChangesAsync();

                return 1;
            }
            catch (Exception)
            {

                return 0;
            }
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<t_UserProfiles> GetUserProfileById(long id)
        {
            t_UserProfiles userProfilesResult = await _context.t_userprofiles.Where(x => x.userid == id).FirstOrDefaultAsync();
            if (userProfilesResult != null)
            {
                return userProfilesResult;
            }
            return null;
        }
        
        public async Task<List<t_UserDocuments>> GetUserDocs(long id)
        {
            List<t_UserDocuments> userDocs = await _context.t_userdocuments.Where(x => x.user_id == id && x.status == "A").ToListAsync();
            if (userDocs != null)
            {
                return userDocs;
            }
            return null;
        }

        public Task UpdateUserProfileById(JObject userProfileObj, List<t_UserDocuments> docList, t_Users user)
        {
            throw new NotImplementedException();
        }

        //public int SendEmails(string email, string subject, string messageText, string username)
        //{
        //    try
        //    {
        //        MailMessage message = new MailMessage();
        //        SmtpClient smtp = new SmtpClient();
        //        message.From = new MailAddress("bilgi@444car.com");
        //        message.To.Add(new MailAddress(email));
        //        message.Subject = subject;
        //        message.IsBodyHtml = true; //to make message body as html  

        //        string htmlString = @"<html>" +
        //              "<body> " +
        //              "<p>Sayın " + username + ",</p> " +
        //              "<p> " + messageText + "</p> " +
        //              "<p>Teşekkürler,<br> ARKSOFT A.Ş</br> </p> " +
        //              "</body> " +
        //              "</html> ";
        //        message.Body = htmlString;

        //        smtp.Port = 587;
        //        smtp.Host = "smtp.office365.com";
        //        smtp.EnableSsl = true;
        //        smtp.UseDefaultCredentials = false;

        //        EncryptSessionLimit.EncryptSessionLimit _dencrypt = new EncryptSessionLimit.EncryptSessionLimit();
        //        var _passMail = _dencrypt.Decrypt(_passMailEncripty);

        //        //write to sendmail table
        //        t_SendEmail sendEmail = new t_SendEmail();
        //        sendEmail.emailto = email;
        //        sendEmail.emailtype = 1;
        //        sendEmail.emailstatus = 1;
        //        sendEmail.created_dt = DateTime.Now;
        //        sendEmail.content = htmlString;
        //        sendEmail.emailfrom = message.From.ToString();
        //        sendEmail.sented_dt = DateTime.Now;
        //        sendEmail.subject = subject;

        //        _context.t_sendemails.AddAsync(sendEmail);
        //        _context.SaveChangesAsync();

        //        smtp.Credentials = new NetworkCredential("printer@arksoft.com.tr", _passMail);
        //        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
        //        smtp.Send(message);

        //        //LogInfo(email + "adresine " + DateTime.Now + " tarihinde mail gönderildi..!");
        //        return 1;
        //    }
        //    catch (Exception ex)
        //    {
        //        //LogInfo(username + " kişiye Mail gönderilemedi  hata= " + ex.Message);
        //        return 0;
        //    }
        //}
    }
}
