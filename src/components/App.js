import React, {Component} from 'react';
import Clock from './Clock';

export default class App extends Component {
    constructor(props) {
        super(props);

        const initialClock = {
            type: 'analog',
            timezone: 'local'
        };
        const data = localStorage.getItem('clock') ? JSON.parse(localStorage.getItem('clock')) : [initialClock];

        this.state = {
            clock: data
        }
    }

    addClock = (clock) => {
        const newClock = [...this.state.clock, clock];
        localStorage.setItem('clock', JSON.stringify(newClock));
        this.setState({clock: newClock});
    }

    removeClock = (index) => {
        const newClock = this.state.clock.filter((_, i) => {
            return index !== i;
        });
        localStorage.setItem('clock', JSON.stringify(newClock));
        this.setState({clock: newClock});
    }
    
    render() {
        const {clock} = this.state;
        console.log(localStorage.getItem('clock'));
        console.log(this.state.clock);
        return (
            <div className='box'>
                <div className='box-1'>dd</div>
                <div className='box-2'>
                    <Clock clock={clock} addClock={this.addClock} removeClock={this.removeClock} />
                </div>
            </div>
        )
    }
}