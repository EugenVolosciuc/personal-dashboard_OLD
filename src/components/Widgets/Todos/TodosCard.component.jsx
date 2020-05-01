import React, { Component } from 'react'
import { Card, Empty, message, Spin, Row, List } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

import { getTodos, addTodo, deleteTodo, updateTodo } from '../../../store/actions/todoActions'
import { withCache } from '../../UtilityComponents'
import AddTodoModal from './AddTodoModal.component'
import TodoItem from './TodoItem.component'

class TodosCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAddTodoModal: false
        }
    }

    toggleAddModal = () => {
        this.setState({ showAddTodoModal: !this.state.showAddTodoModal })
    }

    handleAddTodo = form => {
        let dataToSend = {
            ...form.getFieldsValue(),
            done: false,
            uid: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        form.validateFields()
            .then(() => {
                try {
                    if (this.props.todos.some(todo => todo.title === dataToSend.title)) {
                        // eslint-disable-next-line
                        throw { message: 'A todo with this title already exists' }
                    }
                    this.props.addTodo(dataToSend)
                    this.toggleAddModal()
                    message.success('Todo added successfully')
                } catch (error) {
                    message.error(error.message)
                }
            })
            .catch(error => {
                message.error("Please check the data you provided")
            })
    }

    handleUpdateTodo = (uid, todoStatus) => {
        let dataToUpdate = {
            done: todoStatus,
            updatedAt: new Date()
        }

        try {
            this.props.updateTodo(uid, { ...dataToUpdate })
        } catch (error) {
            message.error(error.message)
        }
    }

    handleDeleteTodo = (event, uid) => {
        event.stopPropagation()
        this.props.deleteTodo(uid)
            .then(() => {
                message.success('Todo deleted successfully')
            })
            .catch(error => {
                message.error(error.message)
            })
    }

    renderTodos = todos => {
        if (_.isEmpty(todos)) {
            return <List.Item style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>No todos to show</List.Item>
        } else {
            return todos.map(todo => {
                return (
                    <TodoItem
                        todo={todo}
                        onClick={this.handleUpdateTodo}
                        key={todo.uid} />
                )
            })
        }
    }

    render() {
        const { showAddTodoModal } = this.state
        const { isLoading, todos } = this.props


        return (
            <>
                {showAddTodoModal &&
                    <AddTodoModal
                        visible={showAddTodoModal}
                        handleCancel={this.toggleAddModal}
                        handleAdd={this.handleAddTodo} />}
                <Card
                    className="widget"
                    title="Todos"
                    extra={<PlusOutlined onClick={() => this.toggleAddModal()} />}>
                    {
                        isLoading
                            ? <Row justify="center"><Spin /></Row>
                            : _.isEmpty(todos)
                                ? <Empty />
                                : <List
                                    size="small">
                                    {todos.map(todo => {
                                        return (
                                            <TodoItem
                                                todo={todo}
                                                onDelete={this.handleDeleteTodo}
                                                onUpdate={this.handleUpdateTodo}
                                                key={todo.uid} />
                                        )
                                    })}
                                </List>
                    }
                </Card>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todos.todos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTodo: payload => dispatch(addTodo(payload)),
        deleteTodo: payload => dispatch(deleteTodo(payload)),
        updateTodo: (uid, payload) => dispatch(updateTodo(uid, payload))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withCache(getTodos, 5, 'todos')(TodosCard))