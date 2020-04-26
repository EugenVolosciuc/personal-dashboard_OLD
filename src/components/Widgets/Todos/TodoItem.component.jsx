import React, { useState } from 'react'
import { List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [todoIsDone, setTodoIsdone] = useState(todo.done)

    const handleChange = () => {
        onUpdate(todo.uid, !todoIsDone)
        setTodoIsdone(!todoIsDone)
    }

    return (
        <List.Item
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
            onClick={handleChange}
            className="show-on-hover">
            <span style={todoIsDone ? { textDecoration: 'line-through' } : null}>{todo.title}</span>
            <DeleteOutlined onClick={(event) => onDelete(event, todo.uid)} />
        </List.Item>
    )
}

export default TodoItem