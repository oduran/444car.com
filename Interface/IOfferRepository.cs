using _444Car.InternalModels;
using _444Car.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface IOfferRepository
    {
        Task<long> AddOffer(t_Offers offerObj, List<t_OffersDetail> detailList);
        Task<long> UpdateOffer(t_Offers offerObj, List<t_OffersDetail> detailList);
        Task<List<t_Offers>> GetOfferById(long userId);
        Task<List<t_Offers>> GetAllOffer();
        Task<List<t_OffersDetail>> GetOfferDetailById(long offerId);
        Task<List<t_Offers>> GetInComingOffers(long advertiseId);
        Task<List<t_OfferAtributes>> GetOfferServiceBy444(int countryId);
        Task<List<StandartFreeService>> GetOfferAtributesById(long offerId, string name, int countryId);
    }
}
