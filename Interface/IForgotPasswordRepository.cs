using _444Car.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface IForgotPasswordRepository
    {
        Task<t_ForgotPasswords> GetItemByGuid(Guid guid);
        Task<int> AddForgotPassword(long userid, Guid guid, int type);

     }
}
