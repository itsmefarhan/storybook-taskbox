import { createStore } from "redux";

export const actions = {
  ARCHIVE_TASK: "ARCHIVE_TASK",
  PIN_TASK: "PIN_TASK",
};

export interface State {
  tasks: Array<{
    id: string;
    title: string;
    state: string;
  }>;
}

export const archiveTask = (id: any) => ({ type: actions.ARCHIVE_TASK, id });
export const pinTask = (id: any) => ({ type: actions.PIN_TASK, id });

export const reducer = (state: State | any, action: any) => {
  console.log(state, action);
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task: any) =>
          task.id === action.id ? { ...task, state: "TASK_ARCHIVED" } : task
        ),
      };
    case actions.PIN_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task: any) =>
          task.id === action.id ? { ...task, state: "TASK_PINNED" } : task
        ),
      };
    default:
      return state;
  }
};

const defaultTasks = [
  { id: "1", title: "Something", state: "TASK_INBOX" },
  { id: "2", title: "Something more", state: "TASK_INBOX" },
  { id: "3", title: "Something else", state: "TASK_INBOX" },
  { id: "4", title: "Something again", state: "TASK_INBOX" },
];

export default createStore(reducer, { tasks: defaultTasks });
