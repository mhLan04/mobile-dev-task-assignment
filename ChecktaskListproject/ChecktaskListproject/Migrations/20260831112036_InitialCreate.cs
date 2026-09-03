using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChecktaskListproject.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    TaskId = table.Column<Guid>(type: "uuid", nullable: false),
                    TaskName = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    TaskDescription = table.Column<string>(type: "text", nullable: false),
                    TaskType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    TaskDueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    TaskPriority = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    TaskCategory = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.TaskId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tasks");
        }
    }
}
