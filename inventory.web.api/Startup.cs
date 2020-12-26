using inventory.service.Account;
using inventory.service.Data;
using inventory.service.Sales;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IO.Compression;
using System.Text;

namespace inventory.api
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }
        //private readonly string _webRootPath = "";
        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                 .SetBasePath(env.ContentRootPath)
                 .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                 .AddEnvironmentVariables();
            Configuration = builder.Build();

            //_webRootPath = env.WebRootPath;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore().AddNewtonsoftJson(); // configure api for Json Array Of Obj response (Requires: Microsoft.AspNetCore.Mvc.NewtonsoftJson)

            var allowOrigin = Configuration.GetSection("AllowOrigin").Get<List<string>>(); // configure Chors for endpoint
            services.AddCors(options =>
            {
                options.AddPolicy(name: "AllowOrigin",
                    builder =>
                    {
                        builder.WithOrigins(allowOrigin.ToArray())
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                    });
            });

            services.AddControllers();

            //string domain = $"https://{Configuration["Auth0:Domain"]}/";
            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //})
            //.AddJwtBearer(options =>
            //{
            //    options.Authority = domain;
            //    //options.ClaimsIssuer = Configuration["Jwt:Issuer"];
            //    options.Audience = Configuration["Auth0:Audience"];
            //    options.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuer = true,
            //        ValidateAudience = true,
            //        ValidateLifetime = true,
            //        ValidateIssuerSigningKey = true,
            //        ValidIssuer = Configuration["Jwt:Issuer"],
            //        ValidAudience = Configuration["Jwt:Issuer"],
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
            //    };
            //});

            //services.Configure<GzipCompressionProviderOptions>(options =>
            //{
            //    options.Level = CompressionLevel.Fastest;
            //});

            //services.AddResponseCompression(options =>
            //{
            //    options.EnableForHttps = true;
            //    options.Providers.Add<GzipCompressionProvider>();
            //    options.Providers.Add<BrotliCompressionProvider>();
            //    options.MimeTypes = new[]
            //    {
            //        // Default
            //        "text/plain",
            //        "text/css",
            //        "application/javascript",
            //        "text/html",
            //        "application/xml",
            //        "text/xml",
            //        "application/json",
            //        "text/json",
            //        // Custom
            //        "image/svg",
            //        "image/jpeg",
            //        "image/png",
            //        "text/html",
            //        "video/mp4"
            //    };
            //});

            //services.AddMemoryCache();

            //services.AddDbContext<AppContext>(options =>
            //          options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            ////Register dapper in scope    
            //services.AddScoped<IDapper, Dapper>();

            services.AddScoped<IDataService, DataService>()
                .AddTransient<IAccountService, AccountService>();
            //.AddTransient<ISalesService, SalesService>();

            services.AddSingleton<IConfiguration>(Configuration);

            //services.AddSession(options =>
            //{
            //    options.Cookie.Name = Configuration.GetSection("Cookie:Name").Get<string>();
            //    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            //    options.Cookie.HttpOnly = true;
            //    options.IdleTimeout = TimeSpan.FromMinutes(Configuration.GetSection("Cookie:IdleTimeout").Get<int>());
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Must be before UseStaticFiles to compress static files and UseMvc to compress MVC responses
            //app.UseResponseCompression();

            //app.UseDefaultFiles();

            //app.UseStaticFiles();

            //app.UseFileServer(); // set wwwroot/index.html as startup file

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                //app.UseExceptionHandler( // custom exception handle stack trace
                //options =>
                //{
                //    options.Run(
                //        async context =>
                //        {
                //            context.Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
                //            context.Response.ContentType = "text/html";
                //            var exceptionObject = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();
                //            if (null != exceptionObject)
                //            {
                //                var errorMessage = $"<b>Error: {exceptionObject.Error.Message}</b>{exceptionObject.Error.StackTrace}";
                //                await context.Response.WriteAsync(errorMessage).ConfigureAwait(false);
                //            }
                //        });
                //});
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("AllowOrigin");  // setup Chors for endpoint

            //app.UseAuthentication();

            //app.UseSession();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers().RequireCors("AllowOrigin");
            });
        }
    }
}
