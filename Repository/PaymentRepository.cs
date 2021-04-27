using _444Car.Interface;
using _444Car.InternalModels;
using _444Car.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Repository
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly AppDbContext _context;

        public PaymentRepository(AppDbContext context)
        {
            this._context = context;
        }
      

        public async Task<long> AddPayment(t_Payments paymentsObj)
        {
            if (paymentsObj == null)
            {
                return -1;
            }

            _context.t_payments.Add(paymentsObj);
            _context.SaveChanges();

            var paymentId = paymentsObj.id;

            return paymentId;
        }

        public async Task<List<t_Payments>> GetPaymentsByUserId(long userId)
        {
            List<t_Payments> result = await _context.t_payments.Where(x => x.user_id == userId).ToListAsync();

            return result;
        }

        public async Task<List<t_Payments>> GetPaymentsByAdvertisesId(long advertisesId)
        {
            //burada user tablosu ile joinlenip user bilgileri getililmeli
            List<t_Payments> result = await _context.t_payments.Where(x => x.advertise_id == advertisesId).ToListAsync();

            return result;
        }

        public async Task<List<t_Payments>> GetPaymentsByOffersId(long offersId)
        {
            //buradada user tablosu ile joinlenip user bilgileri getililmeli
            List<t_Payments> result = await _context.t_payments.Where(x => x.offer_id == offersId).ToListAsync();

            return result;
        }
    }
}
