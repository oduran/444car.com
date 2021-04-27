using _444Car.Models;
using _444Car.InternalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface IVechileAtributeRepository
    {
        Task<List<object>> GetAtributesGroup();
        Task<List<object>> GetAtributesGroup(int CountryId);
        Task<List<t_VehicleAtributes>> GetAtributesGroupByName(int CountryId, string GroupName);
    }
}
