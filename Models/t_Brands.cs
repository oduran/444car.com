using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Models
{
    public class t_Brands
    {
        [Key]
        public int id { get; set; }
        public int brand_id { get; set; }
        public int model_id { get; set; }
        public string brand_name { get; set; }
        public string model_name { get; set; }
        public string status { get; set; }

    }
}
