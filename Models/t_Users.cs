using System;
using System.ComponentModel.DataAnnotations;

namespace _444Car.Models
{
    public class t_Users
    {
        [Key]
        public long id { get; set; }
        [Required]
        public string username { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string mobile { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
        public byte[] passwordhash { get; set; }
        public byte[] passwordsalt { get; set; }
        public DateTime pass_modified_dt { get; set; }
        public DateTime pass_lastcange_tr { get; set; }
        public int pass_err_count { get; set; }
        public int pass_status { get; set; }
        public string status { get; set; }
        public long tckn { get; set; }
        public string vkn { get; set; }
        public string vkn2 { get; set; }
        public string modified_by { get; set; }
        public DateTime modified_dt { get; set; }
        public int role { get; set; }
        public string mfasecretkey { get; set; }
        public string emailsecretkey { get; set; }
        public int logintype { get; set; }
        public DateTime? check_dt { get; set; }
        public string check_by { get; set; }

    }
}