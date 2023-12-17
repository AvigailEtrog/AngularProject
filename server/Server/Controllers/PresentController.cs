using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Server.Models;
using System.Xml.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PresentController : ControllerBase

    {
        static List<Present> presentsList = new List<Present>() 
        {
            new Present() { Id = 1, Name = "apartment", Donor = "32644789", Price = 50 } ,
            new Present() { Id = 2, Name = "Frizer", Donor = "76556777", Price = 10 } ,
            new Present() { Id = 3, Name = "Computer", Donor = "54454555", Price = 20 },
            new Present() { Id = 4, Name = "Camera", Donor = "76556777", Price = 30 },
            new Present() { Id = 5, Name = "ChildrenRoom", Donor = "75675675", Price = 30 },
            new Present() { Id = 6, Name = "car", Donor = "54454555", Price = 50 }
        };

        // GET: api/<PresentController>
        [HttpGet]
        public List<Present> Get()
        {
            return presentsList;
        }

        // GET api/<PresentController>/5
        [HttpGet("{id}")]
        public Present Get(int id)
        {
            return presentsList.FirstOrDefault(x => x.Id == id);
        }

        // POST api/<PresentController>
        [HttpPost]
        public Present Post([FromBody] Present p)
        {
            if (presentsList.Count() != 0) { 
            var max = presentsList[presentsList.Count()-1].Id;
            p.Id = (max) + 1;}
            else
            {
                p.Id = 1;
            }
            presentsList.Add(p);
            return p;
           
   
        }

        // PUT api/<PresentController>/5
        [HttpPut("{id}")]
        public Present Put(int id, [FromBody] Present p)
        {
            var index = presentsList.FindIndex(item => item.Id == p.Id);
            if (index > 0 && index < presentsList.Count) ;
            {
                presentsList[index] = p;
                return p;
            }   
        }

        // DELETE api/<PresentController>/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var pres = presentsList.FirstOrDefault(val => val.Id == id);
            if (pres != null)
            {
                presentsList.Remove(pres);
                return true;
            }
            return false;
        }

        [HttpDelete]
        public bool DeletePresents([FromQuery]int[] presents)
        {
            bool flag = false;
            for (int i = 0; i < presents.Length; i++)
            { 
                flag= Delete(presents[i]); 

            }
            return flag;
               
        }
    }
}
