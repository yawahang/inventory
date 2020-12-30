
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace inventory.model
{
    public class MvLoginParam
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class MvUser
    {
        [Required]
        public string RedirectUrl { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public List<MvRole> Role { get; set; }
        [Required]
        public List<MvNavigation> Navigation { get; set; }
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
        public string Url { get; set; }
    }

    public class MvRole
    {
        public int RoleId { get; set; }
        public string Role { get; set; }
    }
}
