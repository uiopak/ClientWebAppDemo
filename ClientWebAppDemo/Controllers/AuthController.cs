using ClientWebAppDemo.Data;
using ClientWebAppDemo.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ClientWebAppDemo.Controllers
{
    public class UserModel
    {
        public string Username { get; set; }
        public string[] Roles { get; set; }
    }
    public class UsernameRes
    {
        public string Username { get; set; }
        public bool LoggedIn { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ContactsContext _context;

        public AuthController(ContactsContext context)
        {
            _context = context;
        }
        public class authUser
        {
            public string username { get; set; }
            public string password { get; set; }
            //public string iv { get; set; }
            //public string authTag { get; set; }
        }
        // POST api/<ValuesController>
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<string> Login([FromBody] authUser value)
        {
            var password = value.password;
            var username = value.username;
            try
            {
                Models.User? user = _context.Users.Where(u => u.Login == username).Include(u => u.Roles).ToList().First();

                if (user == null)
                {
                    return "error";
                }

                if (user.Password != password)
                {
                    return "failed";
                }

                if (user.Roles.Count(r => r.Name == "disabled") > 0)
                {
                    return "disabled";
                }

                var userModel = new UserModel() { Roles = user.Roles.Select(r => r.Name).ToArray(), Username = value.username };

                var tokenString = GenerateJSONWebToken(userModel);

                HttpContext.Response.Cookies.Append(
                           "SESSION_TOKEN",
                           /*"Bearer " +*/ tokenString,
                           new CookieOptions
                           {
                               Expires = DateTime.Now.AddDays(7),
                               HttpOnly = true,
                               Secure = false //todo set true when https is set
                           });

                return "authenticated";

            }
            catch (Exception)
            {
                return "failed";
            }
        }

        [HttpGet("logout")]
        [AllowAnonymous]
        public async Task<string> Logout()
        {
            if (HttpContext.Request.Cookies["SESSION_TOKEN"] != null)
            {
                HttpContext.Response.Cookies.Append(
                           "SESSION_TOKEN", "",
                           new CookieOptions
                           {
                               Expires = DateTime.Now.AddDays(-100),
                               HttpOnly = true,
                               Secure = false //todo set true when https is set
                           });
            }
            return "logout";
        }


        [HttpGet("username")]
        [AllowAnonymous]
        public async Task<ActionResult<UsernameRes>> Username()
        {
            var currentUser = HttpContext.User;

            if (currentUser.HasClaim(c => c.Type == ClaimTypes.NameIdentifier))
            {
                var username = currentUser.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier).ToList();
                var usernameString = username.FirstOrDefault().Value;
                if (usernameString != null)
                {
                    var usernameRes = new UsernameRes()
                    {
                        Username = usernameString,
                        LoggedIn = true
                    };
                    return usernameRes;
                }
            }
            var noUsernameRes = new UsernameRes()
            {
                Username = "",
                LoggedIn = false
            };
            return noUsernameRes;
        }

        private string GenerateJSONWebToken(UserModel userModel)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ThisismySecretKey"));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claimList = new List<Claim>();
            claimList.Add(new Claim(ClaimTypes.NameIdentifier, userModel.Username));
            claimList.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            if (userModel.Roles != null)
            {
                foreach (var userModelRole in userModel.Roles)
                {
                    claimList.Add(new Claim(ClaimTypes.Role, userModelRole));
                }
            }
            var token = new JwtSecurityToken("example.com",
                "example.com",
                claimList.ToArray(),
                expires: DateTime.Now.AddDays(7),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
