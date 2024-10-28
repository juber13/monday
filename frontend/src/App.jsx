// App.js
import { useEffect, useState } from "react";
import axios from "axios";
import Todos from "./components/todos";

function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedTodo, setSelectedTodo] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchList = async () => {
    try {
      const res = await axios.get("http://localhost:3000");
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const addList = async () => {
    try {
      const res = await axios.post("http://localhost:3000/add", {
        name: inputValue,
        id: data.length + 1,
      });
      setData(res.data.data);
      setInputValue("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodos = async (id) => {
    try {
      const res = await axios.delete("http://localhost:3000/delete", {
        data: { id },
      });
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = (id) => {
    setIsEditMode(true);
    const todoToUpdate = data.find((item) => item.id === id);
    setSelectedTodo(todoToUpdate);
    setInputValue(todoToUpdate.name);
  };

  const updateList = async () => {
    try {
      const res = await axios.patch("http://localhost:3000/update", {
        id: selectedTodo.id,
        name: inputValue,
      });
      setData(res.data.data);
      setIsEditMode(false);
      setSelectedTodo({});
      setInputValue("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input
        type='text'
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={isEditMode ? "Update" : "Enter your todo"}
        value={inputValue}
        style={{ padding: "0.6rem" }}
      />
      <button onClick={isEditMode ? updateList : addList}>
        {isEditMode ? "Save" : "Add Todos"}
      </button>
      <Todos todos={data} handleDelete={deleteTodos} updateTodo={updateTodo} />
    </>
  );
}

export default App;
  