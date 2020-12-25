
using System.ComponentModel.DataAnnotations;

namespace inventory.model
{
    public class MvLogin
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class MvUser
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public MvNavigation Navigation { get; set; }
    }

    public class MvNavigation
    {
        [Required]
        public int NavigationId { get; set; }
        [Required]
        public string Navigation { get; set; }
        [Required]
        public int ApplicationId { get; set; }
        [Required]
        public string Application { get; set; }
    }
}
