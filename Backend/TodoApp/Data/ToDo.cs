﻿namespace TodoApp.Data
{
    public class Todo
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
        //public DateTime CreatedDate { get; set; }
        //public DateTime CompletedDate { get; set; }
    }
}
