using ChecktaskListproject.Models.Enums;

namespace ChecktaskListproject.Models.Entities
{
    public class TaskItem
    {
        public Guid TaskId { get; set; } = Guid.NewGuid();
        public string TaskName { get; set; } = string.Empty;
        public string TaskDescription { get; set; }
        public string TaskType { get; set; }
        public DateTime? TaskDueDate { get; set; }
        public TaskPriority TaskPriority { get; set; } = TaskPriority.Medium;
        public PersonalTaskStatus Status { get; set; } = PersonalTaskStatus.Todo;
        public string? TaskCategory { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;


    }
}
