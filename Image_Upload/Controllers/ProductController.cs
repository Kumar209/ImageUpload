using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System.Net.Http.Headers;
using System.Text;

namespace Image_Upload.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IProductRepository _productRepository;

        public ProductController(IWebHostEnvironment hostEnvironment, IProductRepository productRepository)
        {
            _hostEnvironment = hostEnvironment;
            _productRepository = productRepository;
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromForm] ProductDto productt)
        {
            string folder = "";

            if (productt.CoverPhoto != null && productt.CoverPhoto.Length > 0)
            {
                // Valid file extensions
                string[] allowedExtensions = { ".jpg", ".jpeg", ".png" };
                var fileExtension = Path.GetExtension(productt.CoverPhoto.FileName);

                if (!allowedExtensions.Contains(fileExtension.ToLower()))
                {
                    return BadRequest(new { message = "Only .jpg, .jpeg, and .png files are allowed." });
                }
                else if (productt.CoverPhoto.Length > (5 * 1024 * 1024)) // 5MB max file size
                {
                    return BadRequest(new { message = "File size should not exceed 5MB." });
                }
                else
                {
                    // Save the image
                    string wwwRootPath = _hostEnvironment.WebRootPath;

                    string fileName = Path.GetFileNameWithoutExtension(productt.CoverPhoto.FileName);

                    string extension = Path.GetExtension(productt.CoverPhoto.FileName);

                    string uniqueFileName = fileName + DateTime.Now.ToString("yymmssfff") + extension;

                    folder = "books/cover/" + uniqueFileName;

                    string serverFolder = Path.Combine(wwwRootPath, folder);

                    using (var fileStream = new FileStream(serverFolder, FileMode.Create))
                    {
                        await productt.CoverPhoto.CopyToAsync(fileStream);
                    }
                }
            }
            else
            {
                return BadRequest(new { message = "Please select a file." });
            }

            var product = new Product
            {
                pname = productt.pname,
                Brand = productt.Brand,
                price = productt.price,
                Description = productt.Description,
                ImageFile = folder
            };

            await _productRepository.AddProductAsync(product);

            return Ok(new { message = "Product added successfully." });
        }
        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productRepository.GetAllProductsAsync();
            return Ok(products);
        }
    }
}


