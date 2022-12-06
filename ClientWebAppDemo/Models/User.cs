namespace ClientWebAppDemo.Models
{
    public class User
    {
        public User()
        {
            this.Roles = new List<Role>();
        }

        public int UserId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public List<Role> Roles { get; set; }
    }
}
