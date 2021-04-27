using _444Car.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.InternalModels
{
    public class ResponseOffersList
    {
        public CarCompanyOffer CarCompanyOfferObj { get; set; }
        public ServiceBy444Car ServiceBy444CarObj { get; set; }
        public StandartFreeService StandartFreeServiceObj { get; set; }
        public ExtraFreeServices ExtraFreeServicesObj { get; set; }

    }
}
