using TaskManager.Application.DTOs;
using TaskManager.Application.Interfaces;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Interfaces;

namespace TaskManager.Application.Services
{
    public class ToDoService : IToDoService
    {
        private readonly IToDoRepository _repository;

        public ToDoService(IToDoRepository repository)
        {
            _repository = repository;
        }

        public async Task<ToDoItemDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var entity = await _repository.GetByIdAsync(id, cancellationToken);
            if (entity is null) return null;

            return MapToDto(entity);
        }

        public async Task<IReadOnlyList<ToDoItemDto>> ListAllAsync(CancellationToken cancellationToken = default)
        {
            var entities = await _repository.ListAllAsync(cancellationToken);
            return entities.Select(MapToDto).ToList();
        }

        public async Task<ToDoItemDto> CreateAsync(CreateToDoItemDto input, CancellationToken cancellationToken = default)
        {
            var entity = new ToDoItem(input.Title, input.Description);
            await _repository.AddAsync(entity, cancellationToken);
            await _repository.SaveChangesAsync(cancellationToken);

            return MapToDto(entity);
        }

        public async Task<ToDoItemDto?> UpdateAsync(Guid id, UpdateToDoItemDto input, CancellationToken cancellationToken = default)
        {
            var entity = await _repository.GetByIdAsync(id, cancellationToken);
            if (entity is null) return null;

            // Update domain entity
            entity.Update(input.Title, input.Description);
            if (input.IsCompleted && !entity.IsCompleted)
                entity.MarkAsCompleted();

            await _repository.UpdateAsync(entity, cancellationToken);
            await _repository.SaveChangesAsync(cancellationToken);

            return MapToDto(entity);
        }

        public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var entity = await _repository.GetByIdAsync(id, cancellationToken);
            if (entity is null) return false;

            await _repository.DeleteAsync(entity, cancellationToken);
            await _repository.SaveChangesAsync(cancellationToken);
            return true;
        }

        private static ToDoItemDto MapToDto(ToDoItem e) => new()
        {
            Id = e.Id,
            Title = e.Title,
            Description = e.Description,
            IsCompleted = e.IsCompleted,
            CreatedAt = e.CreatedAt
        };
    }
}
