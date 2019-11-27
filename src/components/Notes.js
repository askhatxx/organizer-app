import React, {Component} from 'react';
import ColorList from './ColorList';

export default class Notes extends Component {
    renderNoteTitleOptions(id) {
        return (
            <div className='note-title-options'>
                <ColorList 
                    id={id}
                    colorsNote={this.props.colorsNote}
                    changeColorNote={this.props.changeColorNote}
                />
                <div className='note-remove'>
                    <button onClick={() => this.props.removeNote(id)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        )
    }

    renderNoteFlag(id, flag) {
        return (
            <button
                onClick={() => this.props.changeFlagNote(id)}
            >
                {flag ? <i className="far fa-check-circle"></i> : <i className="far fa-circle"></i>}
            </button>
        )
    }
    
    renderNotes(notes) {
        const notesList = notes.map((item) => {
            const {title, text, flag, color, id} = item;
            const noteFlag = this.renderNoteFlag(id, flag);
            const options = this.renderNoteTitleOptions(id);
            let clazz = 'note';

            if (title.length > 200 || text.length > 200) {
                clazz += ' long';
            }

            return (
                <div key={id} className={clazz}>
                    <div className={`note-inner ${color}`}>
                        <div className='note-head'>
                            <div className='note-flag'>{noteFlag}</div>
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

    render() {
        const notes = this.renderNotes(this.props.notes);
        return (
            <div className='box-notes-list'>
                {notes}
            </div>
        )
    }
}