namespace ClientWebAppDemo.Models
{
    public class CategoryDTO
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }

        public static CategoryDTO? CategoryToDTO(Category? category)
        {
            if (category == null)
            {
                return null;
            }
            else
            {
                return new CategoryDTO
                {
                    CategoryId = category.CategoryId,
                    Name = category.Name
                };
            }
        }
    }
}
