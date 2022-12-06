using ClientWebAppDemo.Models;

namespace ClientWebAppDemo.Data
{
    public class DbInitializer
    {
        public static void Initialize(ContactsContext context)
        {
            context.Database.EnsureCreated();

            // Look for any user.
            bool usersCreated = context.Users.Any();
            // Look for any categorie.
            bool categoriesCreated = context.Categories.Any();
            // Look for any subcategorie.
            bool subcategoriesCreated = context.Subcategories.Any();
            // Look for any contact.
            bool contactsCreated = context.Contacts.Any();
            // Look for any roles.
            bool rolesCreated = context.Roles.Any();

            if (usersCreated && categoriesCreated && subcategoriesCreated && contactsCreated && rolesCreated)
            {
                return; // DB has been initialized
            }

            if (!rolesCreated)
            {
                // Create default roles
                var roles = new Role[]
                {
                    // admin can change other users accounts
                    new Role { Name = "admin"},
                    // user can edit contacts
                    new Role { Name = "user"},
                    // disabled user can't login
                    new Role { Name = "disabled"},
                };
                foreach (Role role in roles)
                {
                    context.Roles.Add(role);
                }
                context.SaveChanges();
            }

            if (!usersCreated)
            {
                Role adminRole = context.Roles.Where(r => r.Name == "admin").First();
                Role userRole = context.Roles.Where(r => r.Name == "user").First();
                // Create default user
                var users = new User[]
                {
                    new User {
                        Login = "admin",
                        Password = "paS$w0rd",
                        Roles = {adminRole, userRole}
                    },
                    new User {
                        Login = "demo",
                        Password = "paS$w0rd",
                        Roles = {userRole}
                    }
                };
                foreach (User user in users)
                {
                    context.Users.Add(user);
                }
                context.SaveChanges();
            }

            if (!categoriesCreated)
            {
                // Create default categories
                var categories = new Category[]
                {
                    new Category { Name = "Służbowy"},
                    new Category { Name = "Prywatny"},
                    new Category { Name = "Inny"},
                };
                foreach (Category category in categories)
                {
                    context.Categories.Add(category);
                }
                context.SaveChanges();
            }

            if (!categoriesCreated)
            {
                // Create default subcategories
                var subcategories = new Subcategory[]
                {
                    new Subcategory { Name = "Szef"},
                    new Subcategory { Name = "Klient"},
                    new Subcategory { Name = "Potencjalny klient"},
                };
                foreach (Subcategory subcategory in subcategories)
                {
                    context.Subcategories.Add(subcategory);
                }
                context.SaveChanges();
            }

            if (!contactsCreated)
            {
                Category businessCategory = context.Categories.Where(r => r.Name == "Służbowy").First();
                Subcategory clientSubcategory = context.Subcategories.Where(r => r.Name == "Klient").First();
                Category privateCategory = context.Categories.Where(r => r.Name == "Prywatny").First();
                Category otherCategory = context.Categories.Where(r => r.Name == "Inny").First();

                // Create default contacts
                var contacts = new Contact[]
                {
                    //new Contact { FirstName= "Jan", LastName="Kowalski", Email="jk@example.com", Category=businessCategory },
                    new Contact { FirstName= "Jan", LastName="Kowalski", Email="jk@example.com", CategoryId=1 },
                    new Contact { FirstName= "Zuzanna", LastName="Nowak", Email="zn@example.com", Category=businessCategory, Subcategory = clientSubcategory },
                    new Contact { FirstName= "Szymon", LastName="Zieliński", Email="sz@example.com", Category = privateCategory },
                    new Contact { FirstName= "Anna", LastName="Kamińska", Email="ak@example.com", Category = otherCategory, CustomSubcategory = "Księgowość" }
                };
                foreach (Contact contact in contacts)
                {
                    context.Contacts.Add(contact);
                }
                context.SaveChanges();
            }
        }
    }
}
