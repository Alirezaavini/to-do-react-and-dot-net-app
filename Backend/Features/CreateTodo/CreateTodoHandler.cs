using TodoApp.Data;
using TodoApp.Common;

namespace TodoApp.Features.CreateTodo;

public class CreateTodoHandler
{
    private readonly IRepository<Todo> _repository;

    public CreateTodoHandler(IRepository<Todo> repository)
    {
        _repository = repository;
    }

    public async Task<Response<CreateTodoResponse>> HandleAsync(CreateTodoCommand command)
    {
        var todo = new Todo
        {
            Title = command.Title,
            Description = command.Description,
            IsCompleted = false
        };
        await _repository.AddAsync(todo);
        var response = new CreateTodoResponse
        {
            Id = todo.Id,
            Title = todo.Title,
            Description = todo.Description,
            IsCompleted = todo.IsCompleted
        };
        return new Response<CreateTodoResponse>(response);
    }
} 