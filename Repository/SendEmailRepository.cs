using _444Car.Interface;
using _444Car.InternalModels;
using _444Car.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace _444Car.Repository
{
    public class SendEmailRepository : ISendEmailRepository
    {
        private readonly AppDbContext _context;

        public SendEmailRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<List<t_SendEmails>> GetAllMails(int days)
        {
            if (days > 7)
                days = 7;
            if (days == 0)
                days = 1;

            var date = DateTime.Now.AddDays(-days);
            //son 7 gunun datası getirilir 
            var result = await _context.t_sendemails.Where(d => d.created_dt >= date).ToListAsync();

            return result;
        }

        public async Task<List<t_SendEmails>> GetAllWaitingMails(int days)
        {
            if (days > 7)
                days = 7;
            if (days == 0)
                days = 1;

            var date = DateTime.Now.AddDays(-days);
            var result = await _context.t_sendemails.Where(d => d.emailstatus != 1 && d.created_dt >= date).ToListAsync();

            return result;
        }


	 
		public async Task<int> SendMail(Mail objMail,Guid guid)
        {
            //var guid = Guid.NewGuid();
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("info@444car.de");

                message.To.Add(new MailAddress(objMail.email));
                message.Subject = objMail.subject;
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
				//htmlString = htmlString.Replace("#username#", objMail.username);
				//htmlString = htmlString.Replace("#useremail#", objMail.email);
				htmlString = htmlString.Replace("#usermessage#", objMail.messageText);

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
                return 0;
            }
        }

        public async Task<int> SendMail(Mail mail)
        {

			try
			{
				MailMessage message = new MailMessage();
				SmtpClient smtp = new SmtpClient();
				message.From = new MailAddress("info@444car.de");
				message.To.Add(new MailAddress(mail.email));
				message.Subject = mail.subject;
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
																			<font size='+1' color='#40240e'> <strong>444CAR</strong>
																			</font>
																			<hr>
																			<br>
																		</p>
																	</font>
																	<font size='2' face='Arial' color='#474747'>#usermessage#</font>

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
				//htmlString = htmlString.Replace("#username#", mail.username);
				//htmlString = htmlString.Replace("#useremail#", mail.email);
				htmlString = htmlString.Replace("#usermessage#", mail.messageText);
				message.Body = htmlString;

				smtp.Port = 587;
				smtp.Host = "mail.444car.com";
				smtp.EnableSsl = true;
				smtp.UseDefaultCredentials = false;


				var _passMail = "7Zqhn?48";


				smtp.Credentials = new NetworkCredential("info@444car.de", _passMail);
				smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
				smtp.Send(message);

				return await Task.FromResult<int>(1);
			}
			catch (Exception ex)
			{
				return await Task.FromResult<int>(0);

			}
		}
    }
}
