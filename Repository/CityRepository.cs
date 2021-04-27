using _444Car.Interface;
using _444Car.InternalModels;
using _444Car.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace _444Car.Repository
{
    public class CityRepository : ICityRepository
    {
        private readonly AppDbContext _context;

        public CityRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<List<t_Cities>> GetCities()
        {
            //List<t_Cities> result = await _context.t_cities.ToListAsync();
            List<t_Cities> result = await _context.t_cities.Where(x => x.country_id == 2 && x.status == "A").ToListAsync();
            return result;
        }

        public async Task<List<t_Cities>> GetCities(int countryId)
        {
            if (countryId == 0)
                countryId = 2;

            List<t_Cities> result = await _context.t_cities.Where(x => x.country_id == countryId && x.status == "A").ToListAsync();

            return result;
        }
    }
}
