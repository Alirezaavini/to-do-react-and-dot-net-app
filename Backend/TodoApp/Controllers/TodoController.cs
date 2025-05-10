using Microsoft.AspNetCore.Mvc;
using TodoApp.Data;
using TodoApp.Features.CreateTodo;
using TodoApp.Features.GetTodos;
using TodoApp.Features.CompleteTodo;
using TodoApp.Common;
using Microsoft.AspNetCore.Cors;

namespace TodoApp.Controllers;

[ApiController]
[EnableCors("react")]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly CreateTodoHandler _createHandler;
    private readonly GetTodosHandler _getHandler;
    private readonly CompleteTodoHandler _completeHandler;

    public TodoController(IRepository<Todo> repository)
    {
        _createHandler = new CreateTodoHandler(repository);
        _getHandler = new GetTodosHandler(repository);
        _completeHandler = new CompleteTodoHandler(repository);
    }

    [HttpPost]
    public async Task<ActionResult<Response<CreateTodoResponse>>> Create([FromBody] CreateTodoRequest request)
    {
        var command = new CreateTodoCommand { Title = request.Title, Description = request.Description };
        var result = await _createHandler.HandleAsync(command);
        if (!result.IsSuccess)
            return BadRequest(result);
        return CreatedAtAction(nameof(GetAll), new { id = result.Result?.Id }, result);
    }

    
    [HttpGet]
    public async Task<Response<List<CreateTodoResponse>>> GetAll()
    {
        var result = await _getHandler.HandleAsync(new GetTodosQuery());
        return result;
    }

    [HttpPost("{id}/complete")]
    public async Task<Response<CompleteResponse>> Complete(int id)
    {
        var command = new CompleteTodoCommand { Id = id };
        var result = await _completeHandler.HandleAsync(command);
        if (!result.IsSuccess)
            return (result);
        return result;
    }
} 