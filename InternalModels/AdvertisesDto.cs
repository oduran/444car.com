using _444Car.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.InternalModels
{
    public class AdvertisesDto
    {
        public long userId { get; set; }
        public long advertisesId { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public DateTime registrationDate { get; set; }
        public DateTime expiredDate { get; set; }
        public string status { get; set; }
        public List<t_Offers> offerList { get; set; }
        
    }
}
