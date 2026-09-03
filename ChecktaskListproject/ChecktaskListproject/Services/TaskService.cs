using ChecktaskListproject.Data;
using ChecktaskListproject.Models.DTOs;
using ChecktaskListproject.Models.Entities;
using ChecktaskListproject.Models.Enums;
using ChecktaskListproject.Services;
using Microsoft.EntityFrameworkCore;

namespace ChecktaskListproject.Services;

public class TaskService : ITaskService
{
    private readonly CheckTaskListContext _context;
    public TaskService(CheckTaskListContext context) => _context = context;

    public async Task<IEnumerable<TaskDto>> GetAllAsync() =>
        await _context.Tasks.AsNoTracking().OrderByDescending(t => t.CreatedAt).Select(t => MapToDto(t)).ToListAsync();

    public async Task<TaskDto?> GetByIdAsync(Guid taskId)
    {
        var task = await _context.Tasks.FindAsync(taskId);
        return task == null ? null : MapToDto(task);
    }

    public async Task<TaskDto> CreateAsync(CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            TaskId = Guid.NewGuid(),
            TaskName = dto.TaskName,
            TaskDescription = dto.TaskDescription,
            TaskType = dto.TaskType,
            TaskDueDate = dto.TaskDueDate,
            TaskPriority = dto.TaskPriority,
            Status = PersonalTaskStatus.Todo,
            TaskCategory = dto.TaskCategory,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return MapToDto(task);
    }

    public async Task<TaskDto?> UpdateAsync(Guid taskId, UpdateTaskDto dto)
    {
        var task = await _context.Tasks.FindAsync(taskId);
        if (task == null) return null;

        task.TaskPriority = dto.TaskPriority; task.Status = dto.Status;
        task.TaskDueDate = dto.TaskDueDate; task.UpdatedAt = DateTime.UtcNow;
        task.Status = dto.Status;
        await _context.SaveChangesAsync();
        return MapToDto(task);
    }

    public async Task<TaskDto?> ChangeStatusAsync(Guid taskId, PersonalTaskStatus status)
    {
        var task = await _context.Tasks.FindAsync(taskId);
        if (task == null) return null;

        task.Status = status; task.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
        return MapToDto(task);
    }

    public async Task<bool> DeleteAsync(Guid taskId)
    {
        var task = await _context.Tasks.FindAsync(taskId);
        if (task == null) return false;

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
        return true;
    }

    private static TaskDto MapToDto(TaskItem t) => new(
        t.TaskId, t.TaskName, t.TaskDescription, t.TaskType,
        t.TaskDueDate, t.TaskPriority, t.Status, t.TaskCategory,
        t.CreatedAt, t.UpdatedAt);
}