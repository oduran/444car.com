using _444Car.Interface;
using _444Car.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Repository
{
    public class BrandRepository : IBrandRepository
    {
        private readonly AppDbContext _context;

        public BrandRepository(AppDbContext context)
        {
            this._context = context;
        }


        public async Task<t_Brands> AddBrand(t_Brands brandObj)
        {
            brandObj.status = "A";
            
            var result = await _context.t_brands.AddAsync(brandObj);
            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<List<string>> GetAllBrands()
        {
            var result = await _context.t_brandsteo.OrderBy(x => x.brand).Where(d => d.status == "A").Select(c=>c.brand).Distinct().ToListAsync();

            return result;
        }

        public async Task<List<t_BrandsTeo>> GetBrandById(long brandId)
        {
            var result = await _context.t_brandsteo.Where(d => d.id == brandId && d.status == "A").ToListAsync();

            return result;
        }

        public async Task<List<t_BrandsTeo>> GetBrandByName(string brandName)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == brandName && d.status == "A").ToListAsync();

            return result;
        }

        public async Task<List<string>> GetRegistiretionMonth(string distinctbrandName)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == distinctbrandName && d.status == "A").Select(c => c.registration_month).Distinct().ToListAsync();

            return result;
        }


        public async Task<List<int>> GetRegistiretionYear(string distinctbrandName, string registrationMonth)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == distinctbrandName && d.registration_month == registrationMonth && d.status == "A").Select(c => c.registration_year).Distinct().ToListAsync();

            return result;
        }

        public async Task<List<string>> GetModels(string distinctbrandName, string registrationMonth, int registrationYear)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == distinctbrandName && d.registration_month == registrationMonth 
            && d.registration_year == registrationYear && d.status == "A").Select(c => c.model).Distinct().ToListAsync();

            return result;
        }
        public async Task<List<string>> GetFuelType(string distinctbrandName, string registrationMonth, int registrationYear, string model)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == distinctbrandName && d.registration_month == registrationMonth
            && d.registration_year == registrationYear && d.model == model && d.status == "A").Select(c => c.fuel_type).Distinct().ToListAsync();

            return result;
        }

        public async Task<List<string>> GetPs(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == distinctbrandName && d.registration_month == registrationMonth
            && d.registration_year == registrationYear && d.model == model && d.fuel_type == fuelType && d.status == "A").Select(c => c.ps).Distinct().ToListAsync();

            return result;
        }

        public async Task<List<string>> GetVehicleModelType(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == distinctbrandName && d.registration_month == registrationMonth
            && d.registration_year == registrationYear && d.model == model && d.fuel_type == fuelType && d.ps == ps && d.status == "A").Select(c => c.model_type).Distinct().ToListAsync();

            return result;
        }
        public async Task<List<string>> GetVehicleBodyType(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == distinctbrandName && d.registration_month == registrationMonth
            && d.registration_year == registrationYear && d.model == model && d.fuel_type == fuelType && d.ps == ps && d.model_type == modelType && d.status == "A").Select(c => c.vehicle_body_type).Distinct().ToListAsync();

            return result;
        }
        public async Task<List<string>> GetProductionPeriod(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType, string bodyType)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == distinctbrandName && d.registration_month == registrationMonth
            && d.registration_year == registrationYear && d.model == model && d.fuel_type == fuelType && d.ps == ps && d.model_type == modelType 
            && d.vehicle_body_type == bodyType && d.status == "A").Select(c => c.production_period).Distinct().ToListAsync();

            return result;
        }

        public async Task<List<string>> GetNumberOfDors(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType, string bodyType, string productionPeriod)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == distinctbrandName && d.registration_month == registrationMonth
            && d.registration_year == registrationYear && d.model == model && d.fuel_type == fuelType && d.ps == ps && d.model_type == modelType
            && d.vehicle_body_type == bodyType && d.production_period == productionPeriod && d.status == "A").Select(c => c.number_of_dors).Distinct().ToListAsync();

            return result;
        }

        public async Task<List<string>> GetGear(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType, string bodyType, string productionPeriod, string numberOfDors)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == distinctbrandName && d.registration_month == registrationMonth
            && d.registration_year == registrationYear && d.model == model && d.fuel_type == fuelType && d.ps == ps && d.model_type == modelType
            && d.vehicle_body_type == bodyType && d.production_period == productionPeriod && d.number_of_dors == numberOfDors && d.status == "A").Select(c => c.gear).Distinct().ToListAsync();

            return result;
        }

        public async Task<List<string>> GetEgineCapacity(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType, string bodyType, string productionPeriod, string numberOfDors, string gear)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == distinctbrandName && d.registration_month == registrationMonth
            && d.registration_year == registrationYear && d.model == model && d.fuel_type == fuelType && d.ps == ps && d.model_type == modelType
            && d.vehicle_body_type == bodyType && d.production_period == productionPeriod && d.number_of_dors == numberOfDors 
            && d.gear == gear && d.status == "A").Select(c => c.engine_capacity).Distinct().ToListAsync();

            return result;
        }

        public async Task<List<string>> GetEmission(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType, string bodyType, string productionPeriod, string numberOfDors, string gear, string engineCapacity)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == distinctbrandName && d.registration_month == registrationMonth
            && d.registration_year == registrationYear && d.model == model && d.fuel_type == fuelType && d.ps == ps && d.model_type == modelType
            && d.vehicle_body_type == bodyType && d.production_period == productionPeriod && d.number_of_dors == numberOfDors
            && d.gear == gear && d.engine_capacity == engineCapacity && d.status == "A").Select(c => c.emission).Distinct().ToListAsync();

            return result;
        }

        public async Task<long> GetBrandId(string distinctbrandName, string registrationMonth, int registrationYear, string model, string fuelType, string ps, string modelType, string bodyType, string productionPeriod, string numberOfDors, string gear, string engineCapacity, string emission)
        {
            try
            {
                var result = await _context.t_brandsteo.Where(d => d.brand == distinctbrandName && d.registration_month == registrationMonth
           && d.registration_year == registrationYear && d.model == model && d.fuel_type == fuelType && d.ps == ps && d.model_type == modelType
           && d.vehicle_body_type == bodyType && d.production_period == productionPeriod && d.number_of_dors == numberOfDors
           && d.gear == gear && d.engine_capacity == engineCapacity && d.emission == emission && d.status == "A").Select(x => x.id).FirstOrDefaultAsync();

                
                return result;
            }
            catch (Exception e)
            {

                throw;
            }
        }

        public async Task<List<string>> GetDiffrentRentCarFuelType(string brandName, string serial, string bodyType)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == brandName && d.serial == serial
            && d.vehicle_body_type == bodyType).Select(c => c.fuel_type).Distinct().ToListAsync();

            return result;
        }

        public async Task<List<string>> GetDiffrentRentCarBodyType(string brandName, string serial)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == brandName && d.serial == serial).Select(c => c.vehicle_body_type).Distinct().ToListAsync();

            return result;
        }

        public async Task<List<string>> GetDiffrentRentCarSerial(string brandName)
        {
            var result = await _context.t_brandsteo.Where(d => d.brand == brandName).Select(c => c.serial).Distinct().ToListAsync();

            return result;
        }


    }
}
