namespace ClientWebAppDemo.Models
{
    public class Subcategory
    {
        public Subcategory()
        {
            this.Contacts = new List<Contact>();
        }
        public int SubcategoryId { get; set; }
        public string Name { get; set; }
        public List<Contact> Contacts { get; set; }
    }
}
