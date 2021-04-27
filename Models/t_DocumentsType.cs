using System;
using System.ComponentModel.DataAnnotations;

namespace _444Car.Models
{
    public class t_DocumentsType
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }

    }
}