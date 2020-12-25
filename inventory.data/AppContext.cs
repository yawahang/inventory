using Microsoft.EntityFrameworkCore;

namespace inventory.data
{
    public class AppContext : DbContext
    {
        public AppContext()
        {

        }

        public AppContext(DbContextOptions<AppContext> options) : base(options)
        {

        }
    }
}
