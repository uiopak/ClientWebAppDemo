using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClientWebAppDemo.Data;
using ClientWebAppDemo.Models;
using Microsoft.AspNetCore.Authorization;

namespace ClientWebAppDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubcategoriesController : ControllerBase
    {
        private readonly ContactsContext _context;

        public SubcategoriesController(ContactsContext context)
        {
            _context = context;
        }

        // GET: api/Subcategories
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<SubcategoryDTO>>> GetSubcategories()
        {
            if (_context.Subcategories == null)
            {
                return NotFound();
            }
            return await _context.Subcategories.Select(c => SubcategoryDTO.SubcategoryToDTO(c)!).ToListAsync();
        }

        // GET: api/Subcategories/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<SubcategoryDTO>> GetSubcategory(int id)
        {
            if (_context.Subcategories == null)
            {
                return NotFound();
            }
            var subcategory = await _context.Subcategories.FindAsync(id);

            if (subcategory == null)
            {
                return NotFound();
            }

            return SubcategoryDTO.SubcategoryToDTO(subcategory)!;
        }

        // PUT: api/Subcategories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "ValidAccessToken")]
        public async Task<IActionResult> PutSubcategory(int id, Subcategory subcategory)
        {
            if (id != subcategory.SubcategoryId)
            {
                return BadRequest();
            }

            _context.Entry(subcategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubcategoryExists(id))
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

        // POST: api/Subcategories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Policy = "ValidAccessToken")]
        public async Task<ActionResult<Subcategory>> PostSubcategory(Subcategory subcategory)
        {
            if (_context.Subcategories == null)
            {
                return Problem("Entity set 'ContactsContext.Subcategories'  is null.");
            }
            _context.Subcategories.Add(subcategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubcategory", new { id = subcategory.SubcategoryId }, subcategory);
        }

        // DELETE: api/Subcategories/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "ValidAccessToken")]
        public async Task<IActionResult> DeleteSubcategory(int id)
        {
            if (_context.Subcategories == null)
            {
                return NotFound();
            }
            var subcategory = await _context.Subcategories.FindAsync(id);
            if (subcategory == null)
            {
                return NotFound();
            }

            _context.Subcategories.Remove(subcategory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubcategoryExists(int id)
        {
            return (_context.Subcategories?.Any(e => e.SubcategoryId == id)).GetValueOrDefault();
        }
    }
}
