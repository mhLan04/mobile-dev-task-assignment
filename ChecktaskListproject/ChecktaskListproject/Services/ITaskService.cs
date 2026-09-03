using ChecktaskListproject.Models.DTOs;
using ChecktaskListproject.Models.Enums;

namespace ChecktaskListproject.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetAllAsync();
        Task<TaskDto?> GetByIdAsync(Guid taskId);
        Task<TaskDto> CreateAsync(CreateTaskDto dto);
        Task<TaskDto?> UpdateAsync(Guid taskId, UpdateTaskDto dto);
        Task<TaskDto?> ChangeStatusAsync(Guid taskId, PersonalTaskStatus status);
        Task<bool> DeleteAsync(Guid taskId);
    }
}
