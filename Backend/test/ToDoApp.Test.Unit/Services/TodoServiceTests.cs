using Azure.Core;
using NSubstitute;
using NSubstitute.ReturnsExtensions;
using TodoApp.Common;
using TodoApp.Data;
using TodoApp.Features.CompleteTodo;
using TodoApp.Features.CreateTodo;

namespace ToDoApp.Tests.Unit.Services
{
    public class TodoServiceTests
    {
        private readonly CompleteTodoHandler _sut;
        private readonly EfRepository<Todo> _toDoRepo = Substitute.For<EfRepository<Todo>>();

        public TodoServiceTests()
        {
            _sut = new CompleteTodoHandler(_toDoRepo);
        }


        [Fact]
        public async Task CreateToDoAsync_ShouldCreateTask_WhentDetailsAreValid()
        {
            // Arrange
            var command = new CreateTodoCommand { Title = "Title", Description = "desc" };
            var entity = new Todo
            {
                Id = 1,
                Title = "title",
                Description = "",
                IsCompleted = true
            };

            var response = new Response()
            {
                IsSuccess = true
            };

           await _toDoRepo.UpdateAsync(Arg.Any<Todo>());
           
           // Act



            // Assert


        }
    }
}
