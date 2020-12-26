
using System;
using System.ComponentModel.DataAnnotations;

namespace inventory.model
{
    public class MvSales : MvResponse
    {
        [Required]
        public int SalesId { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public string Product { get; set; }
        [Required]
        public string Customer { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public decimal Total { get { return Quantity * Price; } }
        [Required]
        public DateTime InsertDate { get; set; }
        [Required]
        public int UserPersonId { get; set; }
    }
}
