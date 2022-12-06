namespace ClientWebAppDemo.Models
{
    public class SubcategoryDTO
    {
        public int SubcategoryId { get; set; }
        public string Name { get; set; }

        public static SubcategoryDTO? SubcategoryToDTO(Subcategory? subcategory)
        {
            if (subcategory == null)
            {
                return null;
            }
            else
            {
                return new SubcategoryDTO
                {
                    SubcategoryId = subcategory.SubcategoryId,
                    Name = subcategory.Name
                };
            }
        }
    }
}
