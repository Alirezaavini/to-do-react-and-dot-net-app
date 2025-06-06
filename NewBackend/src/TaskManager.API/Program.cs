using Microsoft.EntityFrameworkCore;
using TaskManager.Application.Interfaces;
using TaskManager.Application.Services;
using TaskManager.Domain.Interfaces;
using TaskManager.Infrastructure.Repositories;
using ToDoApp.Infrastructure.Persistence;

namespace TaskManager.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();


            // Register AppDbContext with SQL Server
            builder.Services.AddDbContext<ToDoDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
                 sqlOptions => sqlOptions.MigrationsAssembly("TaskManager.Infrastructure")
                ));


            // 2. Register repositories & services
            builder.Services.AddScoped<IToDoRepository, ToDoRepository>();
            builder.Services.AddScoped<IToDoService, ToDoService>();

            var cors_origins = new string[]
                               {
                          "http://localhost:3000",
                          "http://localhost:5173"
                               };
            builder.Services.AddCors(o => o.AddPolicy("react", builder =>
            {
                builder.WithOrigins(cors_origins)
                    .SetIsOriginAllowedToAllowWildcardSubdomains()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .AllowAnyHeader();
            }));

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("react");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
