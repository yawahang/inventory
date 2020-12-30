
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace inventory.model
{
    public class MvResponse<T>
    {
        [AllowNull]
        public string Text { get; set; }
        [AllowNull]
        public string Type { get; set; }
        [AllowNull]
        public List<T> Data { get; set; }
    }

    public class MvPost
    {
        [AllowNull]
        public object Json { get; set; }
    }

    public class MvFilter
    {
        private string _stringValue = string.Empty;
        [Required]
        public string Field { get; set; }
        [Required]
        public string Value { get; set; }
        [AllowNull]
        public string Operator
        {
            get => _stringValue;
            set => _stringValue = value ?? _stringValue;
        }
    }
}
