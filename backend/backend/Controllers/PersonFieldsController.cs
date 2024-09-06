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
    public class PersonFieldsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PersonFieldsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/PersonFields
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonFields>>> GetPersonFields()
        {
            return await _context.PersonFields.ToListAsync();
        }

        // GET: api/PersonFields/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonFields>> GetPersonFields(int id)
        {
            var personFields = await _context.PersonFields.FindAsync(id);

            if (personFields == null)
            {
                return NotFound();
            }

            return personFields;
        }

        // PUT: api/PersonFields/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonFields(int id, PersonFields personFields)
        {
            if (id != personFields.Id)
            {
                return BadRequest();
            }

            _context.Entry(personFields).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonFieldsExists(id))
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

        // POST: api/PersonFields
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PersonFields>> PostPersonFields(PersonFields personFields)
        {
            _context.PersonFields.Add(personFields);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPersonFields", new { id = personFields.Id }, personFields);
        }

        // DELETE: api/PersonFields/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonFields(int id)
        {
            var personFields = await _context.PersonFields.FindAsync(id);
            if (personFields == null)
            {
                return NotFound();
            }

            _context.PersonFields.Remove(personFields);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PersonFieldsExists(int id)
        {
            return _context.PersonFields.Any(e => e.Id == id);
        }
    }
}
