import React, {Component} from 'react';

export default class NoteList extends Component {
    renderNoteTitleOptions(index) {
        return (
            <div className='note-title-options'>
                <div onClick={() => this.props.removeNote(index)}>del</div>
                <ColorList 
                    index={index}
                    colorsNote={this.props.colorsNote}
                    changeColorNote={this.props.changeColorNote}
                />
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
            <div className='box-notes-list'>
                {notes}
            </div>
        )
    }
}



class ColorList extends Component {
    state = {
        showMenu: false
    }

    showMenu = (event) => {
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }
    
    closeMenu = (event) => {
        if (!this.dropdownMenu) {
            document.removeEventListener('click', this.hideColorMenu);
        } else if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
            });
        }
    }

    render() {
        const colorsItems = this.props.colorsNote.map((color) => {
            return (
                <div key={color}>
                    <div 
                        className={`color ${color}`}
                        onClick={() => this.props.changeColorNote(this.props.index, color)}
                    ></div>
                </div>
            )
        });

        return (
            <div>
                <button onClick={this.showMenu}>color</button>
                {
                    this.state.showMenu 
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
                    null
                }
            </div>
        )
    }
}