using Microsoft.AspNetCore.Mvc;
using TaskManager.Application.DTOs;
using TaskManager.Application.Interfaces;

namespace TaskManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoController : ControllerBase
    {
        private readonly IToDoService _toDoService;

        public ToDoController(IToDoService toDoService)
        {
            _toDoService = toDoService;
        }

        // GET: api/ToDo
        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var list = await _toDoService.ListAllAsync(cancellationToken);
            return Ok(list);
        }

        // GET: api/ToDo/{id}
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            var item = await _toDoService.GetByIdAsync(id, cancellationToken);
            if (item is null)
                return NotFound();
            return Ok(item);
        }

        // POST: api/ToDo
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateToDoItemDto input, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _toDoService.CreateAsync(input, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT: api/ToDo/{id}
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateToDoItemDto input, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _toDoService.UpdateAsync(id, input, cancellationToken);
            if (updated is null)
                return NotFound();

            return Ok(updated);
        }

        // DELETE: api/ToDo/{id}
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
        {
            var success = await _toDoService.DeleteAsync(id, cancellationToken);
            if (!success)
                return NotFound();
            return NoContent();
        }
    }
}
