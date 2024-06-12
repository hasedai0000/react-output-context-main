import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/* styles */
import styles from "./styles.module.css";
import { useState } from "react";
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data";

export const TodoTemplate = () => {
  const [addInputVal, setAddInputVal] = useState("");
  const [searchInputVal, setSearchInputVal] = useState("");
  const [todoList, setTodoList] = useState(INIT_TODO_LIST);
  const [uniqueId, setUniqueId] = useState(INIT_UNIQUE_ID);

  const handleAddTodo = (e) => {
    if (e.key === "Enter" && addInputVal !== "") {
      const nextUniqueId = uniqueId + 1;
      const newTodo = [
        ...todoList,
        {
          id: nextUniqueId,
          title: addInputVal,
        },
      ];
      setTodoList(newTodo);

      setUniqueId(nextUniqueId);
      setAddInputVal("");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      <section className={styles.common}>
        <h2 className={styles.subTitle}>ADD TODO</h2>
        <input
          className={styles.input}
          type="text"
          placeholder="New Todo"
          value={addInputVal}
          onChange={(e) => setAddInputVal(e.target.value)}
          onKeyDown={handleAddTodo}
        />
      </section>
      <section className={styles.common}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search Keyword"
          value={searchInputVal}
          onChange={(e) => setSearchInputVal(e.target.value)}
        />
      </section>
      <section className={styles.common}>
        <ul className={styles.list}>
          {todoList
            .filter((todo) => {
              const isMatch = todo.title.indexOf(searchInputVal) !== -1;
              return isMatch;
            })
            .map((todo) => {
              return (
                <li className={styles.todo} key={todo.id}>
                  <span className={styles.task}>{todo.title}</span>
                  <div className={styles.far}>
                    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                  </div>
                </li>
              );
            })}
        </ul>
      </section>
    </div>
  );
};
