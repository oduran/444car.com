using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.InternalModels
{
    public class OtpDto
    {
        public string user { get; set; }
        public string password { get; set; }
        public string countryCode { get; set; }
        public string originator { get; set; }
        public string reference { get; set; }
        public string startdate { get; set; }
        public string expiredate { get; set; }
        public string exclusionstarttime { get; set; }
        public string exclusionexpiretime { get; set; }
        public string broadcastmessage { get; set; }
        public string channel { get; set; }
        public string blacklistfilter { get; set; }
        public string iysfilter { get; set; }
        public string iyscode { get; set; }
        public string brandcode { get; set; }
        public string retailercode { get; set; }
        public string recipienttype { get; set; }
        public List<SmsInfo> smsmessages { get; set; }
        public OtpDto()
        {
            this.user = "merdol";
            this.password = "1234qqqQ!";
            this.originator = "5552799798";
            this.reference = "";
            this.startdate = "";
            this.expiredate = "";
            this.exclusionstarttime = "";
            this.exclusionexpiretime = "";
            this.broadcastmessage = "";
            this.channel = "YD";
            this.blacklistfilter = "0";
            this.iysfilter = "0";
            this.iyscode = "";
            this.brandcode = "";
            this.retailercode = "";
            this.recipienttype = "";
            this.smsmessages = new List<SmsInfo>();
        }
    }
   
}
