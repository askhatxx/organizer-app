import React, {Component} from 'react';
import Notes from './Notes';
import Clock from './Clock';
import NoteAdd from './NoteAdd';
import NoteFilter from './NoteFilter';
import Settings from './Settings';

export default class App extends Component {
    constructor(props) {
        super(props);

        const initialNotes = [
            {title:'Title 1', text:'Text 1', date: '1575133281421', flag: false, color: 'default', id: '11'}, 
            {title:'Title Title 2', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit', date: '1575135251421', flag: false, color: 'default', id: '12'}, 
            {title:'Title Title Title3', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '1575133251421', flag: false, color: 'default', id: '13'}, 
            {title:'Title Title 4', text:'Text Title Title Title Title 4', date: '1575139951421', flag: false, color: 'default', id: '14'}, 
            {title:'Title Title 5', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', date: '1575133251421', flag: false, color: 'default', id: '15'}, 
            {title:'Title 6', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit', date: '1561133251421', flag: false, color: 'default', id: '16'}
        ];

        const initialClock = [
            {type: 'analog', city: 'Local', timezone: 'local'}
        ];

        this.cities = [
            {city: 'Local', timezone: 'local'},
            {city: 'San Francisco', timezone: '-8'},
            {city: 'New York', timezone: '-5'},
            {city: 'London', timezone: '+0'},
            {city: 'Berlin', timezone: '+1'},
            {city: 'Moscow', timezone: '+3'},
            {city: 'Beijing', timezone: '+8'},
            {city: 'Tokyo', timezone: '+9'},
            
        ];
        this.colorsNote = ['default', 'green', 'red', 'blue', 'orange', 'purple'];
        this.themes = ['theme-light', 'theme-dark', 'theme-orange', 'theme-purple'];
        this.sizes = ['60x40', '40x60', '50x50', '75x25', '25x75'];

        const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : initialNotes;
        const clock = localStorage.getItem('clock') ? JSON.parse(localStorage.getItem('clock')) : initialClock;
        const theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : this.themes[1];
        const sizes = localStorage.getItem('sizes') ? localStorage.getItem('sizes') : this.sizes[0];

        this.state = {
            notes,
            clock,
            filter: {text: '', flag: false, color: 'default'},
            theme,
            sizes
        };

        this.localStorageUpdate();
    }

    componentDidUpdate() {
        this.localStorageUpdate();
    }

    localStorageUpdate() {
        localStorage.setItem('notes', JSON.stringify(this.state.notes));
        localStorage.setItem('clock', JSON.stringify(this.state.clock));
        localStorage.setItem('theme', this.state.theme);
        localStorage.setItem('sizes', this.state.sizes);
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

    changeTheme = (theme) => {
        this.setState({theme})
    }

    changeSizes = (sizes) => {
        this.setState({sizes})
    }
    
    render() {
        const {notes, clock, filter: {text, flag, color}, theme, sizes} = this.state;
        console.log('render App', this.state.filter);
        const visibleNotes = this.filterText(this.filterFlag(this.filterColor(notes, color), flag), text);
        return (
            <div className={`${theme} sizes${sizes}`}>
                <div className='box'>
                    <div className='box-0'>
                        <div className='options'>
                            <NoteAdd addNote={this.addNote}/>
                            <NoteFilter 
                                changeFilterNote={this.changeFilterNote}
                                colorsNote={this.colorsNote}
                                filterColor={color}
                            />
                        </div>
                        <div className='settings'>
                            <Settings
                                themes={this.themes}
                                changeTheme={this.changeTheme}
                                sizes={this.sizes}
                                changeSizes={this.changeSizes}
                            />
                        </div>
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