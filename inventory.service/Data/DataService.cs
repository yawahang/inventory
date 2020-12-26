using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace inventory.service.Data
{
    public class DataService : IDataService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionstring = "";
        public int CurrentPersonId { get; set; }
        public string Role { get; set; }
        public string UserContext { get; set; }

        public DataService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionstring = _configuration[$"ConnectionString:{_configuration.GetSection("ApiEnvironment").Value}"] ?? _configuration["ConnectionString:Default"];
        }

        public async Task<IDbConnection> GetDbconnection()
        {
            var conn = new SqlConnection(_connectionstring);
            if (conn.State == ConnectionState.Closed) conn.Open();

            await conn.ExecuteAsync("SpSessionContextTsk", new { UserContext }, commandType: CommandType.StoredProcedure);
            return conn;
        }

        public void Dispose()
        {

        }

        public async Task<T> Get<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.Text)
        {
            using var conn = await GetDbconnection();
            try
            {
                return await conn.QueryFirstOrDefaultAsync<T>(sp, parms, commandType: commandType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<T> Insert<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            using var conn = await GetDbconnection();
            try
            {
                return await conn.ExecuteScalarAsync<T>(sp, parms, commandType: commandType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<T> Update<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            using var conn = await GetDbconnection();
            try
            {
                return await conn.ExecuteScalarAsync<T>(sp, parms, commandType: commandType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
