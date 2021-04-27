using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace _444Car.Models
{
    public class t_AdvertisesDetail
    {
        [Key]
        [JsonProperty("id")]
        public long id { get; set; }
        [Required]
        public long advertise_id { get; set; }
        public int atribute_id { get; set; }
        public int value { get; set; }

    }
}