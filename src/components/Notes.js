import React, {Component} from 'react';

export default class Notes extends Component {
    state = {
        formTitle: '',
        formText: '',
        showForm: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addNote({title: this.state.formTitle, text: this.state.formText});
        this.setState({
            formTitle: '',
            formText: '',
            showForm: false
        });
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
                    <button
                        type='submit'
                    >
                        Send
                    </button>
                </form>
            </div>
        )
    }
    
    renderNoteTitleOptions(index) {
        return <span onClick={() => this.props.removeNote(index)}>del</span>
    }
    
    renderNotes(notes) {
        const notesList = notes.map((item, index) => {
            const {title, text} = item;
            const options = this.renderNoteTitleOptions(index);
            let clazz = 'note';

            if (title.length > 200 || text.length > 200) {
                clazz += ' long';
            }

            return (
                <div key={index} className={clazz}>
                    <div className='note-inner'>
                        <div className='note-title'>{title} {options}</div>
                        <div className='note-text'>{text}</div>
                    </div>
                </div>
            )
        });

        return notesList;
    }

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }
    
    render() {
        const notes = this.renderNotes(this.props.notes);
        const form = this.state.showForm ? this.renderForm() : null;
        return (
            <div className='box-notes'>
                <div className='box-notes-options'><span onClick={this.toggleForm}>Add</span></div>
                <div className='box-notes-list'>{notes}</div>
                {form}
            </div>
        )
    }
}