namespace TodoApp.Features.CreateTodo;

public class CreateTodoCommand
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
} 