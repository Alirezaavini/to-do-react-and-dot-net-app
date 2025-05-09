using TodoApp.Data;
using TodoApp.Features.CreateTodo;
using TodoApp.Common;

namespace TodoApp.Features.GetTodos;

public class GetTodosHandler
{
    private readonly IRepository<Todo> _repository;

    public GetTodosHandler(IRepository<Todo> repository)
    {
        _repository = repository;
    }

    public async Task<Response<List<CreateTodoResponse>>> HandleAsync(GetTodosQuery query)
    {
        var todos = await _repository.ListAsync();
        var result = todos.Select(todo => new CreateTodoResponse
        {
            Id = todo.Id,
            Title = todo.Title,
            Description = todo.Description,
            IsCompleted = todo.IsCompleted
        }).ToList();
        return new Response<List<CreateTodoResponse>>(result);
    }
} 