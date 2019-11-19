import React, {Component} from 'react';
import Notes from './Notes';
import Clock from './Clock';

const notesTemp = [
    {title:'Title 1', text:'Text 1', flag: false}, 
    {title:'Title Title 2', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit', flag: false}, 
    {title:'Title Title Title3', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', flag: false}, 
    {title:'Title Title 4', text:'Text Title Title Title Title 4', flag: false}, 
    {title:'Title Title 5', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', flag: false}, 
    {title:'Title 6', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit', flag: false}
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

        const initialClock = {
            type: 'analog',
            city: 'Local',
            timezone: 'local'
        };
        const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : notesTemp;
        const clock = localStorage.getItem('clock') ? JSON.parse(localStorage.getItem('clock')) : [initialClock];

        this.state = {
            notes,
            clock
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

    changeFlagNote = (index) => {
        const oldFlag = this.state.notes[index].flag;
        const newNote = {...this.state.notes[index], flag: !oldFlag};
        const newArr = [...this.state.notes.slice(0, index), newNote, ...this.state.notes.slice(index + 1)];
        this.setState({
            notes: newArr
        });
    }

    addNote = (note) => {
        const newNote = [note, ...this.state.notes];
        this.setState({notes: newNote});
    }
    
    removeNote = (index) => {
        const newNotes = this.state.notes.filter((_, i) => {
            return index !== i;
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
    
    render() {
        const {notes, clock} = this.state;
        //console.log(localStorage.getItem('clock'));
        //console.log(this.state);
        return (
            <div className='box'>
                <div className='box-1'>
                    <Notes 
                        notes={notes} 
                        addNote={this.addNote}
                        removeNote={this.removeNote}
                        changeFlagNote={this.changeFlagNote}
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
        )
    }
}