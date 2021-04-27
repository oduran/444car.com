using _444Car.InternalModels;
using _444Car.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface IBrandRepository
    {
        Task<List<t_BrandsTeo>> GetBrandById(long brandId);
        Task<List<string>> GetAllBrands();
        Task<List<t_BrandsTeo>> GetBrandByName(string brandName);
        //Task<t_Brands> AddBrand(t_Brands brandObj);
        //Task<t_Brands> UpdateBrandById(t_Brands brandObj);
        Task<List<string>> GetRegistiretionMonth(string distinctbrandName);
        Task<List<int>> GetRegistiretionYear(string distinctbrandName, string registrationMonth);
        Task<List<string>> GetModels(string distinctbrandName, string registrationMonth, int registrationYear);
        Task<List<string>> GetFuelType(string distinctbrandName, string registrationMonth, int registrationYear, string model);
        Task<List<string>> GetPs(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType);
        Task<List<string>> GetVehicleModelType(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps);
        Task<List<string>> GetVehicleBodyType(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType);
        Task<List<string>> GetProductionPeriod(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType, string bodyType);
        Task<List<string>> GetNumberOfDors(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType, string bodyType, string productionPeriod);
        Task<List<string>> GetGear(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType, string bodyType, string productionPeriod, string numberOfDors);
        Task<List<string>> GetEgineCapacity(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType, string bodyType, string productionPeriod, string numberOfDors, string gear);
        Task<List<string>> GetEmission(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType, string bodyType, string productionPeriod, string numberOfDors, string gear, string engineCapacity);
        Task<long> GetBrandId(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType, string bodyType, string productionPeriod, string numberOfDors, string gear, string engineCapacity, string Emission);

        Task<List<string>> GetDiffrentRentCarFuelType(string brandName, string serial, string bodyType);
        Task<List<string>> GetDiffrentRentCarBodyType(string brandName, string serial);
        Task<List<string>> GetDiffrentRentCarSerial(string brandName);

    }
}
