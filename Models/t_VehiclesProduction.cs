using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Models
{
    public class t_VehiclesProduction
    {
        [Key]
        public long id { get; set; }
        public int type { get; set; }
        public int value { get; set; }

    }
}
