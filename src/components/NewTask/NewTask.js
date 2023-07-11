import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";
import { useRef } from "react";

const NewTask = props => {
  const { isLoading, error, sendRequest } = useHttp();

  const inputRef = useRef();

  const applyData = data => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: inputRef.current.value };
    console.log(createdTask);
    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async taskText => {
    const requestConfig = {
      url: "https://react-http-1d49d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: {
        "Content-Type": "application/json",
      },
    };
    sendRequest(requestConfig, applyData);
  };

  return (
    <Section>
      <TaskForm
        ref={inputRef}
        onEnterTask={enterTaskHandler}
        loading={isLoading}
      />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
