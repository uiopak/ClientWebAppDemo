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
using System.Globalization;
using System.Text.RegularExpressions;

namespace ClientWebAppDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ContactsContext _context;

        public ContactsController(ContactsContext context)
        {
            _context = context;
        }

        // GET: api/Contacts
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<ContactDTO>>> GetContacts()
        {
            if (_context.Contacts == null)
            {
                return NotFound();
            }
            return await _context.Contacts.Include(c => c.Category).Include(c => c.Subcategory).Select(c => ContactDTO.ContactToDTO(c)).ToListAsync();
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<ContactDTO>> GetContact(int id)
        {
            if (_context.Contacts == null)
            {
                return NotFound();
            }
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }
            _context.Entry(contact).Reference(c => c.Category).Load();
            _context.Entry(contact).Reference(c => c.Subcategory).Load();

            return ContactDTO.ContactToDTO(contact);
        }

        [HttpGet("new")]
        [AllowAnonymous]
        public async Task<ActionResult<ContactDTO>> GetContact()
        {
            return new ContactDTO() { ContactId = 0 };
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "ValidAccessToken")]
        public async Task<IActionResult> PutContact(int id, ContactDTO contact)
        {
            if (id != contact.ContactId)
            {
                return BadRequest();
            }

            if (!ValidatePassword(contact))
            {
                return ValidationProblem("password");
            }

            if (!ValidateBirthday(contact))
            {
                return ValidationProblem("birthday");
            }

            Contact con = ContactDTO.ContactDTOToContact(contact);

            _context.Entry(con).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (DbUpdateException e)
            {
                return Conflict(e);
            }

            return NoContent();
        }

        // POST: api/Contacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Policy = "ValidAccessToken")]
        public async Task<IActionResult> PostContact(ContactDTO contact)
        {
            if (_context.Contacts == null)
            {
                return Problem("Entity set 'ContactsContext.Contacts'  is null.");
            }
            // Reset ContactId, 0 will be auto changed to next new Id
            if (contact.ContactId != 0)
            {
                contact.ContactId = 0;
            }

            if (!ValidatePassword(contact))
            {
                return ValidationProblem("password");
            }

            if (!ValidateBirthday(contact))
            {
                return ValidationProblem("birthday");
            }

            try
            {
                _context.Contacts.Add(ContactDTO.ContactDTOToContact(contact));
            }
            catch (Exception e)
            {
                return Conflict(e);
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                return Conflict(e);
            }

            return CreatedAtAction("GetContact", new { id = contact.ContactId }, contact);
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "ValidAccessToken")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            if (_context.Contacts == null)
            {
                return NotFound();
            }
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return (_context.Contacts?.Any(e => e.ContactId == id)).GetValueOrDefault();
        }

        private static bool ValidatePassword(ContactDTO contact)
        {
            if (contact.Password != null)
            {
                // Check if password contain at least one digit, one lowercase letter, one uppercase letter, one special character (not letter or digit) and is 8 or more characters long
                var regex = new Regex(@"^(?=(.*\d){1})(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$");
                if (!regex.IsMatch(contact.Password))
                {
                    return false;
                }
            }
            return true;
        }

        private static bool ValidateBirthday(ContactDTO contact)
        {
            // Validate Birthday string if not null (null is acceptable)
            if (contact.Birthday != null)
            {
                // try to parse string to date, ContactDTOToContact will reapeat parsing, if it is posible
                DateTime newRes = new DateTime();
                var res = DateTime.TryParseExact(contact.Birthday, "dd.mm.yyyy", null, DateTimeStyles.None, out newRes);
                if (!res)
                {
                    return false;
                }
            }
            return true;
        }
    }
}
