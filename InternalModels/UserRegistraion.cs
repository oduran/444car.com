using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.InternalModels
{
    public class UserRegistration
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "You must specify a password between 8 and 20 characters.")]
        public string Password { get; set; }

        public string Name { get; set; }
        public string CompanyNo { get; set; }

        public string CompanyName { get; set; }
        
        //Araç firması seçildi ise 1, değilse = 0 gelsin
        public int SpecialCompany { get; set; }
    }
}
