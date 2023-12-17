using Microsoft.AspNetCore.Mvc;
using Server.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LotteryController : ControllerBase
    {
        public static List<Lottery> lotteries = new List<Lottery>();
        private readonly IOrdersController _ordersController;
        public LotteryController(IOrdersController ordersController)
        {
            _ordersController = ordersController;      
        }
        // GET: api/<LotteryController>
        [HttpGet]
        public IEnumerable<Lottery> Get()
        {
            return lotteries;
        }

        [HttpPost]
        public User Post([FromBody] Present present)
        {
            if (lotteries.FirstOrDefault(l => l.Present.Id == present.Id) == null)
            {
                List<Order> orders = _ordersController.Get().ToList();
                List<User> users = new List<User>();
                orders.ForEach(order =>
                {
                    ProductCart product = order.MyOrder.ToList().FirstOrDefault(p => p.Present.Id == present.Id);
                    if (product != null)
                    {
                         for (int i = 0; i < product.Quantity; i++)users.Add(order.User);              
                    }
                   
                });
                if (users.Count != 0) { 
                Random r = new Random();
                int index = r.Next(users.Count);
                lotteries.Add(new Lottery() { Present = present, User = users[index] });
                return users[index];}
            }
            return null;
        }
    }
}
