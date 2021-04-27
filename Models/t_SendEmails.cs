using System;
using System.ComponentModel.DataAnnotations;

namespace _444Car.Models
{
    public class t_SendEmails
    {
        [Key]
        public long id { get; set; }
        public int emailstatus { get; set; }
        public int emailtype { get; set; }
        public string emailto { get; set; }
        public string emailcc { get; set; }
        public string emailfrom { get; set; }
        public DateTime created_dt { get; set; }
        public DateTime sented_dt { get; set; }
        public string subject { get; set; }
        public string content { get; set; }

    }
}