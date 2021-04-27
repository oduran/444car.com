using System;
using System.ComponentModel.DataAnnotations;

namespace _444Car.Models
{
    public class t_UserDocuments
    {
        [Key]
        public long id { get; set; }
        public long user_id { get; set; }
        public int document_type_id { get; set; }
        public string document_link { get; set; }
        public DateTime created_dt { get; set; }
        public string created_by { get; set; }
        public DateTime? modified_dt { get; set; }
        public string modified_by { get; set; }
        public string status { get; set; }

    }
}