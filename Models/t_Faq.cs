using System;
using System.ComponentModel.DataAnnotations;

namespace _444Car.Models
{
    public class t_Faq
    {
        [Key]
        public Int32 id { get; set; }
        public Int32 country_id { get; set; }
        public string question { get; set; }
        public string answer { get; set; }
        public string status { get; set; }
        public int type { get; set; }

    }
}