using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    public interface IOrdersController
    {
        IEnumerable<Order> Get();
        int Post([FromBody] Order o);
    }
}