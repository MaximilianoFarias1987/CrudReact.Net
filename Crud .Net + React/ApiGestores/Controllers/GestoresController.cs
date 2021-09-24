using ApiGestores.Context;
using ApiGestores.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace ApiGestores.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GestoresController : ControllerBase
    {
        private readonly AppDbContext context;
        public GestoresController(AppDbContext _context)
        {
            context = _context;
        }
        
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.GestoresBd.ToList());
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var gestor = context.GestoresBd.FirstOrDefault(x => x.Id == id);
                return Ok(gestor);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }



        [HttpPost]
        public ActionResult Post([FromBody] GestorBd gestor)
        {
            try
            {
                var gestorBd = new GestorBd
                {
                    Nombre = gestor.Nombre,
                    Lanzamiento = gestor.Lanzamiento,
                    Desarrollador = gestor.Desarrollador
                };
                context.GestoresBd.Add(gestorBd);
                context.SaveChanges();
                return Ok(gestorBd);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }



        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] GestorBd gestor)
        {
            try
            {
                var gestorBd = context.GestoresBd.FirstOrDefault(x => x.Id == id);
                if (gestorBd != null)
                {
                    gestorBd.Nombre = gestor.Nombre;
                    gestorBd.Lanzamiento = gestor.Lanzamiento;
                    gestorBd.Desarrollador = gestor.Desarrollador;
                    context.GestoresBd.Update(gestorBd);
                    context.SaveChanges();
                    return Ok(gestorBd);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var gestor = context.GestoresBd.FirstOrDefault(x => x.Id == id);
                if (gestor != null)
                {
                    context.GestoresBd.Remove(gestor);
                    context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
