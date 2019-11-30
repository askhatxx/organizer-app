import React, {Component} from 'react';
import ColorList from './ColorList';

export default class Notes extends Component {
    formatDateAddZero(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    }
    
    formatDate(date) {
        const noteDate = new Date(+date);
        const day = this.formatDateAddZero(noteDate.getDate());
        const month = this.formatDateAddZero(noteDate.getMonth() + 1);
        const year = noteDate.getFullYear();
        const hours = this.formatDateAddZero(noteDate.getHours());
        const minutes = this.formatDateAddZero(noteDate.getMinutes());

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

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
            const {title, text, date, flag, color, id} = item;
            const noteFlag = this.renderNoteFlag(id, flag);
            const options = this.renderNoteTitleOptions(id);
            const noteDate = this.formatDate(date);
            let clazz = 'note';

            if (title.length > 200 || text.length > 200) {
                clazz += ' long';
            }

            return (
                <div key={id} className={clazz}>
                    <div className='note-inner-bg'>
                        <div className={`note-inner ${color}`}>
                            <div className='note-head'>
                                <div className='note-flag'>{noteFlag}</div>
                                <div className='note-title'>{title}</div>
                                <div>{options}</div>
                            </div>
                            <div className='note-text'>{text}</div>
                            <div className='note-date'><i className="far fa-clock"></i> {noteDate}</div>
                        </div>
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