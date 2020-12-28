
namespace inventory.model
{
    public class MvResponse<T>
    {
        public string Text { get; set; }
        public string Type { get; set; }
        public T Data { get; set; }
    }

    public class MvPagination
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalRows { get; set; }
        public string SortBy { get; set; }
        public string SortOrder { get; set; }
    }
}
