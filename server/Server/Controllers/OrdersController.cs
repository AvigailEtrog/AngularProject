using Microsoft.AspNetCore.Mvc;
using Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase, IOrdersController//נכון לעשות זאת ב service
    {
        public static List<Order> myOrders = new List<Order>();

        // GET: api/<UsersController>
        [HttpGet]
        public IEnumerable<Order> Get()
        {
            return myOrders;
        }

        // GET api/<UsersController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/<UsersController>
        [HttpPost]
        public int Post([FromBody] Order o)
        {

            if (myOrders.Count() != 0)
            {
                var max = myOrders[myOrders.Count() - 1].Id;
                o.Id = (max) + 1;
            }
            else
            {
                o.Id = 1;
            }
            myOrders.Add(o);
            return o.Id;



        }

        // PUT api/<UsersController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<UsersController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
