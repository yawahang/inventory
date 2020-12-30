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

        public async Task<string> Get(string sp, string json)
        {
            using var conn = await GetConnection();
            try
            {
                var param = new DynamicParameters();
                param.Add("Json", json, DbType.String);
                var result = await conn.QueryFirstOrDefaultAsync<string>(sp, param, commandType: CommandType.StoredProcedure);
                conn.Close();
                return result ?? "{}";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> Insert(string sp, string json)
        {
            using var conn = await GetConnection();
            try
            {
                var param = new DynamicParameters();
                param.Add("Json", json, DbType.String, direction: ParameterDirection.InputOutput);
                var result = await conn.ExecuteAsync(sp, param, commandType: CommandType.StoredProcedure);
                conn.Close();
                return param.Get<string>("Json") ?? "{}";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<string> Update(string sp, string json)
        {
            using var conn = await GetConnection();
            try
            {
                var param = new DynamicParameters();
                param.Add("Json", json, DbType.String, direction: ParameterDirection.InputOutput);
                var result = await conn.ExecuteAsync(sp, param, commandType: CommandType.StoredProcedure);
                conn.Close();
                return param.Get<string>("Json") ?? "{}";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
