using _444Car.Interface;
using _444Car.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Repository
{
    public class FaqRepository : IFaqRepository
    {
        private readonly AppDbContext _context;

        public FaqRepository(AppDbContext context)
        {
            this._context = context;
        }

        public async Task<t_Faq> AddFaq(t_Faq faqListObj)
        {
            faqListObj.status = "A";
            
            var result = await _context.t_faq.AddAsync(faqListObj);
            await _context.SaveChangesAsync();

            return result.Entity;
        }



        public async Task<List<t_Faq>> GetAllFaqByLanguage(int language)
        {
            var result = await _context.t_faq.Where(d => d.country_id == language ).ToListAsync();

            return result;
            
        }

        public async Task<List<t_Faq>> GetAllFaqs()
        {
            var result = await _context.t_faq.ToListAsync();

            return result;

        }



        public async Task<List<t_Faq>> GetFaqByType(int type, int language)
        {
            var result = await _context.t_faq.Where(d => d.type == type && d.country_id == language && d.status == "A").ToListAsync();

            return result;
        }

        public async Task<t_Faq> UpdateFaq(t_Faq faqObj)
        {
            t_Faq result = await _context.t_faq.Where(s => s.id == faqObj.id ).FirstOrDefaultAsync();

            result.question = faqObj.question;
            result.answer = faqObj.answer;
            result.country_id = faqObj.country_id;
            result.status = faqObj.status;
            result.type = faqObj.type;

            await _context.SaveChangesAsync();

            return result;
        }

        public async Task<t_Faq> RemoveFaq(t_Faq faqObj)
        {
            t_Faq result = await _context.t_faq.Where(s => s.id == faqObj.id).FirstOrDefaultAsync();
            result.status = "P";
            await _context.SaveChangesAsync();
            return result;
        }
    }
}
