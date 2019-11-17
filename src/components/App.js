import React, {Component} from 'react';
import Notes from './Notes';
import Clock from './Clock';

const notesTemp = [
    {title:'Title 1', text:'Text 1'}, 
    {title:'Title Title 2', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}, 
    {title:'Title Title Title3', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}, 
    {title:'Title Title 4', text:'Text Title Title Title Title 4'}, 
    {title:'Title Title 5', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}, 
    {title:'Title 6', text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
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
        const data = localStorage.getItem('clock') ? JSON.parse(localStorage.getItem('clock')) : [initialClock];

        this.state = {
            notes: notesTemp,
            clock: data
        }
    }

    addNote = (note) => {
        const newNote = [note, ...this.state.notes];
        this.updateState({notes: newNote});
    }
    
    removeNote = (index) => {
        const newNotes = this.state.notes.filter((_, i) => {
            return index !== i;
        });
        this.updateState({notes: newNotes});
    }

    addClock = (clock) => {
        const newClock = [...this.state.clock, clock];
        this.updateState({clock: newClock});
    }

    removeClock = (index) => {
        const newClock = this.state.clock.filter((_, i) => {
            return index !== i;
        });
        this.updateState({clock: newClock});
    }

    updateState(data) {
        for (const key in data) {
            localStorage.setItem(key, JSON.stringify(data[key]));
        }
        this.setState(data);
    }
    
    render() {
        const {notes, clock} = this.state;
        console.log(localStorage.getItem('clock'));
        console.log(this.state);
        return (
            <div className='box'>
                <div className='box-1'>
                    <Notes 
                        notes={notes} 
                        addNote={this.addNote}
                        removeNote={this.removeNote}
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