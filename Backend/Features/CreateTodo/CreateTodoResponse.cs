using TodoApp.Common;

namespace TodoApp.Features.CreateTodo;

public class CreateTodoResponse
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
} 