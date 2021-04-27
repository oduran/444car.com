using System;
using System.ComponentModel.DataAnnotations;

namespace _444Car.Models
{
    public class t_UsersLog
    {
        [Key]
        public long id { get; set; }
        public long userid { get; set; }
        public int typeid { get; set; }
        public string description { get; set; }
        public DateTime created_dt { get; set; }
        public long advertise_id { get; set; }
        public long offer_id { get; set; }
    }
}