import React, {Component} from 'react';

export default class Notes extends Component {
    renderNotes(notes) {
        const notesList = notes.map((item, index) => {
            const {title, text} = item;

            return (
                <div key={index}>
                    <div>{title}</div>
                    <div>{text}</div>
                </div>
            )
        });

        return notesList;
    }
    
    render() {
        const notes = this.renderNotes(this.props.notes);
        return (
            <div className='box-notes'>
                <div className='box-notes-options'>Add</div>
                <div className='box-notes-list'>{notes}</div>
            </div>
        )
    }
}