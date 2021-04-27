using System;
using System.ComponentModel.DataAnnotations;

namespace _444Car.Models
{
    public class t_Types
    {
        [Key]
        public long id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string status { get; set; }

    }
}