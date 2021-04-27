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
    public class OfferAtributeRepository : IOfferAtributeRepository
    {
        private readonly AppDbContext _context;

        public OfferAtributeRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<List<object>> GetOfferAtributesGroup()
        {
            var attributeList = await _context.t_offeratributes.Where(x => x.country_id == 2 && x.status == "A").ToListAsync();
            var result = attributeList.Select(y => y.description).Distinct().ToList();
            
            List<object> _list = GetOfferAtributesGroupList(result, attributeList);
            return _list;
        }

        public async Task<List<object>> GetOfferAtributesGroup(int CountryId)
        {
            var attributeList = await _context.t_offeratributes.Where(x => x.country_id == CountryId && x.status == "A").ToListAsync();
            var result = attributeList.Select(y => y.description).Distinct().ToList();
            List<object> _list = GetOfferAtributesGroupList(result, attributeList);
            return _list;
        }
        private List<object> GetOfferAtributesGroupList(List<string> result, List<t_OfferAtributes> attributeList)
        {
            List<object> _list = new List<object>();

            foreach (var item in result)
            {
                dynamic foo = new System.Dynamic.ExpandoObject();
                foo.DisplayName = item;
                List<t_OfferAtributes> list = new List<t_OfferAtributes>();
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

        public async Task<List<t_OfferAtributes>> GetOfferAtributesGroupByName(int CountryId, string GroupName)
        {
            var result = await _context.t_offeratributes.Where(x => x.country_id == CountryId && x.status == "A" && x.description == GroupName).ToListAsync();
            return result;
        }


    }
}
