using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.InternalModels
{
    public class UserDto
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }
    }
}
