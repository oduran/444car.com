using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _444Car.Models
{
    public class AppDbContext : DbContext
    {
       

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<t_Advertises> t_advertises { get; set; }
        public DbSet<t_AdvertisesDetail> t_sdvertisesdetail { get; set; }
        public DbSet<t_Brands> t_brands { get; set; }
        public DbSet<t_BrandsTeo> t_brandsteo { get; set; }
        public DbSet<t_Cities> t_cities { get; set; }
        public DbSet<t_Colors> t_colors { get; set; }
        public DbSet<t_Countries> t_countries { get; set; }
        public DbSet<t_EnginesCapacity> t_enginescapacity { get; set; }
        public DbSet<t_Faq> t_faq { get; set; }
        public DbSet<t_ForgotPasswords> t_forgotpasswords { get; set; }
        public DbSet<t_FuelTypes> t_fueltypes { get; set; }
        public DbSet<t_SendEmails> t_sendemails { get; set; }
        public DbSet<t_UserProfiles> t_userprofiles { get; set; }
        public DbSet<t_Users> t_Users { get; set; }
        public DbSet<t_VehicleAtributes> t_vehicleatributes { get; set; }
        public DbSet<t_VehiclesBodyType> t_vehiclesbodytype { get; set; }
        public DbSet<t_AdvertisesImage> t_advertisesimage { get; set; }
        public DbSet<t_AdvertisesDetail> t_advertisesdetail { get; set; }
        public DbSet<t_VehiclesProduction> t_vehiclesproduction { get; set; }
        public DbSet<t_Types> t_types { get; set; }
        public DbSet<t_UsersLog> t_userslog { get; set; }
        public DbSet<t_UserDocuments> t_userdocuments { get; set; }
        public DbSet<t_DocumentsType> t_documentstype { get; set; }
        public DbSet<t_AdvertisesRentCarDetail> t_advertisesrentcardetail { get; set; }
        public DbSet<t_Plaques> t_plaques { get; set; }
        public DbSet<t_Offers> t_offers { get; set; }
        public DbSet<t_OffersDetail> t_offersdetail { get; set; }
        public DbSet<t_OfferAtributes> t_offeratributes { get; set; }
        public DbSet<t_Payments> t_payments { get; set; }


    }
}
