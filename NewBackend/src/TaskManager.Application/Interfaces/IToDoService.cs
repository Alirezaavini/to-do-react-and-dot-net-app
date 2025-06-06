using TaskManager.Application.DTOs;

namespace TaskManager.Application.Interfaces
{
    public interface IToDoService
    {
        Task<ToDoItemDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        
        Task<IReadOnlyList<ToDoItemDto>> ListAllAsync(CancellationToken cancellationToken = default);
        
        Task<ToDoItemDto> CreateAsync(CreateToDoItemDto input, CancellationToken cancellationToken = default);
        
        Task<ToDoItemDto?> UpdateAsync(Guid id, UpdateToDoItemDto input, CancellationToken cancellationToken = default);
        
        Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}
