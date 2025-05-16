using TodoApp.Data;
using TodoApp.Common;

namespace TodoApp.Features.RemoveTodo;

public class RemoveTodoHandler
{
    private readonly IRepository<Todo> _repository;

    public RemoveTodoHandler(IRepository<Todo> repository)
    {
        _repository = repository;
    }

    public async Task<Response<RemoveResponse>> HandleAsync(RemoveTodoCommand command)
    {
        var todo = await _repository.GetByIdAsync(command.Id);
        if (todo == null)
            return new Response<RemoveResponse>("Todo not found", "404");

        await _repository.DeleteAsync(todo);
        return new Response<RemoveResponse>(new RemoveResponse()
        {
            Id = todo.Id
        });
    }
}