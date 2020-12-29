using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace inventory.model
{
    public class MvListItem
    {

        private string _stringValue = string.Empty;
        [Required]
        public int ListItemId { get; set; }
        [Required]
        public string ListItem { get; set; }
        [AllowNull]
        public string Category
        {
            get { return _stringValue; }
            set { _stringValue = value ?? string.Empty; }
        }
    }
}
