using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace ClientWebAppDemo.Models
{
    public class ContactDTO
    {
        public int ContactId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public CategoryDTO? Category { get; set; }
        public int? CategoryId { get; set; }
        public SubcategoryDTO? Subcategory { get; set; }
        public int? SubcategoryId { get; set; }
        public string? CustomSubcategory { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Birthday { get; set; }

        public static ContactDTO ContactToDTO(Contact contact) =>
            new ContactDTO
            {
                ContactId = contact.ContactId,
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Email = contact.Email,
                Password = contact.Password,
                Category = CategoryDTO.CategoryToDTO(contact.Category),
                CategoryId = contact.CategoryId,
                Subcategory = SubcategoryDTO.SubcategoryToDTO(contact.Subcategory),
                SubcategoryId = contact.SubcategoryId,
                CustomSubcategory = contact.CustomSubcategory,
                PhoneNumber = contact.PhoneNumber,
                Birthday = contact.Birthday?.ToString()
            };
        public static Contact ContactDTOToContact(ContactDTO contact) =>
            new Contact
            {
                ContactId = contact.ContactId,
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Email = contact.Email,
                Password = contact.Password,
                CategoryId = contact.CategoryId,
                SubcategoryId = contact.SubcategoryId,
                CustomSubcategory = contact.CustomSubcategory,
                PhoneNumber = contact.PhoneNumber,
                Birthday = contact.Birthday != null?DateOnly.FromDateTime(DateTime.ParseExact(contact.Birthday, "dd.mm.yyyy", null)):null
            };
    }
}
