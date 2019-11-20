import React, {Component} from 'react';
import NoteAdd from './NoteAdd';

export default class Notes extends Component {
    state = {
        noteColor: null
    }
    
    showColorMenu = (event) => {
        const num = +event.target.name;
        this.setState({ noteColor: num }, () => {
            document.addEventListener('click', this.hideColorMenu);
        });
    }

    hideColorMenu = (event) => {
        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ noteColor: null }, () => {
                document.removeEventListener('click', this.hideColorMenu);
            });
        }
    }

    renderNoteTitleOptions(index) {
        const colorsItems = this.props.colorsNote.map((color) => {
            return (
                <div key={color}>
                    <div 
                        className={`color ${color}`}
                        onClick={() => this.props.changeColorNote(index, color)}
                    ></div>
                </div>
            )
        });

        const colorBox = this.state.noteColor === index 
        ? 
        <div 
            ref={(element) => {
                this.dropdownMenu = element;
            }} 
            className='colors'
        >
            {colorsItems}
        </div> 
        : 
        null;

        return (
            <div className='note-title-options'>
                <div onClick={() => this.props.removeNote(index)}>del</div>
                <button name={index} onClick={this.showColorMenu}>color</button>
                {colorBox}
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
    
    renderNotes(notes) {
        const notesList = notes.map((item, index) => {
            const {title, text, flag, color} = item;
            const noteFlag = this.renderNoteFlag(index, flag);
            const options = this.renderNoteTitleOptions(index);
            let clazz = 'note';

            if (title.length > 200 || text.length > 200) {
                clazz += ' long';
            }

            return (
                <div key={index} className={clazz}>
                    <div className={`note-inner ${color}`}>
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

    render() {
        const notes = this.renderNotes(this.props.notes);
        return (
            <div className='box-notes'>
                <div className='box-notes-options'>
                    <NoteAdd addNote={this.props.addNote}/>
                </div>
                <div className='box-notes-list'>
                    {notes}
                </div>
            </div>
        )
    }
}