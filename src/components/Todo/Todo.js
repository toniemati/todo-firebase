import { ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import './Todo.css';

const Todo = ({ todo }) => {
  return (
    <ListItem>
      <ListItemText primary={todo} />
    </ListItem>
  )
}

export default Todo
