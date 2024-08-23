import { TasksContext } from "../context/TaskContext";
import { useContext } from "react";
import { State, Action } from "../context/TaskContext";

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw Error("useTasksContext must be used inside a TasksContextProvider");
  }

  return context as { state: State; dispatch: React.Dispatch<Action> };
};
