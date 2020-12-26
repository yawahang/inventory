using Dapper;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
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
        public int CurrentUserId { get; set; }
        public string Role { get; set; }

        public DataService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionstring = _configuration[$"ConnectionString:{_configuration.GetSection("ApiEnvironment").Value}"] ?? _configuration["ConnectionString:Default"];
        }

        public async Task<IDbConnection> GetConnection()
        {
            var conn = new SqlConnection(_connectionstring);
            conn.Open();
            try
            {
                var param = new DynamicParameters();
                param.Add("Json", JsonConvert.SerializeObject(new { UserId = CurrentUserId }), DbType.String);
                await conn.ExecuteScalarAsync("utl.SetContextInfo", param, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return conn;
        }

        public void Dispose()
        {

        }

        public async Task<T> Get<T>(string sp, DynamicParameters parms)
        {
            using var conn = await GetConnection();
            try
            {
                var result = await conn.QueryFirstOrDefaultAsync<T>(sp, parms, commandType: CommandType.StoredProcedure);
                conn.Close();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<T> Insert<T>(string sp, DynamicParameters parms)
        {
            using var conn = await GetConnection();
            try
            {
                var result = await conn.ExecuteScalarAsync<T>(sp, parms, commandType: CommandType.StoredProcedure);
                conn.Close();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<T> Update<T>(string sp, DynamicParameters parms)
        {
            using var conn = await GetConnection();
            try
            {
                var result = await conn.ExecuteScalarAsync<T>(sp, parms, commandType: CommandType.StoredProcedure);
                conn.Close();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
