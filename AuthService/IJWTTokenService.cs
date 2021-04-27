using _444Car.InternalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.AuthServices
{
    public interface IJWTTokenService
    {
    
        public string GenerateToken(UserLogin request);
         public string DecodeJWT(string jwtToken);
}
}
