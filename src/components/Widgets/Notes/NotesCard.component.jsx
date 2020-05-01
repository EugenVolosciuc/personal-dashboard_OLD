import React, { Component} from 'react'
import { Card, Empty, message, Spin, Row } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import AddNoteModal from './AddNoteModal.component'
import EditNoteModal from './EditNoteModal.component'
import { addNote, getNotes, deleteNote, updateNote } from '../../../store/actions/noteActions'
import { withCache } from '../../UtilityComponents'

class NotesCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editNoteModal: null,
            addNoteModal: false
        }
    }

    toggleAddModal = () => {
        this.setState({ addNoteModal: !this.state.addNoteModal })
    }

    toggleEditModal = title => {
        if (!title) {
            this.setState({ editNoteModal: null })
        } else {
            this.setState({ editNoteModal: title })
        }
    }

    handleAddNote = form => {
        let dataToUpdate = {
            ...form.getFieldsValue(),
            uid: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        if (dataToUpdate.textContent === undefined) {
            dataToUpdate.textContent = null
        }

        form.validateFields()
            .then(() => {
                try {
                    if (this.props.notes.some(note => note.title === dataToUpdate.title)) {
                        // eslint-disable-next-line
                        throw { message: 'A note with this title already exists' }
                    }
                    this.props.addNote(dataToUpdate)
                    this.toggleAddModal()
                    message.success('Note added successfully')
                } catch (error) {
                    message.error(error.message)
                }
            })
            .catch(error => {
                message.error("Please check the data you provided")
            })
    }

    handleUpdateNote = (uid, form, initialTitle) => {
        let dataToUpdate = {
            ...form.getFieldsValue(),
            updatedAt: new Date()
        }

        form.validateFields()
            .then(() => {
                try {
                    if (this.props.notes.some(note => note.title === dataToUpdate.title && dataToUpdate.title !== initialTitle)) {
                        // eslint-disable-next-line
                        throw { message: 'A note with this title already exists'}
                    }
                    this.props.updateNote(uid, { ...dataToUpdate })

                    this.toggleEditModal()
                    message.success('Note updated successfully')
                } catch (error) {
                    message.error(error.message)
                }
            })
            .catch(error => {
                message.error("Please check the data you provided")
            })
    }

    handleDeleteNote = uid => {
        this.props.deleteNote(uid)
            .then(() => {
                this.toggleEditModal()
                message.success('Note deleted successfully')
            })
            .catch(error => {
                message.error(error.message)
            })
    }

    render() {
        const { addNoteModal, editNoteModal } = this.state
        const { notes, isLoading } = this.props

        return (
            <>
                {addNoteModal &&
                    <AddNoteModal 
                        visible={addNoteModal}
                        handleCancel={this.toggleAddModal}
                        handleAdd={this.handleAddNote}/>}

                {editNoteModal && 
                    <EditNoteModal 
                        note={notes.find(note => note.title === editNoteModal) || {}}
                        visible={!_.isNull(editNoteModal)}
                        handleCancel={this.toggleEditModal}
                        handleUpdate={this.handleUpdateNote}
                        handleDelete={this.handleDeleteNote} />}

                <Card
                    className="widget"
                    title='Notes'
                    extra={<PlusOutlined onClick={() => this.toggleAddModal()} />}>
                        {
                            isLoading
                                ? <Row justify="center"><Spin /></Row>
                                : _.isEmpty(notes)
                                    ? <Empty />
                                    : notes.map(note => {
                                        return (
                                            <Card.Grid
                                                key={note.uid}
                                                style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}
                                                onClick={() => this.toggleEditModal(note.title)}
                                            >
                                                <span>{note.title}</span>
                                            </Card.Grid>
                                        )
                                    })
                        }
                </Card>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes.notes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNote: payload => dispatch(addNote(payload)),
        deleteNote: payload => dispatch(deleteNote(payload)),
        updateNote: (uid, payload) => dispatch(updateNote(uid, payload))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withCache(getNotes, 5, 'notes')(NotesCard))