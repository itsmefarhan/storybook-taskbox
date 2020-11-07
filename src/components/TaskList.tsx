// src/components/TaskList.js

import React from "react";
import Task from "./Task";
import { connect } from "react-redux";
import { archiveTask, pinTask } from "../lib/redux";

interface Tasks {
  id: string;
  title: string;
  state: string;
}

export interface TaskListProps {
  loading: boolean;
  onPinTask: Function;
  onArchiveTask: Function;
  tasks: Array<Tasks>;
}

export function PureTaskList({
  loading,
  tasks,
  onPinTask,
  onArchiveTask,
}: TaskListProps) {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );
  if (loading) {
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <i className="fas fa-check fa-2x text-success"></i>
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    );
  }
  const tasksInOrder = [
    ...tasks.filter((t) => t.state === "TASK_PINNED"),
    ...tasks.filter((t) => t.state !== "TASK_PINNED"),
  ];
  return (
    <div className="list-items container">
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  );
}
PureTaskList.defaultProps = {
  loading: false,
};

export default connect(
  ({ tasks }: any) => ({
    tasks: tasks.filter(
      (t: any) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    ),
  }),
  (dispatch) => ({
    onArchiveTask: (id: any) => dispatch(archiveTask(id)),
    onPinTask: (id: any) => dispatch(pinTask(id)),
  })
)(PureTaskList);
