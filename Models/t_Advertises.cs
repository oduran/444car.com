using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace _444Car.Models
{
    public class t_Advertises
    {
        [Key]
        public long id { get; set; }
        [Required]
        public long user_id { get; set; }
        [Required]
        public decimal sale_price { get; set; }
        public int rental_period { get; set; }
        public long usage { get; set; }
        public long state_id { get; set; }
        public string city { get; set; }
        public string location { get; set; }
        public string posta_code { get; set; }
        public string posta_description { get; set; }
        public string plaque { get; set; }
        public string chassis { get; set; }
        public long brand_id { get; set; }
        public int production_month_id { get; set; }
        public int production_year_id { get; set; }
        public long model_id { get; set; }
        public long fueltype_id { get; set; }
        public string ps { get; set; }
        public long model_type_id { get; set; }
        public long vehicle_body_type_id { get; set; }
        public long vehicle_production_period_id { get; set; }
        public int number_of_vehicle_owners { get; set; }
        public int checkbook { get; set; }
        public int non_smoking { get; set; }
        public string kilometer { get; set; }
        public int color_id { get; set; }
        public int metalic_color { get; set; }
        public int number_of_doors { get; set; }
        public int gear { get; set; }
        public int engine_capacity_id { get; set; }
        public int emission_id { get; set; }
        public string description { get; set; }
        public DateTime created_dt { get; set; }
        public string created_by { get; set; }
        public DateTime modified_dt { get; set; }
        public string modified_by { get; set; }
        public string status { get; set; }
        public DateTime advertise_start_date { get; set; }
        public DateTime advertise_end_date { get; set; }
        public int diffrent_car_choose { get; set; }
        public int warranty { get; set; }
        public int extended_warranty { get; set; }
    }
}