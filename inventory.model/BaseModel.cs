
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace inventory.model
{
    public class MvResponse<T>
    {
        [Required]
        public MvResponseMessage<T> Json { get; set; }
    }

    public class MvResponseMessage<T>
    {
        [Required]
        public MvMessage Message { get; set; }
        public List<T> Data { get; set; }
    }

    public class MvMessage
    {
        [Required]
        public string Text { get; set; }
        [Required]
        public string Type { get; set; }
    }
}
