using FluentAssertions;
using NSubstitute;
using TaskManager.Application.DTOs;
using TaskManager.Application.Services;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Interfaces;

namespace TaskManager.Tests.Unit.Application
{
    public class TaskServiceTests
    {
        private readonly IToDoRepository _repository;
        private readonly ToDoService _sut;


        public TaskServiceTests()
        {
            _repository = Substitute.For<IToDoRepository>();
            _sut = new ToDoService(_repository);
        }

        [Fact]
        public async Task CompleteTask_WhenTaskExists_MarksTaskAsCompleted()
        {
            // Arrange
           
            var existingTask = new UpdateToDoItemDto { Title = "Test Task", IsCompleted = false };
            var toDoItem = new ToDoItem(existingTask.Title, null);
            
            _repository.GetByIdAsync(toDoItem.Id).Returns(toDoItem);
            _repository.SaveChangesAsync().Returns(Task.CompletedTask);
            existingTask.IsCompleted = true;

            // Act
            await _sut.UpdateAsync(toDoItem.Id, existingTask);

            // Assert
            toDoItem.IsCompleted.Should().BeTrue();
            await _repository.Received(1).UpdateAsync(Arg.Is<ToDoItem>(t => t.Id == toDoItem.Id && t.IsCompleted));
        }
    }
}
