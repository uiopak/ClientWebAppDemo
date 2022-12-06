using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClientWebAppDemo.Models
{
    [Index(nameof(Email), IsUnique = true)]
    public class Contact
    {
        public int ContactId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public int? CategoryId { get; set; }
        public Category? Category { get; set; }
        public int? SubcategoryId { get; set; }
        public Subcategory? Subcategory { get; set; }
        public string? CustomSubcategory { get; set; }
        public string? PhoneNumber { get; set; }
        public DateOnly? Birthday { get; set; }
    }
}
