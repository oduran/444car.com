using _444Car.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.InternalModels
{
    public class RequestAdvertises
    {
        public t_Advertises AdvertisesObj { get; set; }
        public t_AdvertisesDetail AdvertisesDetailObj { get; set; }
        public t_AdvertisesImage AdvertisesImageObj { get; set; }
    }
}
