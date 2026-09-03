
using ChecktaskListproject.Models.DTOs;
using ChecktaskListproject.Models.Enums;
using ChecktaskListproject.Services;
using Microsoft.AspNetCore.Mvc;

namespace ChecktaskListproject.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;
    public TasksController(ITaskService taskService) => _taskService = taskService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetAll() => Ok(await _taskService.GetAllAsync());

    [HttpPost]
    public async Task<ActionResult<TaskDto>> Create([FromBody] CreateTaskDto dto)
    {
        var res = await _taskService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetAll), new { id = res.TaskId }, res);
    }

    [HttpPut("{taskId:guid}")]
    public async Task<ActionResult<TaskDto>> Update(Guid taskId, [FromBody] UpdateTaskDto dto)
    {
        var res = await _taskService.UpdateAsync(taskId, dto);
        return res == null ? NotFound() : Ok(res);
    }

    [HttpPatch("{taskId:guid}/status")]
    public async Task<ActionResult<TaskDto>> ChangeStatus(Guid taskId, [FromBody] PersonalTaskStatus status)
    {
        var res = await _taskService.ChangeStatusAsync(taskId, status);
        return res == null ? NotFound() : Ok(res);
    }

    [HttpDelete("{taskId:guid}")]
    public async Task<IActionResult> Delete(Guid taskId) =>
        await _taskService.DeleteAsync(taskId) ? NoContent() : NotFound();
}