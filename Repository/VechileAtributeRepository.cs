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
    public class VechileAtributeRepository : IVechileAtributeRepository
    {
        private readonly AppDbContext _context;

        public VechileAtributeRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<List<object>> GetAtributesGroup()
        {
            var attributeList = await _context.t_vehicleatributes.Where(x => x.country_id == 2 && x.status == "A").ToListAsync();
            var result = attributeList.Select(y => y.description).Distinct().ToList();
            List<object> _list = GetAtributesGroupList(result, attributeList);
            return _list;
        }

        public async Task<List<object>> GetAtributesGroup(int CountryId)
        {
            var attributeList = await _context.t_vehicleatributes.Where(x => x.country_id == CountryId && x.status == "A").ToListAsync();
            var result = attributeList.Select(y => y.description).Distinct().ToList();
            List<object> _list = GetAtributesGroupList(result, attributeList);
            return _list;
        }
        private List<object> GetAtributesGroupList(List<string> result, List<t_VehicleAtributes> attributeList)
        {
            List<object> _list = new List<object>();

            foreach (var item in result)
            {
                dynamic foo = new System.Dynamic.ExpandoObject();
                foo.DisplayName = item;
                List<t_VehicleAtributes> list = new List<t_VehicleAtributes>();
                foreach (var subItem in attributeList)
                {
                    if (item == subItem.description)
                    {
                        list.Add(subItem);
                    }
                }
                foo.SubItems = list;
                _list.Add(foo);
            }
            return _list;
        }

        public async Task<List<t_VehicleAtributes>> GetAtributesGroupByName(int CountryId, string GroupName)
        {
            var result = await _context.t_vehicleatributes.Where(x => x.country_id == CountryId && x.status == "A" && x.description == GroupName).ToListAsync();
            return result;
        }


    }
}
