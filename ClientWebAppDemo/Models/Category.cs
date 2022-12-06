namespace ClientWebAppDemo.Models
{
    public class Category
    {
        public Category()
        {
            this.Contacts = new List<Contact>();
        }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public List<Contact> Contacts { get; set; }
    }
}
