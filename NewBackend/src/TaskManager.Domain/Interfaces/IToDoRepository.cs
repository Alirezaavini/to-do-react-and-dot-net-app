using TaskManager.Domain.Entities;

namespace TaskManager.Domain.Interfaces
{
    public interface IToDoRepository
    {
        Task<ToDoItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<IReadOnlyList<ToDoItem>> ListAllAsync(CancellationToken cancellationToken = default);
        Task AddAsync(ToDoItem entity, CancellationToken cancellationToken = default);
        Task UpdateAsync(ToDoItem entity, CancellationToken cancellationToken = default);
        Task DeleteAsync(ToDoItem entity, CancellationToken cancellationToken = default);
        Task SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
