using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Models
{
    public class t_EnginesCapacity
    {
        [Key]
        public int id { get; set; }
        public int country_id { get; set; }
        public string description { get; set; }
        public string status { get; set; }

    }
}
