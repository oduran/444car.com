using _444Car.InternalModels;
using _444Car.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface IAdvertiseRepository
    {
        //Task<long> AddAdvertise(t_Advertises advertiseListObj, t_AdvertisesDetail detailObj, t_AdvertisesImage imageObj);
        Task<long> AddAdvertise(t_Advertises advertisesObj, List<t_AdvertisesDetail> detailList);
        Task<long> AddAdvertiseNew(t_Advertises advertisesObj, List<t_AdvertisesDetail> detailList, List<t_AdvertisesRentCarDetail> detailRentCarList);
        Task<List<AdvertisesDto>> GetAdvertisesByUserId(long UserId);
        Task<t_Advertises> GetAdvertisesById(long advertiseId);
        Task<List<AdvertisesDto>> GetLastAdvertises(long userId);
        Task<bool> RemoveAd(AdImageListDto images);
        Task<bool> UpdateAdvertise(t_Advertises advertise);
        Task<List<t_AdvertisesDetail>> GetAdvertiseDetailByAdvertseId(long advertiseId);
        Task<List<t_AdvertisesImage>> GetAdvertiseImageByAdvertiseId(long advertiseId);
        Task<bool> AddAdDocs(t_AdvertisesImage adImage);
        Task<bool> ClearAdDocs(long adImageId);
        Task<List<t_AdvertisesRentCarDetail>> GetDifferentCarChoiceByAdvertiseId(long advertiseId);

        Task<t_Plaques> ChkPlaques(string code);
        Task<List<t_Advertises>> ChkAllPlaques(string code);
        Task<List<AdvertisesDto>> GetWatingConfirm();
    }
}
