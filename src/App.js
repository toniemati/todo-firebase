import { Button, FormControl, InputLabel, Input, List } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Todo from './components/Todo/Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //* when the app load, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //* this code here... codes when app loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {

      console.log(snapshot.docs[0].data());

      setTodos(snapshot.docs.map((doc) => doc.data('todo').todo));
    });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input) return;

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    // setTodos([...todos, input]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>Todo with react and firebase💙🔥</h1>

      <form onSubmit={addTodo}>
        <FormControl>
          <InputLabel>Write a todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>
        <Button disabled={!input} variant="contained" color="primary" type="submit">AddTodo</Button>
      </form>

      <List>
        {todos.map((todo) => (
          <Todo key={todo} todo={todo} />
        ))}
      </List>
    </div>
  );
}

export default App;
