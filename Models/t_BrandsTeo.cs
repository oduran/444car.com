using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Models
{
    public class t_BrandsTeo
    {
        [Key]
        public long id { get; set; }
        public string brand { get; set; }
        public string registration_month { get; set; }
        public int registration_year { get; set; }
        public string model { get; set; }
        public string fuel_type { get; set; }
        public string ps { get; set; }
        public string model_type { get; set; }
        public string vehicle_body_type { get; set; }
        public string production_period { get; set; }
        public string number_of_dors { get; set; }
        public string gear { get; set; }
        public string engine_capacity { get; set; }
        public string emission { get; set; }
        public string status { get; set; }
        public string serial { get; set; }


    }
}
