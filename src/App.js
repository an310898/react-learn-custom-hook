import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const applyData = data => {
    const arrData = [];
    for (const key in data) {
      arrData.push({
        id: key,
        text: data[key].text,
      });
    }
    setTasks(arrData);
  };

  const httpRequest = useHttp(
    {
      url: "https://react-http-1d49d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
    },
    applyData
  );

  useEffect(() => {
    httpRequest.sendRequest();
  }, []);

  const taskAddHandler = task => {
    setTasks(prevTasks => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={httpRequest.isLoading}
        error={httpRequest.error}
        onFetch={httpRequest.sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
