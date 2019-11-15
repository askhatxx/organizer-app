import React, {Component} from 'react';
import ClockAnalog from './ClockAnalog';

export default class Clock extends Component {
    renderClock() {
        const clock = this.props.clock.map((item, index) => {
            const {type, city, timezone} = item;

            if (type === 'analog') {
                return (
                    <ClockAnalog 
                        key={index}
                        timezone={timezone}
                        city={city}
                        index={index}
                        removeClock={this.props.removeClock}
                    />
                )
            }
            
            return null;
        });

        return clock;
    }

    renderCities() {
        const cities = this.props.cities.map((item, index) => {
            const {city, timezone} = item;

            return <li key={index}>{city + timezone}</li>
        });

        return <ul>{cities}</ul>
    }
    
    render() {
        const clock = this.renderClock();
        const cities = this.renderCities();
        
        return (
            <div className='box-clock'>
                <div className='box-circles'>
                    {clock}
                </div>
                <div className='box-clock-add'>
                    {cities}
                    <button onClick={() => this.props.addClock({type: 'analog', timezone: '3', city: 'Kiev'})}>Add</button>
                    <button onClick={() => this.props.addClock({type: 'analog', timezone: '4', city: 'Minsk'})}>Add</button>
                </div>
            </div>
        )
    }
}