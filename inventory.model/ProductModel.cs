
using System;

namespace inventory.model
{

    public class MvProduct
    {
        public int ProductId { get; set; }
        public string Product { get; set; }
        public string Description { get; set; }
        public string Company { get; set; }
        public string Brand { get; set; }
        public string Location { get; set; }
        public int Stock { get; set; }
        public string Status { get; set; }
        public int StatusListItemId { get; set; }
        public decimal Price { get; set; }
        public DateTime InsertDate { get; set; }
        public string CreatedBy { get; set; }
    }
}
