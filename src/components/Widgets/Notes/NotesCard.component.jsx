import React, { Component} from 'react'
import { Card, Empty, message, Spin, Row } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import AddNoteModal from './AddNoteModal.component'
import NoteDetailsModal from './NoteDetailsModal.component'
import { addNote, getNotes, deleteNote, updateNote } from '../../../store/actions/noteActions'
import { withCache } from '../../UtilityComponents'

class NotesCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noteDetailsModal: null,
            addNoteModal: false
        }
    }

    toggleAddModal = () => {
        this.setState({ addNoteModal: !this.state.addNoteModal })
    }

    toggleDetailsModal = title => {
        if (!title) {
            this.setState({ noteDetailsModal: null })
        } else {
            this.setState({ noteDetailsModal: title })
        }
    }

    handleAddNote = form => {
        let dataToUpdate = {
            ...form.getFieldsValue(),
            uid: uuidv4(),
            createdAt: new Date(),
            updatedAt: null
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

                    this.toggleDetailsModal()
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
                this.toggleDetailsModal()
                message.success('Note deleted successfully')
            })
            .catch(error => {
                message.error(error.message)
            })
    }

    render() {
        const { addNoteModal, noteDetailsModal } = this.state
        const { notes, isLoading } = this.props

        return (
            <div>
                {addNoteModal &&
                    <AddNoteModal 
                        visible={addNoteModal}
                        handleCancel={this.toggleAddModal}
                        handleAdd={this.handleAddNote}/>}

                {noteDetailsModal && 
                    <NoteDetailsModal 
                        note={notes.find(note => note.title === noteDetailsModal) || {}}
                        visible={!_.isNull(noteDetailsModal)}
                        handleCancel={this.toggleDetailsModal}
                        handleUpdate={this.handleUpdateNote}
                        handleDelete={this.handleDeleteNote} />}

                <Card
                    title='Notes'
                    style={{width: '300px'}}
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
                                                onClick={() => this.toggleDetailsModal(note.title)}
                                            >
                                                <span>{note.title}</span>
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