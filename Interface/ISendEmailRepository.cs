using _444Car.Models;
using _444Car.InternalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface ISendEmailRepository
    {
        Task<int> SendMail(Mail objMail,Guid guidId);
        Task<int> SendMail(Mail objMail);
        Task<List<t_SendEmails>> GetAllMails(int days);
        Task<List<t_SendEmails>> GetAllWaitingMails(int days);
    }
}
