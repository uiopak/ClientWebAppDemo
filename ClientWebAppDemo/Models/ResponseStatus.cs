namespace ClientWebAppDemo.Models
{
    public enum Status
    {
        OK,
        ERROR
    }
    public class ResponseStatus
    {
        public Status Status { get; set; }
        public string? StatusMessage { get; set; }
        public object? response { get; set; }

    }
}
