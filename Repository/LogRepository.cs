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
    public class LogRepository : ILogRepository
    {
        private readonly AppDbContext _context;

        public LogRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<t_Types> AddLogEvent(t_UsersLog usersLogObj)
        {

            var result = await _context.t_userslog.AddAsync(usersLogObj);
            await _context.SaveChangesAsync();

            return null;
        }
    }
}
