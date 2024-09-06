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
    public class FormsListsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FormsListsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/FormsLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FormsList>>> GetFormsLists()
        {
            return await _context.FormsLists.ToListAsync();
        }

        // GET: api/FormsLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FormsList>> GetFormsList(int id)
        {
            var formsList = await _context.FormsLists.FindAsync(id);

            if (formsList == null)
            {
                return NotFound();
            }

            return formsList;
        }

        // PUT: api/FormsLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFormsList(int id, FormsList formsList)
        {
            if (id != formsList.Id)
            {
                return BadRequest();
            }

            _context.Entry(formsList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FormsListExists(id))
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

        // POST: api/FormsLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FormsList>> PostFormsList(FormsList formsList)
        {
            _context.FormsLists.Add(formsList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFormsList", new { id = formsList.Id }, formsList);
        }

        // DELETE: api/FormsLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFormsList(int id)
        {
            var formsList = await _context.FormsLists.FindAsync(id);
            if (formsList == null)
            {
                return NotFound();
            }

            _context.FormsLists.Remove(formsList);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FormsListExists(int id)
        {
            return _context.FormsLists.Any(e => e.Id == id);
        }
    }
}
