using System.ComponentModel.DataAnnotations;

namespace Image_Upload
{
    public class Product
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Required product name")]
        public string pname { get; set; }
        [Required(ErrorMessage = "Brand Required")]
        public string Brand { get; set; }
        [Required(ErrorMessage = "Price Required")]
        public double price { get; set; }
        [Required(ErrorMessage = "Description Required")]
        public string Description { get; set; }
        public string ImageFile { get; set; }
    }
}
