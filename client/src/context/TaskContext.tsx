import { createContext, useReducer, ReactNode, Dispatch } from "react";

export interface Task {
  _id: string;
  name: string;
  description: string;
  dueDate: Date;
  createdAt: string;
}

export interface State {
  tasks: Task[];
}

export interface Action {
  type: "SET_TASKS" | "CREATE_TASK" | "DELETE_TASK";
  payload: Task[] | Task;
}

export const TasksContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

export const tasksReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        tasks: action.payload as Task[],
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

interface TasksContextProviderProps {
  children: ReactNode;
}

export const TasksContextProvider = ({
  children,
}: TasksContextProviderProps) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: [],
  });

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
