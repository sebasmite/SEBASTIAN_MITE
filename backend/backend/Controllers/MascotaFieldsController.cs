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
    public class MascotaFieldsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MascotaFieldsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/MascotaFields
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MascotaFields>>> GetMascotaFields()
        {
            return await _context.MascotaFields.ToListAsync();
        }

        // GET: api/MascotaFields/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MascotaFields>> GetMascotaFields(int id)
        {
            var mascotaFields = await _context.MascotaFields.FindAsync(id);

            if (mascotaFields == null)
            {
                return NotFound();
            }

            return mascotaFields;
        }

        // PUT: api/MascotaFields/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMascotaFields(int id, MascotaFields mascotaFields)
        {
            if (id != mascotaFields.Id)
            {
                return BadRequest();
            }

            _context.Entry(mascotaFields).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MascotaFieldsExists(id))
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

        // POST: api/MascotaFields
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MascotaFields>> PostMascotaFields(MascotaFields mascotaFields)
        {
            _context.MascotaFields.Add(mascotaFields);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMascotaFields", new { id = mascotaFields.Id }, mascotaFields);
        }

        // DELETE: api/MascotaFields/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMascotaFields(int id)
        {
            var mascotaFields = await _context.MascotaFields.FindAsync(id);
            if (mascotaFields == null)
            {
                return NotFound();
            }

            _context.MascotaFields.Remove(mascotaFields);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MascotaFieldsExists(int id)
        {
            return _context.MascotaFields.Any(e => e.Id == id);
        }
    }
}
