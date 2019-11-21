import React, {Component} from 'react';
import NoteAdd from './NoteAdd';
import NoteList from './NoteList';

export default class Notes extends Component {
    render() {
        return (
            <div className='box-notes'>
                <div className='box-notes-options'>
                    <NoteAdd addNote={this.props.addNote}/>
                </div>
                <div className='box-notes-list'>
                    <NoteList 
                        notes={this.props.notes}
                        changeFlagNote={this.props.changeFlagNote}
                        colorsNote={this.props.colorsNote}
                        changeColorNote={this.props.changeColorNote}
                        removeNote={this.props.removeNote}
                    />
                </div>
            </div>
        )
    }
}