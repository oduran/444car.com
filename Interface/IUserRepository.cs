using _444Car.InternalModels;
using _444Car.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Interface
{
    public interface IUserRepository
    {
        Task<t_Users> GetUserById(long id);
        Task<t_Users> GetUserByMail(string mail);
        Task<List<t_Users>> GetUserByRole(int Roleid);
        Task<int> UpdateUserProfileById(UserProfilesDto userProfilesObj, List<t_UserDocuments> docObj, t_Users user);
        Task<t_UserProfiles> GetUserProfileById(long id);
        Task<int> UpdateUserPassErrById(int id);
        Task<int> UpdateUserStatusById(long id, string status, string modifiedby);
        Task<int> updatePassword(t_Users onjectUser);
        Task<int> SetUserPassword(long userId, string password);
        Task<bool> AddUserDocs(t_UserDocuments userDoc);
        Task<bool> DeleteUserDoc(t_UserDocuments userDoc);
        Task<List<t_UserDocuments>> GetUserDocs(long userId);
        Task<List<object>> GetUserProfiles();
        Task<string> AddForgotPassword(long userId, Guid guid);
        Task UpdateUserProfileById(JObject userProfileObj, List<t_UserDocuments> docList, t_Users user);
    }
}
