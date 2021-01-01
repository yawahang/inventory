using inventory.model;
using inventory.service.Account;
using inventory.service.Core;
using inventory.service.Dashboard;
using inventory.service.Data;
using inventory.service.Product;
using inventory.service.Report;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace inventory.webapi
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }
        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                 .SetBasePath(env.ContentRootPath)
                 .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                 .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvcCore().AddNewtonsoftJson(options =>
            {
                options.UseCamelCasing(true);
            });

            var allowOrigin = Configuration.GetSection("AllowOrigin").Get<List<string>>(); // configure Chors for endpoint
            services.AddCors(options =>
                {
                    options.AddPolicy(name: "AllowOrigin",
                        builder =>
                        {
                            builder.WithOrigins(allowOrigin.ToArray())
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                           .AllowCredentials();
                        });
                });

            services.AddControllers();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.Authority = Configuration["Auth0:Domain"];
                options.ClaimsIssuer = Configuration["Jwt:Issuer"];
                options.Audience = Configuration["Auth0:Audience"];
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["ApiKey"]))
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        context.Response.OnStarting(async () =>
                        {
                            context.NoResult();
                            context.Response.Headers.Add("Token-Expired", "true");
                            context.Response.ContentType = "text/plain";
                            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                            await context.Response.WriteAsync(context.Exception.Message);
                        });

                        return Task.CompletedTask;
                    },
                    OnTokenValidated = async context =>
                    {
                        MvUser user = JsonConvert.DeserializeObject<MvUser>(context.Principal.FindFirstValue("User"));
                        var db = await Task.FromResult(context.HttpContext.RequestServices.GetRequiredService<IDataService>());
                        db.CurrentUserId = user.UserId;
                        db.Role = user.Role;
                    }
                };
            });

            services.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Fastest;
            });

            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.Providers.Add<GzipCompressionProvider>();
                options.Providers.Add<BrotliCompressionProvider>();
                options.MimeTypes = new[]
                {
                    // Default
                    "text/plain",
                    "text/css",
                    "application/javascript",
                    "text/html",
                    "application/xml",
                    "text/xml",
                    "application/json",
                    "text/json",
                    // Custom
                    "image/svg",
                    "image/jpeg",
                    "image/png",
                    "text/html",
                    "video/mp4"
                };
            });

            services.AddMemoryCache();

            services.AddTransient<IAccountService, AccountService>()
                .AddTransient<IProductService, ProductService>()
                .AddTransient<IDashboardService, DashboardService>()
                .AddTransient<IReportService, ReportService>()
                .AddTransient<ICoreService, CoreService>()
                .AddScoped<IDataService, DataService>()
                .AddSingleton(Configuration)
                .AddHttpContextAccessor();

            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.Cookie.Name = Configuration.GetSection("Cookie:Name").Get<string>();
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.IdleTimeout = TimeSpan.FromMinutes(Configuration.GetSection("Cookie:IdleMinutes").Get<int>());
                options.Cookie.HttpOnly = true;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Must be before UseStaticFiles to compress static files and UseMvc to compress MVC responses
            app.UseResponseCompression();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseFileServer(); // set wwwroot/index.html as startup file

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseExceptionHandler( // custom exception handle stack trace
                options =>
                {
                    options.Run(
                        async context =>
                        {
                            context.Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
                            context.Response.ContentType = "text/html";
                            var exceptionObject = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();
                            if (null != exceptionObject)
                            {
                                var errorMessage = $"<b>Error: {exceptionObject.Error.Message}</b>{exceptionObject.Error.StackTrace}";
                                await context.Response.WriteAsync(errorMessage).ConfigureAwait(false);
                            }
                        });
                });
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("AllowOrigin");

            app.UseAuthentication();

            app.UseSession();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers().RequireCors("AllowOrigin");
            });
        }
    }
}
