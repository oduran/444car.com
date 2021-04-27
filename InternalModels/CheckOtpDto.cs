using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.InternalModels
{
    public class CheckOtpDto
    {
        
        public string countryCode { get; set; }
        public string phoneNumber { get; set; }
        public string reference { get; set; }
        public string code { get; set; }
    }
}
