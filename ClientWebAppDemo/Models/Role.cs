namespace ClientWebAppDemo.Models
{
    public class Role
    {
        public Role()
        {
            this.Users = new List<User>();
        }
        public int RoleId { get; set; }
        public string Name { get; set; }
        public List<User> Users { get; set; }
    }
}
