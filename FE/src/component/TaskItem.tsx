import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PersonalTaskStatus, Task, TaskPriority } from "../models/TaskModel";

interface TaskItemProps {
  task: Task;
  onDelete?: (id: string) => void;
  onEdit?: (task: Task) => void;
  onStatusChange?: (newStatus: PersonalTaskStatus) => void;
}

const getStatusText = (status: PersonalTaskStatus) => {
  switch (status) {
    case PersonalTaskStatus.Todo:
      return "To Do";
    case PersonalTaskStatus.InProgress:
      return "In Progress";
    case PersonalTaskStatus.Completed:
      return "Completed";
    case PersonalTaskStatus.Cancelled:
      return "Cancelled";
    default:
      return "Unknown";
  }
};

const getStatusColor = (status: PersonalTaskStatus) => {
  switch (status) {
    case PersonalTaskStatus.Todo:
      return { bg: "#EAF1FF", text: "#2563EB" };
    case PersonalTaskStatus.InProgress:
      return { bg: "#FFF4E0", text: "#D97706" };
    case PersonalTaskStatus.Completed:
      return { bg: "#E7F8EE", text: "#16A34A" };
    case PersonalTaskStatus.Cancelled:
      return { bg: "#FDECEC", text: "#DC2626" };
    default:
      return { bg: "#F1F1F1", text: "#666" };
  }
};

const getPriorityText = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.Low:
      return "Low";
    case TaskPriority.Medium:
      return "Medium";
    case TaskPriority.High:
      return "High";
    default:
      return "Normal";
  }
};

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.Low:
      return { bg: "#EFFAF1", text: "#2E9E4F" };
    case TaskPriority.Medium:
      return { bg: "#FFF7E0", text: "#B7791F" };
    case TaskPriority.High:
      return { bg: "#FDECEC", text: "#C0392B" };
    default:
      return { bg: "#F1F1F1", text: "#666" };
  }
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onEdit,
}) => {
  const statusColor = getStatusColor(task.status);
  const priorityColor = getPriorityColor(task.taskPriority);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.infoContainer}
        activeOpacity={0.7}
        onPress={() => onEdit?.(task)}
      >
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {task.taskName}
          </Text>

          {onDelete && (
            <TouchableOpacity
              style={styles.deleteButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              onPress={() => onDelete(task.taskId)}
            >
              <Text style={styles.deleteText}>delete</Text>
            </TouchableOpacity>
          )}
        </View>

        {task.taskType ? (
          <Text style={styles.typeBadge}>Type :{task.taskType}</Text>
        ) : null}

        {task.taskDescription ? (
          <Text style={styles.description} numberOfLines={2}>
            {" "}
            Description : {task.taskDescription}
          </Text>
        ) : null}

        <View style={styles.metaRow}>
          <View style={[styles.badge, { backgroundColor: statusColor.bg }]}>
            <Text style={[styles.badgeText, { color: statusColor.text }]}>
              {getStatusText(task.status)}
            </Text>
          </View>

          <View style={[styles.badge, { backgroundColor: priorityColor.bg }]}>
            <Text style={[styles.badgeText, { color: priorityColor.text }]}>
              {getPriorityText(task.taskPriority)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#e5dede",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  infoContainer: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    flex: 1,
    marginRight: 8,
  },
  typeBadge: {
    fontSize: 12,
    color: "#0ab42c",
    fontWeight: "600",
    marginTop: 4,
  },
  description: {
    color: "#171616",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#FDECEC",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  deleteText: {
    color: "#DC2626",
    fontWeight: "600",
    fontSize: 12,
  },
});
