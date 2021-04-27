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
    public class OfferRepository : IOfferRepository
    {
        private readonly AppDbContext _context;

        public OfferRepository(AppDbContext context)
        {
            this._context = context;
        }



        public async Task<long> AddOffer(t_Offers offerObj, List<t_OffersDetail> detailList)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    //ilk olarak t_Offers  tablosuna insert işlemi gerçekleştirilir ve akabinde teklif numarası alınarak diğerine insert edilir.

                    if (offerObj == null)
                    {
                        return -1;
                    }

                    _context.t_offers.Add(offerObj);
                    _context.SaveChanges();

                    var offerId = offerObj.id;

                    if (detailList != null)
                    {
                        for (int i = 0; i < detailList.Count; i++)
                        {
                            var offersDetail = new t_OffersDetail();
                            offersDetail.offer_id = offerId;
                            offersDetail.atribute_id = detailList[i].atribute_id;
                            offersDetail.value = detailList[i].value;
                            _context.t_offersdetail.Add(offersDetail);
                            _context.SaveChanges();
                        }
                    }

                    transaction.Commit();

                    return offerId;

                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return 0;
                }
            }
        }


        public async Task<long> UpdateOffer(t_Offers offerObj, List<t_OffersDetail> detailList)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    if (offerObj == null)
                    {
                        return -1;
                    }


                    t_Offers obj = await _context.t_offers.Where(d => d.id == offerObj.id).FirstOrDefaultAsync();
                    if (obj != null)
                    {
                        obj.offer_value= offerObj.offer_value;
                        obj.usage = offerObj.usage;
                        obj.rental_period = offerObj.rental_period;
                        obj.payment1 = offerObj.payment1;
                        obj.payment2 = offerObj.payment2;
                        obj.payment3 = offerObj.payment3;
                        obj.offer_due_date = offerObj.offer_due_date;
                        obj.modified_dt = DateTime.Now;
                        obj.any_other_car_for_rent = offerObj.any_other_car_for_rent;

                        _ = await _context.SaveChangesAsync();
                    }

                    var offerId = obj.id;

                    if (detailList != null)
                    {
                        for (int i = 0; i < detailList.Count; i++)
                        {
                            if (detailList[i].id > -1) //kayıt var demektir.
                            {
                                t_OffersDetail detailObj = await _context.t_offersdetail.Where(e => e.id == detailList[i].id && e.offer_id == detailList[i].offer_id).FirstOrDefaultAsync();
                                                               
                                detailObj.atribute_id = detailList[i].atribute_id;
                                detailObj.value = detailList[i].value;

                                _ = await _context.SaveChangesAsync();
                            }
                            else  //kayıt yoksa eklenir
                            {
                                var offersDetail = new t_OffersDetail();
                                offersDetail.offer_id = offerId;
                                offersDetail.atribute_id = detailList[i].atribute_id;
                                offersDetail.value = detailList[i].value;

                                _ = await _context.t_offersdetail.AddAsync(offersDetail);
                                _ = await _context.SaveChangesAsync();
                            }
                        }
                    }

                    transaction.Commit();

                    return offerId;

                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return 0;
                }
            }
        }

        public async Task<List<t_Offers>> GetOfferById(long userId)
        {
            List<t_Offers> result = await _context.t_offers.Where(x => x.user_id == userId && x.status == "A").ToListAsync();
            
            return result;
        }

        public async Task<List<t_Offers>> GetAllOffer()
        {
            List<t_Offers> result = await _context.t_offers.Where(x => x.status == "A").ToListAsync();

            return result;
        }
        public async Task<List<t_OffersDetail>> GetOfferDetailById(long offerId)
        {
            List<t_OffersDetail> result = await _context.t_offersdetail.Where(x => x.offer_id == offerId).ToListAsync();

            return result;
        }

        public async Task<List<t_Offers>> GetInComingOffers(long advertiseId)
        {
            List<t_Offers> result = await _context.t_offers.Where(x => x.advertise_id == advertiseId && x.status == "A").ToListAsync();

            return result;
        }

        public async Task<List<t_OfferAtributes>> GetOfferServiceBy444(int countryId)
        {
            List<t_OfferAtributes> result = await _context.t_offeratributes.Where(x => x.country_id == countryId && x.description == "444CAR Services" && x.status == "P").ToListAsync();

            return result;
        }

        public async Task<List<StandartFreeService>> GetOfferAtributesById(long offerId, string name, int countryId)
        {
            List<StandartFreeService> result = await _context.t_offeratributes.Join(_context.t_offersdetail, x => x.id, o => o.atribute_id, (x, o) => new { x, o })
                .Where(y => y.o.offer_id == offerId && y.x.description == name && y.x.country_id == countryId && y.x.status == "A")
                .Select(y => new StandartFreeService
                 {
                     Offerid = y.o.offer_id,
                     OfferAtributeId = y.o.atribute_id,
                     Description = y.x.value,
                     Value = y.o.value
                 }).ToListAsync();
                
            return result;
        }

    }
}
