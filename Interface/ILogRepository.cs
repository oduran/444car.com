using _444Car.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface ILogRepository
    {
        Task<t_Types> AddLogEvent(t_UsersLog usersLogObj);
       
    }
}
