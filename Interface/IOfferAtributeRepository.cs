using _444Car.Models;
using _444Car.InternalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface IOfferAtributeRepository
    {
        Task<List<object>> GetOfferAtributesGroup();
        Task<List<object>> GetOfferAtributesGroup(int CountryId);
        Task<List<t_OfferAtributes>> GetOfferAtributesGroupByName(int CountryId, string GroupName);
    }
}
