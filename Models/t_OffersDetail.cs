using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Models
{
    public class t_OffersDetail
    {
        [Key]
        public long id { get; set; }
        public long offer_id { get; set; }
        public long atribute_id { get; set; }
        public int value { get; set; }
    }
}
