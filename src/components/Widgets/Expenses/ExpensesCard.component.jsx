import React, { Component } from 'react'
import { Card, Empty, message, Spin, Row } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid';

import EditExpenseModal from './EditExpenseModal.component'
import AddExpenseModal from './AddExpenseModal.component'
import { addExpense, getExpenses, deleteExpense, updateExpense } from '../../../store/actions/expenseActions'

class ExpensesCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editExpenseModal: null,
            addExpenseModal: false,
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        this.props.getExpenses()
            .then(() => {
                this.setState({ isLoading: false })
            })
            .catch(error => {
                message.error("Could not fetch expenses")
                this.setState({ isLoading: false })
            })
    }

    toggleAddModal = () => {
        this.setState({ addExpenseModal: !this.state.addExpenseModal })
    }

    toggleEditModal = (title) => {
        if (!title) {
            this.setState({ editExpenseModal: null })
        } else {
            this.setState({ editExpenseModal: title })
        }
    }

    handleAddExpense = (form) => {
        let dataToUpdate = {
            ...form.getFieldsValue(),
            uid: uuidv4()
        }

        dataToUpdate = this.checkIfVariable(form, dataToUpdate)
        form.validateFields()
            .then(() => {
                try {
                    if (this.props.expenses.some(expense => expense.title === dataToUpdate.title)) {
                        throw { message: 'An expense with this title already exists' }
                    }
                    this.props.addExpense(dataToUpdate)

                    this.toggleAddModal()
                    message.success('Expense added successfully')

                } catch (error) {
                    message.error(error.message)
                }
            })
            .catch(error => {
                message.error("Please check the data you provided")
            })
    }

    handleUpdateExpense = (uid, form, initialTitle) => {
        let dataToUpdate = {
            ...form.getFieldsValue()
        }

        dataToUpdate = this.checkIfVariable(form, dataToUpdate)

        form.validateFields()
            .then(() => {
                try {
                    if (this.props.expenses.some(expense => expense.title === dataToUpdate.title && dataToUpdate.title !== initialTitle)) {
                        throw { message: 'An expense with this title already exists' }
                    }
                    this.props.updateExpense(uid, { ...dataToUpdate })

                    this.toggleEditModal()
                    message.success('Expense updated successfully')
                } catch (error) {
                    message.error(error.message)
                }
            })
            .catch(error => {
                message.error("Please check the data you provided")
            })
    }

    handleDeleteExpense = uid => {
        console.log("UID", uid)
        this.props.deleteExpense(uid)
            .then(() => {
                this.toggleEditModal()
                message.success('Expense deleted successfully')
            })
            .catch(error => {
                message.error(error.message)
            })
    }

    checkIfVariable = (form, dataToUpdate) => {
        if (_.isNull(form.getFieldValue('amount')) || form.getFieldValue('amountVariable') === true) { // if amount is variable
            dataToUpdate.amount = 'variable'
        }
        dataToUpdate = _.omit(dataToUpdate, 'amountVariable')

        return dataToUpdate
    }

    render() {
        const { addExpenseModal, editExpenseModal, isLoading } = this.state
        const { expenses } = this.props

        return (
            <div>
                {addExpenseModal &&
                    <AddExpenseModal
                        visible={addExpenseModal}
                        handleCancel={this.toggleAddModal}
                        handleAdd={this.handleAddExpense} />}

                {editExpenseModal &&
                    <EditExpenseModal
                        expense={expenses.find(expense => expense.title === editExpenseModal) || {}}
                        visible={!_.isNull(editExpenseModal)}
                        handleCancel={this.toggleEditModal}
                        handleUpdate={this.handleUpdateExpense}
                        handleDelete={this.handleDeleteExpense} />}

                <Card
                    title="Monthly expenses"
                    style={{ width: '300px' }}
                    extra={<PlusOutlined onClick={() => this.toggleAddModal()} />}
                >
                    {
                        isLoading
                            ? <Row justify="center"><Spin /></Row>
                            : _.isEmpty(expenses)
                                ? <Empty />
                                : expenses.map(expense => {
                                    return (
                                        <Card.Grid
                                            key={expense.uid}
                                            style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                        >
                                            <span>{expense.title}</span>
                                            <EditOutlined onClick={() => this.toggleEditModal(expense.title)} />
                                        </Card.Grid>
                                    )
                                })
                    }
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        expenses: state.expenses.expenses
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getExpenses: () => dispatch(getExpenses()),
        addExpense: payload => dispatch(addExpense(payload)),
        deleteExpense: payload => dispatch(deleteExpense(payload)),
        updateExpense: (uid, payload) => dispatch(updateExpense(uid, payload))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpensesCard)