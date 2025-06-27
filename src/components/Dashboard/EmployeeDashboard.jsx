import React from "react";
import Header from "../other/Header";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";

// const EmployeeDashboard = (props) => {
//   return (
//     <div className="p-10 bg-[#1C1C1C] h-screen">
//       <Header changeUser={props.changeUser} data={props.data} />
//       <TaskListNumbers data={props.data} />
//       <TaskList data={props.data} />
//     </div>
//   );
// };

const EmployeeDashboard = ({ changeUser, data }) => {
  const [employeeData, setEmployeeData] = React.useState(data);

  const updateTaskStatus = (taskIndex, status) => {
    const updatedTasks = employeeData.tasks.map((task, index) => {
      if (index === taskIndex) {
        return {
          ...task,
          active: status === "active",
          newTask: false,
          completed: status === "completed",
          failed: status === "failed",
        };
      }
      return task;
    });

    // update counts
    const taskCounts = {
      active: updatedTasks.filter((t) => t.active).length,
      newTask: updatedTasks.filter((t) => t.newTask).length,
      completed: updatedTasks.filter((t) => t.completed).length,
      failed: updatedTasks.filter((t) => t.failed).length,
    };

    const updatedData = { ...employeeData, tasks: updatedTasks, taskCounts };
    setEmployeeData(updatedData);
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ role: "employee", data: updatedData })
    );
  };

  return (
    <div className="p-6">
      <Header changeUser={changeUser} data={employeeData} />
      <TaskListNumbers data={employeeData} />
      <TaskList data={employeeData} updateTaskStatus={updateTaskStatus} />
    </div>
  );
};

export default EmployeeDashboard;
