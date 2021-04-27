using _444Car.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface IFaqRepository
    {
        Task<List<t_Faq>> GetFaqByType(int type, int language);
        Task<List<t_Faq>> GetAllFaqByLanguage(int language);
        Task<List<t_Faq>> GetAllFaqs();
        Task<t_Faq> RemoveFaq(t_Faq faqObj);
        Task<t_Faq> AddFaq(t_Faq faqListObj);
        Task<t_Faq> UpdateFaq(t_Faq faqObj);
    }
}
