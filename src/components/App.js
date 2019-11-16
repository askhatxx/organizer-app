import React, {Component} from 'react';
import Notes from './Notes';
import Clock from './Clock';

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
            clock: data
        }
    }

    addClock = (clock) => {
        const newClock = [...this.state.clock, clock];
        this.updateState(newClock);
    }

    removeClock = (index) => {
        const newClock = this.state.clock.filter((_, i) => {
            return index !== i;
        });
        this.updateState(newClock);
    }

    updateState(data) {
        localStorage.setItem('clock', JSON.stringify(data));
        this.setState({clock: data});
    }
    
    render() {
        const {clock} = this.state;
        console.log(localStorage.getItem('clock'));
        return (
            <div className='box'>
                <div className='box-1'>
                    <Notes notes={[{title:'Title 1', text:'Text 1'}, {title:'Title 2', text:'Text 2'}]}/>
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