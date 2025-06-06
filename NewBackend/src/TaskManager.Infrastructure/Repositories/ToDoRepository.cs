using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Interfaces;
using ToDoApp.Infrastructure.Persistence;

namespace TaskManager.Infrastructure.Repositories
{
    public class ToDoRepository : IToDoRepository
    {
        private readonly ToDoDbContext _dbContext;

        public ToDoRepository(ToDoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(ToDoItem entity, CancellationToken cancellationToken = default)
        {
            await _dbContext.ToDoItems.AddAsync(entity, cancellationToken);
        }

        public async Task DeleteAsync(ToDoItem entity, CancellationToken cancellationToken = default)
        {
            _dbContext.ToDoItems.Remove(entity);
            await Task.CompletedTask;
        }

        public async Task<ToDoItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            return await _dbContext.ToDoItems
                      .AsNoTracking()
                      .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        }

        public async Task<IReadOnlyList<ToDoItem>> ListAllAsync(CancellationToken cancellationToken = default)
        {
            return await _dbContext.ToDoItems
                      .AsNoTracking()
                      .ToListAsync(cancellationToken);
        }

        public async Task UpdateAsync(ToDoItem entity, CancellationToken cancellationToken = default)
        {
            _dbContext.ToDoItems.Update(entity);
            await Task.CompletedTask;
        }

        public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
