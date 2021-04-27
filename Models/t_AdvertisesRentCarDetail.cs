using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;

namespace _444Car.Models
{
    public class t_AdvertisesRentCarDetail
    {
        [Key]
        [JsonProperty("id")]
        public long id { get; set; }
        [Required]
        public long advertise_id { get; set; }
        public string brand { get; set; }
        public string serial { get; set; }

        public string vehicle_body_type { get; set; }
        public string fuel_type { get; set; }
        public int rental_period { get; set; }
        public int usage { get; set; }

    }
}