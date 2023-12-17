using System.Runtime.InteropServices;

namespace Server.Models
{
    public class Order
    {
        public int Id { get; set; }
        public User User { get; set; }
        public ProductCart[] MyOrder { get; set; }
    }
}
