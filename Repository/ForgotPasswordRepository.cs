using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _444Car.Interface;
using _444Car.Models;
using Microsoft.EntityFrameworkCore;

namespace _444Car.Repository
{
    public class ForgotPasswordRepository : IForgotPasswordRepository
    {
        private readonly AppDbContext _context;
        public ForgotPasswordRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<int> AddForgotPassword(long userid, Guid guid, int type)
        {
            try
            {
                var result = await _context.t_forgotpasswords.Where(x => x.guid == guid && x.status == 0).OrderByDescending(d => d.created_dt).FirstOrDefaultAsync();
                if(result != null)
                {
                    result.guid = guid;
                    result.created_dt = DateTime.Now;
                    result.status = 0;
                    result.type = type;
                    _ = await _context.SaveChangesAsync();

                    return 1;
                }
                t_ForgotPasswords fpass = new t_ForgotPasswords();
                fpass.userid = userid;
                fpass.guid = guid;
                fpass.created_dt = DateTime.Now;
                fpass.status = 0;
                fpass.type = type;

                _ = await _context.t_forgotpasswords.AddAsync(fpass);
                _ = await _context.SaveChangesAsync();

                return 1;
            }
            catch (Exception)
            {

                return 0;
            }
           
        }

      

        public async Task<t_ForgotPasswords> GetItemByGuid(Guid guid)
        {
            var result = await _context.t_forgotpasswords.Where(x => x.guid == guid && x.status == 0).OrderByDescending(d => d.created_dt).FirstOrDefaultAsync();
            
            return result;
        }
    }
}
