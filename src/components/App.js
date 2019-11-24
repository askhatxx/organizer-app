import React, {Component} from 'react';
import Notes from './Notes';
import Clock from './Clock';
import NoteAdd from './NoteAdd';
import NoteFilter from './NoteFilter';

const notesTemp = [
    {title:'Title 1', text:'Text 1', flag: false, color: 'default', id: '11'}, 
    {title:'Title Title 2', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit', flag: false, color: 'default', id: '12'}, 
    {title:'Title Title Title3', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', flag: false, color: 'default', id: '13'}, 
    {title:'Title Title 4', text:'Text Title Title Title Title 4', flag: false, color: 'default', id: '14'}, 
    {title:'Title Title 5', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', flag: false, color: 'default', id: '15'}, 
    {title:'Title 6', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit', flag: false, color: 'default', id: '16'}
];

export default class App extends Component {
    constructor(props) {
        super(props);

        this.cities = [
            {city: 'Local', timezone: 'local'},
            {city: 'London', timezone: '+0'},
            {city: 'Tokyo', timezone: '+9'},
            {city: 'New York', timezone: '-5'}
        ];

        const initialClock = [
            {type: 'analog', city: 'Local', timezone: 'local'}
        ];

        this.colorsNote = ['default', 'green', 'red', 'blue'];
        this.themes = ['theme-default', 'theme-dark'];

        const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : notesTemp;
        const clock = localStorage.getItem('clock') ? JSON.parse(localStorage.getItem('clock')) : initialClock;

        this.state = {
            notes,
            clock,
            filter: {text: '', flag: false, color: 'default'},
            theme: 'theme-dark'
        };

        this.localStorageUpdate();
    }

    componentDidUpdate() {
        this.localStorageUpdate();
    }

    localStorageUpdate() {
        localStorage.setItem('notes', JSON.stringify(this.state.notes));
        localStorage.setItem('clock', JSON.stringify(this.state.clock));
    }

    changeFlagNote = (id) => {
        const index = this.state.notes.findIndex(item => item.id === id);
        const oldFlag = this.state.notes[index].flag;
        const newNote = {...this.state.notes[index], flag: !oldFlag};
        const newArr = [...this.state.notes.slice(0, index), newNote, ...this.state.notes.slice(index + 1)];
        this.setState({
            notes: newArr
        });
    }

    changeColorNote = ({id, color}) => {
        const index = this.state.notes.findIndex(item => item.id === id);
        const newNote = {...this.state.notes[index], color: color};
        const newArr = [...this.state.notes.slice(0, index), newNote, ...this.state.notes.slice(index + 1)];
        this.setState({
            notes: newArr
        });
    }

    addNote = (note) => {
        const newNote = [note, ...this.state.notes];
        this.setState({notes: newNote});
    }
    
    removeNote = (id) => {
        const newNotes = this.state.notes.filter((item) => {
            return item.id !== id;
        });
        this.setState({notes: newNotes});
    }

    addClock = (clock) => {
        const newClock = [...this.state.clock, clock];
        this.setState({clock: newClock});
    }

    removeClock = (index) => {
        const newClock = this.state.clock.filter((_, i) => {
            return index !== i;
        });
        this.setState({clock: newClock});
    }

    changeFilterNote = (filter) => {
        this.setState({filter});
    }

    filterText(items, textFilter) {
        if (textFilter.length === 0) {
            return items;
        }

        const lowerTextFilter = textFilter.toLowerCase();

        return items.filter(({title, text}) => {
            const lowerTitle = title.toLowerCase();
            const lowerText = text.toLowerCase();
            return lowerTitle.includes(lowerTextFilter) || lowerText.includes(lowerTextFilter);
        });
    }

    filterFlag(items, flag) {
        if (flag === false) {
            return items;
        }

        return items.filter((item) => item.flag === true);
    }

    filterColor(items, color) {
        if (color === 'default') {
            return items;
        }

        return items.filter((item) => item.color === color);
    }
    
    render() {
        const {notes, clock, filter: {text, flag, color}, theme} = this.state;
        console.log('render App', this.state.filter);
        const visibleNotes = this.filterText(this.filterFlag(this.filterColor(notes, color), flag), text);
        return (
            <div className={theme}>
                <div className='box'>
                    <div className='box-0'>
                        <NoteAdd addNote={this.addNote}/>
                        <NoteFilter 
                            changeFilterNote={this.changeFilterNote}
                            colorsNote={this.colorsNote}
                        />
                    </div>
                    <div className='box-1'>
                        <Notes 
                            notes={visibleNotes}
                            colorsNote={this.colorsNote}
                            removeNote={this.removeNote}
                            changeFlagNote={this.changeFlagNote}
                            changeColorNote={this.changeColorNote}
                        />
                    </div>
                    <div className='box-2'>
                        <Clock 
                            clock={clock} 
                            cities={this.cities} 
                            addClock={this.addClock} 
                            removeClock={this.removeClock} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}