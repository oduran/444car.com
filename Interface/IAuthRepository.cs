using _444Car.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface IAuthRepository
    {
        Task<t_Users> Register(t_Users user, string password, int type);
        Task<t_Users> Login(string email, string password);
        Task<bool> UserExists(string email);
        Task<t_Users> UserExistsRegister(string email);
        Task<t_Users> GetUser(string email);
        Task<List<t_Users>> GetAllUsers();
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        
    }
}
