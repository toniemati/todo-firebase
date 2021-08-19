import { ListItem, ListItemText, makeStyles, Modal } from '@material-ui/core'
import React, { useState } from 'react'
import './Todo.css';
import db from '../../firebase';
import { Delete } from '@material-ui/icons';

const useStyle = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Todo = ({ todo }) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(todo?.text);

  const updateTodo = () => {
    db.collection('todos').doc(todo.id).set({
      text: input
    }, { merge: true });

    setOpen(false);
  }

  return (
    <div className="todo">
    <Modal
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className={classes.paper}>
        <h1>i am a modal</h1>
        <input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
        <button onClick={() => updateTodo()}>update</button>
        <button onClick={() => setOpen(false)}>close</button>
      </div> 
    </Modal>
    <ListItem>
      <ListItemText primary={todo.text} />
      <button onClick={() => setOpen(true)}>Edit</button>
      <Delete onClick={() => db.collection('todos').doc(todo.id).delete()} />
    </ListItem>
    </div>
  )
}

export default Todo
