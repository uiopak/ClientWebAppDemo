namespace ClientWebAppDemo.Models
{
    public class UserDTO
    {
        public UserDTO()
        {
            this.Roles = new List<RoleDTO>();
        }

        public int UserId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public List<RoleDTO> Roles { get; set; }
    }
}
