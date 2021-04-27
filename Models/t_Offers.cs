using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Models
{
    public class t_Offers
    {
        [Key]
        public long id { get; set; }
        public long advertise_id { get; set; }
        public long user_id { get; set; }
        public long offer_value { get; set; }
        public int usage { get; set; }
        public int rental_period { get; set; }
        public long payment1 { get; set; }
        public long payment2 { get; set; }
        public long payment3 { get; set; }
        public DateTime offer_due_date { get; set; }
        public DateTime created_dt { get; set; }
        public DateTime modified_dt { get; set; }
        public string status { get; set; }
        public int any_other_car_for_rent { get; set; }


    }
}
