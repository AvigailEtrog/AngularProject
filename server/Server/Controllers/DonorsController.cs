using Microsoft.AspNetCore.Mvc;
using Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorsController : ControllerBase
    {
        static List<Donor> donorsList = new List<Donor>()
        {
            new Donor() { Id = "32644789", FirstName="Shira",LastName="Chaimov" ,Address="Bublik 15",Age=25} ,
            new Donor() { Id = "21422378", FirstName="Avigail",LastName="Cohen" ,Address="Kofman 40",Age=60} ,
            new Donor() { Id = "54454555", FirstName="Avi",LastName="Levi" ,Address="Bublik 15",Age=85 },
            new Donor() { Id = "46547767", FirstName="Dani",LastName="Yitchaki" ,Address="Michal 17",Age=15 },
            new Donor() { Id = "76556777", FirstName="Elisheva",LastName="Ben-David" ,Address="Yaakov-Elazar 150",Age=20},
            new Donor() { Id = "75675675", FirstName="Shalom",LastName="Zada" ,Address="Phatal 15",Age=30 }
        };

        // GET: api/<ValuesController>
        [HttpGet]
        public IEnumerable<Donor> Get()
        {
            return donorsList;
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public Donor Get(string id)
        {
            return donorsList.FirstOrDefault<Donor>(p => p.Id == id);
            
        }

        // POST api/<ValuesController>
        [HttpPost]
        public Donor Post([FromBody] Donor d)
        {
            //var max = donorsList[donorsList.Count() - 1].Id;
            //d.Id = (max) + 1;
            donorsList.Add(d);
            return d;
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public Donor Put(string id, [FromBody] Donor d)
        {
            var index = donorsList.FindIndex(item => item.Id == d.Id);
            if (index > 0 && index < donorsList.Count) ;
            {
                donorsList[index] = d;
                return d;
            }
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public bool Delete(string id)
        {
            var pres = donorsList.FirstOrDefault(val => val.Id == id);
            if (pres != null)
            {
                donorsList.Remove(pres);
                return true;
            }
            return false;
        }


        

        [HttpDelete]
        public bool DeletePresents([FromQuery] string[] donors)
        {
            bool flag = false;
            for (int i = 0; i < donors.Length; i++)
            {
                flag = Delete(donors[i]);

            }
            return flag;

        }
    }
}

