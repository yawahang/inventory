using Dapper;
using System;
using System.Data;
using System.Threading.Tasks;

namespace inventory.service.Data
{
    public interface IDataService : IDisposable
    {
        int CurrentUserId { get; set; }
        string Role { get; set; }
        Task<IDbConnection> GetConnection();
        Task<T> Get<T>(string sp, DynamicParameters parms);
        Task<T> Insert<T>(string sp, DynamicParameters parms);
        Task<T> Update<T>(string sp, DynamicParameters parms);
    }
}
