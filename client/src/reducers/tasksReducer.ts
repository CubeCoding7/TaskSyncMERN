import { State, Action, Task } from "../context/TaskContext"; // Adjust import paths as needed

export const tasksReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        tasks: Array.isArray(action.payload) ? (action.payload as Task[]) : [], // Ensure it's an array
      };
    case "CREATE_TASK":
      return {
        tasks: [action.payload as Task, ...state.tasks],
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter(
          (task) => task._id !== (action.payload as Task)._id
        ),
      };
    default:
      return state;
  }
};
