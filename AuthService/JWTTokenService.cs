using _444Car.InternalModels;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace _444Car.AuthServices
{
    public class JWTTokenService : IJWTTokenService
    {
        private readonly TokenOption _options;

        public JWTTokenService(IOptions<TokenOption> options)
        {
            _options = options.Value;
        }

        public string DecodeJWT(string jwtToken)
        {
            var stream = jwtToken;
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);
            var tokenS = handler.ReadToken(stream) as JwtSecurityToken;
            var jti = tokenS.Claims.First().Value;
            return jti;
        }

        public string GenerateToken(UserLogin request)
        {
            //GenericIdentity classı kullanıldı
            var handler = new JwtSecurityTokenHandler();
            ClaimsIdentity identity = new ClaimsIdentity(
                new GenericIdentity(request.email),
                 new[]
                {
                    new Claim(ClaimTypes.Name, request.email)
                }
            );
            var keyByteArray = Encoding.ASCII.GetBytes(_options.Secret);
            var signingKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(keyByteArray);
            // SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Secret));
            // var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = _options.Issuer,
                Audience = _options.Audience,
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
                Subject  = identity,
                Expires = DateTime.Now.Add(TimeSpan.FromDays(1)),
                NotBefore = DateTime.Now
            });
            //var jwtToken = new JwtSecurityToken(
            //    _options.Issuer,
            //    _options.Audience,
            //    expires: DateTime.Now.AddMinutes(_options.AccessExpiration),
            //    signingCredentials: credentials
            //);
            //EncryptSessionLimit.EncryptSessionLimit asd = new EncryptSessionLimit.EncryptSessionLimit();

            //return new JwtSecurityTokenHandler().WriteToken(jwtToken);
            return handler.WriteToken(securityToken);
        }
    }
}
