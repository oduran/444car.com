using _444Car.Interface;
using _444Car.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext _context;

        public AuthRepository(AppDbContext context)
        {
            this._context = context;
        }
        public async Task<t_Users> Login(string email, string password)
        {
            t_Users user = await _context.t_Users.Where(x => x.email == email).FirstOrDefaultAsync(); //Get user from database.
            if (user == null)
                return null; // User does not exist.

            if (!VerifyPassword(password, user.passwordhash, user.passwordsalt))
                return null;

            return user;
        }
        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); // Create hash using password salt.
                for (int i = 0; i < computedHash.Length; i++)
                { // Loop through the byte array
                    if (computedHash[i] != passwordHash[i]) return false; // if mismatch
                }
            }
            return true; //if no mismatches.
        }

        
        public async Task<t_Users> Register(t_Users user, string password, int type)
        {
            try
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.passwordhash = passwordHash;
                user.passwordsalt = passwordSalt;
                user.username = user.username;
                user.status = "O";

                user.modified_dt = DateTime.Now;
                

                //eğer bu e-mail ile kayıt yoksa insert varsa update edilecek. 
                if(type == 0)
                     await _context.t_Users.AddAsync(user); // Adding the user to context of users.
                
                await _context.SaveChangesAsync();

                return user;

            }
            catch (Exception ex)
            {

                return null;
            }
             // Save changes to database.

            return user;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string email)
        {
            if (await _context.t_Users.AnyAsync(x => x.email == email))
                return true;
            return false;
        }

        public async Task<t_Users> UserExistsRegister(string email)
        {
            var result = await _context.t_Users.FirstOrDefaultAsync(x => x.email == email);

            return result;
               
        }

        public async Task<t_Users> GetUser(string email)
        {
            return await _context.t_Users.FirstOrDefaultAsync(x => x.email == email);
        }
        public async Task<List<t_Users>> GetAllUsers()
        {
            return await _context.t_Users.ToListAsync();
        }

    }
}
