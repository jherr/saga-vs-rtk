import React, { useEffect, useRef, useCallback } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";

import {
  store,
  selectTodos,
  fetchTodos,
  toggleTodo,
  removeTodo,
  addTodo,
} from "./lib/store";

function TodoApp() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const textRef = useRef<HTMLInputElement>(null);
  const onAdd = useCallback(() => {
    dispatch(addTodo(textRef.current!.value));
    textRef.current!.value = "";
  }, [dispatch]);

  return (
    <div className="App">
      <div className="todos">
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => dispatch(toggleTodo(todo))}
              />
              <span>{todo.text}</span>
            </div>
            <button onClick={() => dispatch(removeTodo(todo))}>Delete</button>
          </React.Fragment>
        ))}
      </div>
      <div className="add">
        <input type="text" ref={textRef} />
        <button onClick={onAdd}>Add</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

export default App;
