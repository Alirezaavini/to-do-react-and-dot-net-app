using Microsoft.EntityFrameworkCore;
using TaskManager.Domain.Entities;


namespace ToDoApp.Infrastructure.Persistence
{
    public class ToDoDbContext : DbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options)
            : base(options)
        {
        }

        public DbSet<ToDoItem> ToDoItems { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // If you want custom table names or constraints:
            modelBuilder.Entity<ToDoItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title)
                      .IsRequired()
                      .HasMaxLength(200);

                entity.Property(e => e.Description)
                      .HasMaxLength(1000);

                entity.Property(e => e.CreatedAt)
                      .IsRequired();
            });
        }
    }
}