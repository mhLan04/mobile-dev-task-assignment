import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TaskItem } from "../component/TaskItem";
import { PersonalTaskStatus, Task, TaskPriority } from "../models/TaskModel";
import { useTaskViewModel } from "../viewmodels/useTaskViewModel";

const TASK_TYPES = ["Personal", "Work", "Study", "Others"];

const PRIORITY_OPTIONS: { label: string; value: TaskPriority }[] = [
  { label: "Low", value: TaskPriority.Low },
  { label: "Medium", value: TaskPriority.Medium },
  { label: "High", value: TaskPriority.High },
];

const STATUS_OPTIONS: { label: string; value: PersonalTaskStatus }[] = [
  { label: "To Do", value: PersonalTaskStatus.Todo },
  { label: "In Progress", value: PersonalTaskStatus.InProgress },
  { label: "Completed", value: PersonalTaskStatus.Completed },
];

const SelectChip = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.chip, selected && styles.chipSelected]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export const HomeScreen = () => {
  const { tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask } =
    useTaskViewModel();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskType, setTaskType] = useState(TASK_TYPES[0]);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<PersonalTaskStatus>(
    PersonalTaskStatus.Todo,
  );
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority>(
    TaskPriority.Medium,
  );

  const resetAddForm = () => {
    setTaskName("");
    setTaskDescription("");
    setTaskType(TASK_TYPES[0]);
    setIsAddModalOpen(false);
  };

  const handleCreateTask = async () => {
    if (!taskName.trim()) return;
    await addTask({
      taskName,
      taskDescription,
      taskType,
      taskPriority: TaskPriority.Medium,
      status: PersonalTaskStatus.Todo,
    });
    resetAddForm();
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;
    await updateTask(editingTask.taskId, {
      status: selectedStatus,
      taskPriority: selectedPriority,
      taskDueDate: editingTask.taskDueDate ?? undefined,
    });
    setEditingTask(null);
  };

  if (loading && tasks.length === 0) {
    return <ActivityIndicator style={styles.center} size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>My tasks</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.taskId}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onDelete={() => deleteTask(item.taskId)}
            onEdit={(taskToEdit) => {
              setEditingTask(taskToEdit);
              setSelectedStatus(taskToEdit.status);
              setSelectedPriority(taskToEdit.taskPriority);
            }}
            onStatusChange={(newStatus) =>
              updateTask(item.taskId, {
                status: newStatus as PersonalTaskStatus,
                taskPriority: item.taskPriority,
                taskDueDate: item.taskDueDate ?? undefined,
              })
            }
          />
        )}
        onRefresh={fetchTasks}
        refreshing={loading}
      />

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => setIsAddModalOpen(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* MODAL THÊM TASK */}
      <Modal visible={isAddModalOpen} animationType="slide" transparent>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add new task</Text>
              <TouchableOpacity onPress={() => setIsAddModalOpen(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Task name</Text>
            <TextInput
              placeholder="e.g. Buy groceries"
              placeholderTextColor="#AAA"
              style={styles.input}
              value={taskName}
              onChangeText={setTaskName}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Optional details"
              placeholderTextColor="#AAA"
              style={[styles.input, styles.textArea]}
              value={taskDescription}
              onChangeText={setTaskDescription}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>Task type</Text>
            <View style={styles.chipRow}>
              {TASK_TYPES.map((type) => (
                <SelectChip
                  key={type}
                  label={type}
                  selected={taskType === type}
                  onPress={() => setTaskType(type)}
                />
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setIsAddModalOpen(false)}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleCreateTask}
              >
                <Text style={styles.primaryButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal visible={!!editingTask} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle} numberOfLines={1}>
                Edit: {editingTask?.taskName}
              </Text>
              <TouchableOpacity onPress={() => setEditingTask(null)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Priority</Text>
            <View style={styles.chipRow}>
              {PRIORITY_OPTIONS.map((p) => (
                <SelectChip
                  key={p.value}
                  label={p.label}
                  selected={selectedPriority === p.value}
                  onPress={() => setSelectedPriority(p.value)}
                />
              ))}
            </View>

            <Text style={styles.label}>Status</Text>
            <View style={styles.chipRow}>
              {STATUS_OPTIONS.map((s) => (
                <SelectChip
                  key={s.value}
                  label={s.label}
                  selected={selectedStatus === s.value}
                  onPress={() => setSelectedStatus(s.value)}
                />
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setEditingTask(null)}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleUpdateTask}
              >
                <Text style={styles.primaryButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  center: { flex: 1, justifyContent: "center" },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0e0d0d",
    marginBottom: 16,
  },
  error: {
    color: "#DC2626",
    backgroundColor: "#FDECEC",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 100,
    borderRadius: 14,
    padding: 12,
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  fabText: { color: "#fff", fontSize: 28, fontWeight: "600", marginTop: -2 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 32,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#1A1A1A", flex: 1 },
  closeIcon: { fontSize: 18, color: "#888", paddingLeft: 12 },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E2E2",
    backgroundColor: "#FAFAFA",
    padding: 12,
    borderRadius: 10,
    fontSize: 14,
    color: "#1A1A1A",
  },
  textArea: { height: 80, textAlignVertical: "top" },

  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F1F1F1",
  },
  chipSelected: { backgroundColor: "#007AFF" },
  chipText: { fontSize: 13, fontWeight: "600", color: "#555" },
  chipTextSelected: { color: "#fff" },

  modalActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#F1F1F1",
  },
  secondaryButtonText: { color: "#555", fontWeight: "600" },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#007AFF",
  },
  primaryButtonText: { color: "#fff", fontWeight: "700" },
});
