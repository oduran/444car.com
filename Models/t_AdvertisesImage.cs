using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Models
{
    public class t_AdvertisesImage
    {
        [Key]
        public long id { get; set; }
        public long advertise_id { get; set; }
        public string images_link { get; set; }

    }
}
