using _444Car.AuthServices;
using _444Car.Interface;
using _444Car.Models;
using _444Car.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.HttpOverrides;
using _444Car.InternalModels;

namespace _444Car
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContextPool<AppDbContext>(
                options => options.UseMySql(Configuration.GetConnectionString("DefaultConnection")
             ));

            //services.AddTransient<Func<AppDbContext>>((provider) => new Func<AppDbContext>(() => new DbContext()));
            services.Configure<TokenOption>(Configuration.GetSection("TokenOption"));
            services.Configure<OtpDto>(Configuration.GetSection("OtpOption"));
            services.AddScoped<IJWTTokenService, JWTTokenService>();
            var token = Configuration.GetSection("TokenOption").Get<TokenOption>();

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                //token microsoft identity model tokenı üretmek için konulmuştur.
                var keyByteArray = Encoding.ASCII.GetBytes(token.Secret);
                var signingKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(keyByteArray);
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = signingKey,
                    ValidIssuer = token.Issuer,
                    ValidAudience = token.Audience,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromMinutes(0)
                };
                x.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies["444Car"];
                        return Task.CompletedTask;
                    }
                };
            });
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IFaqRepository, FaqRepository>();
            services.AddScoped<IForgotPasswordRepository, ForgotPasswordRepository>();
            services.AddScoped<IJWTTokenService, JWTTokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ISendEmailRepository, SendEmailRepository>();
            services.AddScoped<IBrandRepository, BrandRepository>();
            services.AddScoped<IAdvertiseRepository, AdvertiseRepository>();
            services.AddScoped<ICityRepository, CityRepository>();
            services.AddScoped<IBussinesRepository, BussinesRepository>();
            services.AddScoped<IVechileAtributeRepository, VechileAtributeRepository>();
            services.AddScoped<ILogRepository, LogRepository>();
            services.AddScoped<IOfferRepository, OfferRepository>();
            services.AddScoped<IOfferAtributeRepository, OfferAtributeRepository>();
            services.AddScoped<IPaymentRepository, PaymentRepository>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddControllers();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
           //linux için eklendi 
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.Options.StartupTimeout = TimeSpan.FromSeconds(120);
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

        }
    }
}
