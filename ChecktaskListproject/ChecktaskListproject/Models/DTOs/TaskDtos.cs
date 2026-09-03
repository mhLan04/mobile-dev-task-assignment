using ChecktaskListproject.Models.Enums;
using ChecktaskListproject.Models.Entities;

namespace ChecktaskListproject.Models.DTOs;

public record CreateTaskDto(
    string TaskName,
    string? TaskDescription,
    string TaskType,
    DateTime? TaskDueDate,
    TaskPriority TaskPriority,
    PersonalTaskStatus Status,
    string? TaskCategory

);

public record UpdateTaskDto(
    DateTime? TaskDueDate,
    TaskPriority TaskPriority,
    PersonalTaskStatus Status
);

public record TaskDto(
    Guid TaskId,
    string TaskName,
    string? TaskDescription,
    string TaskType,
    DateTime? TaskDueDate,
    TaskPriority TaskPriority,
    PersonalTaskStatus Status,
    string? TaskCategory,
    DateTime CreatedAt,
    DateTime UpdatedAt
);
