using System;
using System.ComponentModel.DataAnnotations;

namespace _444Car.Models
{
    public class t_UserProfiles
    {
        [Key]
        public long userid { get; set; }
        public string address { get; set; }
        public string telephone { get; set; }
        public string fax { get; set; }
        public string url { get; set; }
        public string country { get; set; }
        public string city { get; set; }
        public string subcity { get; set; }
        public string location { get; set; }
        public string postcode { get; set; }
        public string taxadmin { get; set; }
        public string taxidentification { get; set; }
        public string taxid { get; set; }
        public string kdvno { get; set; }
        public string description { get; set; }
        public DateTime created_dt { get; set; }
        public string modified_by { get; set; }
        public DateTime modified_dt { get; set; }
      

    }
}