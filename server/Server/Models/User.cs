using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class User
    {
      
        public string UserName { get; set; }

        public string? Password { get; set; }

        public string PhonNumber { get; set; }

        public string Email { get; set; }
        
        public string? Address { get; set; }
    }
}
