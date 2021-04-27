using _444Car.Models;
using _444Car.InternalModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface IBussinesRepository
    {
        Task<List<t_Colors>> GetCollors();
        Task<List<t_Colors>> GetCollors(int countryId);
    }
}
