using _444Car.Models;
using _444Car.InternalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface ICityRepository
    {
        Task<List<t_Cities>> GetCities();
        Task<List<t_Cities>> GetCities(int countryId);
    }
}
