using System;
using System.ComponentModel.DataAnnotations;

namespace _444Car.Models
{
    public class t_Payments
    {
        [Key]
        public int id { get; set; }
        public long advertise_id { get; set; }
        public long offer_id { get; set; }

        public long user_id { get; set; }
        public decimal price { get; set; }

        public DateTime createddate { get; set; }





    }
}