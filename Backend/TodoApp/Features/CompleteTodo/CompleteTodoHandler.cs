using TodoApp.Data;
using TodoApp.Common;

namespace TodoApp.Features.CompleteTodo;

public class CompleteTodoHandler
{
    private readonly IRepository<Todo> _repository;

    public CompleteTodoHandler(IRepository<Todo> repository)
    {
        _repository = repository;
    }

    public async Task<Response<CompleteResponse>> HandleAsync(CompleteTodoCommand command)
    {
        var todo = await _repository.GetByIdAsync(command.Id);
        if (todo == null)
            return new Response<CompleteResponse>("Todo not found", "404");
        todo.IsCompleted = true;
        await _repository.UpdateAsync(todo);
        return new Response<CompleteResponse>(true);
    }
} 