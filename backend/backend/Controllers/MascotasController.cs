using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Context;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MascotasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Mascotas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Mascota>>> GetMascota()
        {
            return await _context.Mascota.ToListAsync();
        }

        // GET: api/Mascotas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Mascota>> GetMascota(int id)
        {
            var mascota = await _context.Mascota.FindAsync(id);

            if (mascota == null)
            {
                return NotFound();
            }

            return mascota;
        }

        // PUT: api/Mascotas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMascota(int id, Mascota mascota)
        {
            if (id != mascota.Id)
            {
                return BadRequest();
            }

            _context.Entry(mascota).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MascotaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Mascotas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Mascota>> PostMascota(Mascota mascota)
        {
            _context.Mascota.Add(mascota);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMascota", new { id = mascota.Id }, mascota);
        }

        // DELETE: api/Mascotas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMascota(int id)
        {
            var mascota = await _context.Mascota.FindAsync(id);
            if (mascota == null)
            {
                return NotFound();
            }

            _context.Mascota.Remove(mascota);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MascotaExists(int id)
        {
            return _context.Mascota.Any(e => e.Id == id);
        }
    }
}
