using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;

namespace inventory.data
{
    public class Dapper : IDapper
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionstring = "";

        public Dapper(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionstring = _configuration[$"ConnectionString:{_configuration.GetSection("ApiEnvironment").Value}"] ?? _configuration["ConnectionString:Default"];
        }

        public void Dispose()
        {

        }

        public T Get<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.Text)
        {
            using IDbConnection db = new SqlConnection(_connectionstring);
            return db.Query<T>(sp, parms, commandType: commandType).FirstOrDefault();
        }

        //public List<T> GetAll<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        //{
        //    using IDbConnection db = new SqlConnection(_connectionstring);
        //    return db.Query<T>(sp, parms, commandType: commandType).ToList();
        //}

        //public int Execute(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        //{
        //    throw new NotImplementedException();
        //}

        public DbConnection GetDbconnection()
        {
            return new SqlConnection(_connectionstring);
        }

        public T Insert<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            T result;
            using IDbConnection db = new SqlConnection(_connectionstring);
            try
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }

                using var tran = db.BeginTransaction();
                try
                {
                    result = db.Query<T>(sp, parms, commandType: commandType, transaction: tran).FirstOrDefault();
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (db.State == ConnectionState.Open)
                {
                    db.Close();
                }
            }

            return result;
        }

        public T Update<T>(string sp, DynamicParameters parms, CommandType commandType = CommandType.StoredProcedure)
        {
            T result;
            using IDbConnection db = new SqlConnection(_connectionstring);
            try
            {
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }

                using var tran = db.BeginTransaction();
                try
                {
                    result = db.Query<T>(sp, parms, commandType: commandType, transaction: tran).FirstOrDefault();
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (db.State == ConnectionState.Open)
                {
                    db.Close();
                }
            }

            return result;
        }
    }
}
