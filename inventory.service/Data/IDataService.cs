using Dapper;
using inventory.model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace inventory.service.Data
{
    public interface IDataService : IDisposable
    {
        int CurrentUserId { get; set; }
        List<MvRole> Role { get; set; }
        Task<IDbConnection> GetConnection();
        Task<string> Get(string sp, string json);
        Task<string> Insert(string sp, string json);
        Task<string> Update(string sp, string json);
    }
}
