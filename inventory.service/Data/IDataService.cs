using Dapper;
using System;
using System.Data;
using System.Threading.Tasks;

namespace inventory.service.Data
{
    public interface IDataService : IDisposable
    {
        Task<IDbConnection> GetDbconnection();
        Task<T> Get<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        Task<T> Insert<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
        Task<T> Update<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure);
    }
}
