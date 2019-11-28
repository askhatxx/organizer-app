import React, {Component} from 'react';

export default class NoteAdd extends Component {
    state = {
        formTitle: '',
        formText: '',
        showForm: false
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newId = Math.floor(Math.random() * 1e8).toString(16);
        this.props.addNote({
            title: this.state.formTitle, 
            text: this.state.formText, 
            flag: false, 
            color: 'default',
            id: newId
        });
        this.closeForm();
    }

    closeForm = () => {
        this.setState({
            formTitle: '',
            formText: '',
            showForm: false
        })
    }
    
    renderForm() {
        return (
            <div className='box-notes-add'>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name='formTitle'
                        type='text'
                        placeholder='Title'
                        value={this.state.formTitle}
                        onChange={this.handleChange}
                    />
                    <textarea
                        name='formText'
                        placeholder='Text'
                        value={this.state.formText}
                        onChange={this.handleChange}
                    />
                    <div className='note-add-form-button'>
                        <button type='submit'>Add</button>
                        <button type='button' onClick={this.closeForm}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    render() {
        return (
            <div className='note-add'>
                <button onClick={this.toggleForm}><i className="fas fa-plus"></i> New</button>
                {this.state.showForm && this.renderForm()}
            </div>
        )
    }
}