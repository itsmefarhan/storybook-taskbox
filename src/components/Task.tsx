import React from "react";

export interface TaskProps {
  task: {
    id: string;
    title: string;
    state: string;
  };
  onArchiveTask: Function;
  onPinTask: Function;
}

export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}: TaskProps) {
  return (
    <div
      className="form-check mt-3"
      style={{ maxWidth: "600px", margin: "0 auto" }}
    >
      <input
        className="form-check-input"
        type="checkbox"
        defaultChecked={state === "TASK_ARCHIVED"}
        // disabled={true}
        name="checked"
        onClick={() => onArchiveTask(id)}
      />

      <label htmlFor="checkbox" className="form-check-label">
        {title}
      </label>
      <span
        className="float-right"
        onClick={(event) => event.stopPropagation()}
      >
        {state !== "TASK_ARCHIVED" && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={() => onPinTask(id)}>
            {state === "TASK_PINNED" ? (
              <i className="fas fa-star text-primary"></i>
            ) : (
              <i className="far fa-star text-primary"></i>
            )}
          </a>
        )}
      </span>
    </div>
  );
}
