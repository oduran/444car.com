using _444Car.InternalModels;
using _444Car.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface IPaymentRepository
    {
        
        Task<long> AddPayment(t_Payments paymentsObj);
        Task<List<t_Payments>> GetPaymentsByUserId(long userId);
        Task<List<t_Payments>> GetPaymentsByAdvertisesId(long advertisesId);
        Task<List<t_Payments>> GetPaymentsByOffersId(long offersId);
    }
}
