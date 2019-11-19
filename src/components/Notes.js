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
        this.props.addNote({title: this.state.formTitle, text: this.state.formText, flag: false});
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
                    <div>
                        <button type='submit'>Send</button>
                        <button type='button' onClick={this.closeForm}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
    
    renderNoteFlag(index, flag) {
        const clazz = flag ? 'flag flag-true' : 'flag';

        return (
            <span
                onClick={() => this.props.changeFlagNote(index)}
                className={clazz}
            ></span>
        )
    }

    renderNoteTitleOptions(index) {
        return <span onClick={() => this.props.removeNote(index)}>del</span>
    }
    
    renderNotes(notes) {
        const notesList = notes.map((item, index) => {
            const {title, text, flag} = item;
            const noteFlag = this.renderNoteFlag(index, flag);
            const options = this.renderNoteTitleOptions(index);
            let clazz = 'note';

            if (title.length > 200 || text.length > 200) {
                clazz += ' long';
            }

            return (
                <div key={index} className={clazz}>
                    <div className='note-inner'>
                        <div className='note-head'>
                            <div>{noteFlag}</div>
                            <div className='note-title'>{title}</div>
                            <div>{options}</div>
                        </div>
                        <div className='note-text'>{text}</div>
                    </div>
                </div>
            )
        });

        return notesList;
    }

    closeForm = () => {
        this.setState({
            showForm: false
        })
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