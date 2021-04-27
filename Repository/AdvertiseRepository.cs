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
    public class AdvertiseRepository : IAdvertiseRepository
    {
        private readonly AppDbContext _context;

        public AdvertiseRepository(AppDbContext context)
        {
            this._context = context;
        }


        public async Task<long> AddAdvertise(t_Advertises advertiseListObj, List<t_AdvertisesDetail> detailList)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    //ilk olarak t_Advertises  tablosuna insert işlemi gerçekleştirilir ve akabinde ilan numarası alınarak diğerlerine insert edilmelidir.

                    if (advertiseListObj == null)
                    {
                        return -1;
                    }

                    _context.t_advertises.Add(advertiseListObj);
                    _context.SaveChanges();

                    var advertiseId = advertiseListObj.id;

                    //_context.t_advertises.Add(advertiseListObj);


                    for (int i = 0; i < detailList.Count; i++)
                    {
                        var advertisesDetail = new t_AdvertisesDetail();
                        advertisesDetail.advertise_id = advertiseId;
                        advertisesDetail.atribute_id = detailList[i].atribute_id;
                        advertisesDetail.value = detailList[i].value;
                        _context.t_advertisesdetail.Add(advertisesDetail);
                        _context.SaveChanges();
                    }


                    //for (int k = 0; k < imageList.Count; k++)
                    //{
                    //    var advertisesImage = new t_AdvertisesImage();
                    //    advertisesImage.advertise_id = advertiseId;
                    //    advertisesImage.images_link = imageList[k].images_link;
                    //    _context.t_advertisesimage.Add(advertisesImage);
                    //    _context.SaveChanges();
                    //}

                    transaction.Commit();

                    return advertiseId;

                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return 0;
                }
            }
        }

        public async Task<long> AddAdvertiseNew(t_Advertises advertiseListObj, List<t_AdvertisesDetail> detailList, List<t_AdvertisesRentCarDetail> detailRentCarList)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    //ilk olarak t_Advertises  tablosuna insert işlemi gerçekleştirilir ve akabinde ilan numarası alınarak diğerlerine insert edilmelidir.

                    if (advertiseListObj == null)
                    {
                        return -1;
                    }

                    _context.t_advertises.Add(advertiseListObj);
                    _context.SaveChanges();

                    var advertiseId = advertiseListObj.id;

                    //_context.t_advertises.Add(advertiseListObj);

                    if (detailList != null)
                    {
                        for (int i = 0; i < detailList.Count; i++)
                        {
                            var advertisesDetail = new t_AdvertisesDetail();
                            advertisesDetail.advertise_id = advertiseId;
                            advertisesDetail.atribute_id = detailList[i].atribute_id;
                            advertisesDetail.value = detailList[i].value;
                            _context.t_advertisesdetail.Add(advertisesDetail);
                            _context.SaveChanges();
                        }
                    }
                    if (advertiseListObj.diffrent_car_choose == 1 && detailRentCarList != null)
                    {
                        for (int k = 0; k < detailRentCarList.Count; k++)
                        {
                            var advertisesRentCarDetail = new t_AdvertisesRentCarDetail();
                            advertisesRentCarDetail.advertise_id = advertiseId;
                            advertisesRentCarDetail.brand = detailRentCarList[k].brand;
                            advertisesRentCarDetail.serial = detailRentCarList[k].serial;
                            advertisesRentCarDetail.vehicle_body_type = detailRentCarList[k].vehicle_body_type;
                            advertisesRentCarDetail.fuel_type = detailRentCarList[k].fuel_type;
                            advertisesRentCarDetail.rental_period = detailRentCarList[k].rental_period;
                            advertisesRentCarDetail.usage = detailRentCarList[k].usage;

                            _context.t_advertisesrentcardetail.Add(advertisesRentCarDetail);
                            _context.SaveChanges();
                        }
                    }

                    transaction.Commit();

                    return advertiseId;

                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return 0;
                }
            }
        }

        public async Task<bool> AddAdDocs(t_AdvertisesImage adImage)
        {
            try
            {
               
                _ = await _context.t_advertisesimage.AddAsync(adImage);
                _ = await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<bool> ClearAdDocs(long advertise_id)
        {
            try
            {
                var obj = await _context.t_advertisesimage.Where(z => z.advertise_id == advertise_id).ToListAsync();
                if (obj.Count > 0)
                {
                    foreach (var item in obj)
                    {
                        _context.t_advertisesimage.Remove(item);
                        _ = await _context.SaveChangesAsync();
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<bool> RemoveAd(AdImageListDto adImage)
        {
            try
            {
                if (adImage.images.Count == 0) // web tarafında kullanıcı bütün resimleri sildiyse buraya gir
                {
                    var objs = await _context.t_advertisesimage.Where(z => z.advertise_id == adImage.id).ToListAsync();
                    if (objs.Count > 0)
                    {
                        foreach (var item in objs)
                        {

                            _context.t_advertisesimage.Remove(item);
                            _ = await _context.SaveChangesAsync();
                        }
                    }

                    return true;
                }

                List<string> removingImages = new List<string>();
                var obj = await _context.t_advertisesimage.Where(z => z.advertise_id == adImage.id).ToListAsync();
                if (obj.Count > 0)
                {
                    foreach (var item in obj)
                    {
                        foreach (var image in adImage.images)
                        {
                            string dbImagePath = Path.GetFileName(item.images_link);
                            string webImagePath = Path.GetFileName(image.original);
                            if (dbImagePath != webImagePath)
                            {
                                removingImages.Add(webImagePath);
                                break;
                            }
                        }
                    }

                    for (int i = 0; i < removingImages.Count; i++)
                    {
                        var asd = _context.t_advertisesimage.Where(z => z.images_link.Contains(removingImages[i])).FirstOrDefault();
                        if (asd != null)
                        {
                            _context.t_advertisesimage.Remove(asd);
                            _ = await _context.SaveChangesAsync();
                        }
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<List<t_AdvertisesDetail>> GetAdvertiseDetailByAdvertseId(long advertiseId)
        {
            List<t_AdvertisesDetail> resultList = await _context.t_advertisesdetail.Where(x => x.advertise_id == advertiseId).ToListAsync();

            return resultList;
        }

        public async Task<List<t_AdvertisesImage>> GetAdvertiseImageByAdvertiseId(long advertiseId)
        {
            List<t_AdvertisesImage> resultList = await _context.t_advertisesimage.Where(x => x.advertise_id == advertiseId).ToListAsync();

            return resultList;
        }

        public async Task<t_Advertises> GetAdvertisesById(long advertiseId)
        {
            t_Advertises result = await _context.t_advertises.Where(x => x.id == advertiseId).FirstOrDefaultAsync();

            return result;
        }

        public async Task<List<AdvertisesDto>> GetLastAdvertises(long userId)
        {
            var result = await _context.t_advertises.Join(_context.t_brandsteo, u => u.brand_id, uir => uir.id, (u, uir) => new { u, uir }).
                Where(m => m.u.user_id != userId && m.u.status == "A" && m.u.advertise_end_date >= DateTime.Now).
                Select(m => new AdvertisesDto
                {
                    advertisesId = m.u.id,
                    brand = m.uir.brand,
                    model = m.uir.model,
                    registrationDate = m.u.created_dt,
                    expiredDate = m.u.advertise_end_date,
                    status = m.u.status
                }).ToListAsync();

            return result;
        }

        public async Task<List<AdvertisesDto>> GetWatingConfirm()
        {
            var result = await _context.t_advertises.Join(_context.t_brandsteo, u => u.brand_id, uir => uir.id, (u, uir) => new { u, uir }).
                Where(m => m.u.status == "O").
                Select(m => new AdvertisesDto
                {
                    advertisesId = m.u.id,
                    brand = m.uir.brand,
                    model = m.uir.model,
                    registrationDate = m.u.created_dt,
                    expiredDate = m.u.advertise_end_date,
                    status = m.u.status
                }).ToListAsync();

            return result;
        }


        public async Task<List<AdvertisesDto>> GetAdvertisesByUserId(long UserId)
        {

            var result = await _context.t_advertises.Join(_context.t_brandsteo, u => u.brand_id, uir => uir.id, (u, uir) => new { u, uir }).
                Where(m => m.u.user_id == UserId).
                Select(m => new AdvertisesDto
                {
                    userId = m.u.user_id,
                    advertisesId = m.u.id,
                    brand = m.uir.brand,
                    model = m.uir.model,
                    registrationDate = m.u.created_dt,
                    expiredDate = m.u.advertise_end_date,
                    status = m.u.status
                }).ToListAsync();
            
            return result;
        }
        public async Task<List<t_AdvertisesRentCarDetail>> GetDifferentCarChoiceByAdvertiseId(long advertiseId)
        {
            List<t_AdvertisesRentCarDetail> resultList = await _context.t_advertisesrentcardetail.Where(d => d.advertise_id == advertiseId).ToListAsync();

            return resultList;
        }

        public async Task<bool> UpdateAdvertise(t_Advertises advertise)
        {
            try
            {
                t_Advertises obj = await _context.t_advertises.Where(d => d.id == advertise.id).FirstOrDefaultAsync();
                if (obj != null)
                {
                    obj.advertise_start_date = advertise.advertise_start_date;
                    obj.advertise_end_date = advertise.advertise_end_date;
                    obj.status = advertise.status;
                    _ = await _context.SaveChangesAsync();

                    return true;
                }
                return false;

            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<t_Plaques> ChkPlaques(string code)
        {
            var result = await _context.t_plaques.FindAsync(code);
            
            return result;
        }

        public async Task<List<t_Advertises>> ChkAllPlaques(string code)
        {
            List < t_Advertises > result = await _context.t_advertises.Where(x => x.plaque == code && x.status != "I" && DateTime.Now < x.advertise_start_date.AddDays(30)).ToListAsync();

            return result;
        }

       
    }
}
