using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.InternalModels
{
    public class CarCompanyOffer
    {
        public long id { get; set; }
        public long OfferValue { get; set; }
        public int MonthlUse { get; set; }
        public int RentalTerm { get; set; }
        public int Payment1 { get; set; }
        public int Payment2 { get; set; }
        public int Payment3 { get; set; }
        public DateTime OfferDueDate { get; set; }
        public int AnyOtherCarForRent { get; set; }



    }
}
