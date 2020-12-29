
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace inventory.model
{
    public class MvResponse<T>
    {
        private List<T> _dataValue = new List<T>();
        [Required]
        public string Text { get; set; }
        [Required]
        public string Type { get; set; }
        [AllowNull]
        public List<T> Data
        {
            get => _dataValue;
            set => _dataValue = value ?? new List<T>();
        }
    }

    public class MvGetOptions
    {
        private string _stringValue = string.Empty;
        private List<MvFilter> _filterValue = new List<MvFilter>();

        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public int? TotalRows { get; set; }
        [AllowNull]
        public string SortBy
        {
            get { return _stringValue; }
            set { _stringValue = value ?? string.Empty; }
        }
        [AllowNull]
        public string SortOrder
        {
            get { return _stringValue; }
            set { _stringValue = value ?? string.Empty; }
        }
        [AllowNull]
        public List<MvFilter> Filter
        {
            get { return _filterValue; }
            set { _filterValue = value ?? new List<MvFilter>(); }
        }
    }

    public class MvPostOptions<T>
    {
        private List<T> _dataValue = new List<T>();
        [AllowNull]
        public List<T> Data
        {
            get => _dataValue;
            set => _dataValue = value ?? new List<T>();
        }
    }

    public class MvFilter
    {
        private string _stringValue = "equals";
        public string Field { get; set; }
        public string Value { get; set; }
        [AllowNull]
        public string Operator
        {
            get { return _stringValue; }
            set { _stringValue = value ?? string.Empty; }
        }
    }
}
