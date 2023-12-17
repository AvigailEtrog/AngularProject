using Microsoft.AspNetCore.Mvc;
using Server.Models;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        public static List<ProductCart> myCart = new List<ProductCart>();
        // GET: api/<CartController>
        [HttpGet]
        public IEnumerable<ProductCart> Get()
        {
            return myCart;
        }

        // GET api/<CartController>/5
        [HttpGet("{id}")]
        public ProductCart Get(int id)
        {
            return myCart.FirstOrDefault<ProductCart>(prod => prod.Id == id);
        }

        // POST api/<CartController>
        [HttpPost]
        public bool Post([FromBody] ProductCart productCart)
        {
            int index = myCart.FindIndex(prod => prod.Present.Id == productCart.Present.Id);
            if (index != -1)
            {
                myCart[index].Quantity++;
                return true;

            }
            else
            {
                if (myCart.Count() != 0)
                {
                    var max = myCart[myCart.Count() - 1].Id;
                    productCart.Id = (max) + 1;
                }
                else
                {
                    productCart.Id = 1;
                }
                productCart.Quantity = 1;
                myCart.Add(productCart);
                return true;
            }
            return false;
        }


        // DELETE api/<CartController>/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            int index = myCart.FindIndex(cart => cart.Id == id);
            {
                if (index != -1)
                {
                    if (myCart[index].Quantity == 1)
                    {
                        myCart.RemoveAt(index);
                        return true;
                    }
                    else
                    {
                        myCart[index].Quantity--;
                        return true;
                    }
                }
            }
            return false;
        }

        // DELETE api/<CartController>/5

        [HttpDelete()]
        public bool Delete()
        {
            myCart = new List<ProductCart>();
            return true;
        }
    }
}
