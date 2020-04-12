import React, { Component } from 'react'
import { Card, Empty, message, Spin, Row } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import AddExpenseModal from './AddExpenseModal.component'
import ExpenseDetailsModal from './ExpenseDetailsModal.component'
import { addExpense, getExpenses, deleteExpense, updateExpense } from '../../../store/actions/expenseActions'
import { withCache } from '../../UtilityComponents'

class ExpensesCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addExpenseModal: false,
            expenseDetailsModal: null
        }
    }

    toggleAddModal = () => {
        this.setState({ addExpenseModal: !this.state.addExpenseModal })
    }

    toggleDetailsModal = title => {
        if (!title) {
            this.setState({ expenseDetailsModal: null })
        } else {
            this.setState({ expenseDetailsModal: title })
        }
    }

    handleAddExpense = form => {
        let dataToUpdate = {
            ...form.getFieldsValue(),
            uid: uuidv4()
        }

        dataToUpdate = this.checkIfVariable(form, dataToUpdate)
        form.validateFields()
            .then(() => {
                try {
                    if (this.props.expenses.some(expense => expense.title === dataToUpdate.title)) {
                        // eslint-disable-next-line
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
                        // eslint-disable-next-line
                        throw { message: 'An expense with this title already exists' }
                    }
                    this.props.updateExpense(uid, { ...dataToUpdate })

                    this.toggleDetailsModal()
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
        this.props.deleteExpense(uid)
            .then(() => {
                this.toggleDetailsModal()
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
        const { addExpenseModal, expenseDetailsModal } = this.state
        const { expenses, isLoading } = this.props

        return (
            <div>
                {expenseDetailsModal &&
                    <ExpenseDetailsModal 
                        expense={expenses.find(expense => expense.title === expenseDetailsModal) || {}}
                        visible={!_.isNull(expenseDetailsModal)}
                        handleCancel={this.toggleDetailsModal}
                        handleUpdate={this.handleUpdateExpense}
                        handleDelete={this.handleDeleteExpense} />}
                {addExpenseModal &&
                    <AddExpenseModal
                        visible={addExpenseModal}
                        handleCancel={this.toggleAddModal}
                        handleAdd={this.handleAddExpense} />}
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
                                            onClick={() => this.toggleDetailsModal(expense.title)}
                                        >
                                            <span>{expense.title}</span>
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
        addExpense: payload => dispatch(addExpense(payload)),
        deleteExpense: payload => dispatch(deleteExpense(payload)),
        updateExpense: (uid, payload) => dispatch(updateExpense(uid, payload))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withCache(getExpenses, 5, 'expenses', true)(ExpensesCard))