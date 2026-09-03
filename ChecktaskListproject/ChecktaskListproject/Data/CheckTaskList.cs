using ChecktaskListproject.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChecktaskListproject.Data;

public class CheckTaskListContext : DbContext
{
    public CheckTaskListContext(DbContextOptions<CheckTaskListContext> options) : base(options) { }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<TaskItem>(entity =>
        {
            entity.HasKey(e => e.TaskId);
            entity.Property(e => e.TaskName).IsRequired().HasMaxLength(255);
            entity.Property(e => e.TaskType).IsRequired().HasMaxLength(100);
            entity.Property(e => e.TaskPriority).HasConversion<string>();
            entity.Property(e => e.Status).HasConversion<string>();
        });
    }
}