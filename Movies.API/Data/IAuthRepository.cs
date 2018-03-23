using System.Threading.Tasks;
using Movies.API.Models;

namespace Movies.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);

         Task<bool> UsernameExists(string username);
    }
}