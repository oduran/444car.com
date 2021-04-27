using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Models
{
    public class t_ForgotPasswords
    {
        public long userid { get; set; }
        [Key]
        public Guid guid { get; set; }
        public DateTime created_dt { get; set; }
        public int status { get; set; }
        public int type { get; set; }

    }
}
