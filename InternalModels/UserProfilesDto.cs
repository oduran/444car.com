using _444Car.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.InternalModels
{
    public class UserProfilesDto
    {
        public long userid { get; set; }
        public int logintype { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string email { get; set; } // yeni eklendi
        public string mobile { get; set; }
        public string companytitle { get; set; }
        public string address { get; set; }
        public string telephone { get; set; }
        public string fax { get; set; }
        public string url { get; set; }
        public string country { get; set; }
        public string city { get; set; }
        public string subcity { get; set; }
        public string location { get; set; }
        public string postcode { get; set; }
        public string taxadmin { get; set; }
        public string taxidentification { get; set; }
        public string taxid { get; set; }
        public string kdvno { get; set; }
        public string description { get; set; }
        public DateTime created_dt { get; set; }
        public string modified_by { get; set; }
        public List<t_UserDocuments> userDocs { get; set; }
        public DateTime modified_dt { get; set; }
        public UserProfilesDto()
        {
            this.name = "";
            this.surname = "";
            this.email = "";
            this.mobile = "";
            this.companytitle = "";
            this.address = "";
            this.postcode = "";
            this.telephone = "";
            this.taxadmin = "";
            this.taxidentification = "";
            this.taxid = "";
            this.kdvno = "";
            this.city = "";
            this.subcity = "";
            this.location = "";
            this.description = "";
            this.fax = "";
            this.country = "";
            this.url = "";
            this.modified_by = "";
            this.created_dt = DateTime.Now;
        }

    }
}
