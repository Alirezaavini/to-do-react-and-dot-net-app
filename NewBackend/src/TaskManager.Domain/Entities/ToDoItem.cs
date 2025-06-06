namespace TaskManager.Domain.Entities
{
    public class ToDoItem
    {
        public Guid Id { get; private set; }
        public string Title { get; private set; }
        public string? Description { get; private set; }
        public bool IsCompleted { get; private set; }
        public DateTime CreatedAt { get; private set; }

    

        // Domain‐level constructor / factory
        public ToDoItem(string title, string? description = null)
        {
            Id = Guid.NewGuid();
            Title = !string.IsNullOrWhiteSpace(title)
                    ? title
                    : throw new ArgumentException("Title cannot be empty.", nameof(title));
            Description = description;
            IsCompleted = false;
            CreatedAt = DateTime.UtcNow;
        }

        // Domain behavior
        public void MarkAsCompleted()
        {
            IsCompleted = true;
        }

        public void Update(string title, string? description)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title cannot be empty.", nameof(title));

            Title = title;
            Description = description;
        }
    }
}
