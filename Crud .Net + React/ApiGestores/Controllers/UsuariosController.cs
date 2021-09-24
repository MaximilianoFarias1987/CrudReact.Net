using ApiGestores.Context;
using ApiGestores.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiGestores.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext context;
        public UsuariosController(AppDbContext _context)
        {
            context = _context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> Get()
        {
            try
            {
                return await context.Usuarios.ToListAsync();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> Get(int id)
        {
            try
            {
                var usuario = await context.Usuarios.FirstOrDefaultAsync(x => x.Id == id);
                if (usuario != null)
                {
                    return Ok(usuario);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }



        [HttpPost]
        public async Task<ActionResult<Usuario>> Post(Usuario usu)
        {
            try
            {
                var usuario = new Usuario
                {
                    Apellido = usu.Apellido,
                    Nombre = usu.Nombre,
                    Correo = usu.Correo,
                    Username = usu.Username,
                    Password = usu.Password
                };
                context.Usuarios.Add(usuario);
                await context.SaveChangesAsync();
                return Ok(usuario);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }



        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Usuario usu)
        {
            try
            {
                var usuario = await context.Usuarios.FirstOrDefaultAsync(x => x.Id == id);
                if (usuario != null)
                {
                    usuario.Apellido = usu.Apellido;
                    usuario.Nombre = usu.Nombre;
                    usuario.Correo = usu.Correo;
                    usuario.Username = usu.Username;
                    usuario.Password = usu.Password;
                    context.Usuarios.Update(usuario);
                    await context.SaveChangesAsync();
                    return Ok(usuario);
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
        public async Task<ActionResult<Usuario>> Delete(int id)
        {
            try
            {
                var usuario = await context.Usuarios.FirstOrDefaultAsync(x => x.Id == id);
                if (usuario != null)
                {
                    context.Usuarios.Remove(usuario);
                    await context.SaveChangesAsync();
                    return Ok(await context.Usuarios.ToListAsync());
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


        [HttpGet("{username}/{password}")]
        public ActionResult<List<Usuario>> IniciarSesion(string username, string password)
        {
            try
            {
                var usuario = context.Usuarios.Where(x => x.Username.Equals(username) && x.Password.Equals(password)).ToList();
                if (usuario != null)
                {
                    return Ok(usuario);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
