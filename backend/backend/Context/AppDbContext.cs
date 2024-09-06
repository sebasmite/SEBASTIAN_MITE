using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }
        public DbSet<FormsList> FormsLists { get; set; }
        public DbSet<Mascota> Mascota { get; set; }
        public DbSet<MascotaFields> MascotaFields { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<PersonFields> PersonFields { get; set; }
    }
}
