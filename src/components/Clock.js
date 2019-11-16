import React, {Component} from 'react';
import ClockAnalog from './ClockAnalog';

export default class Clock extends Component {
    state = {
        showCities: false
    }
    
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

            return (
                <li 
                    key={index}
                    onMouseDown={() => {
                        this.props.addClock({type: 'analog', city, timezone});
                        this.closeCities();
                    }}
                >
                    <span>{city}</span>
                    {timezone !== 'local' &&  <span className='timezone'>{timezone}</span>}
                </li>
            )
        });

        return <ul className='box-clock-cities'>{cities}</ul>
    }

    toggleCities = () => {
        this.setState({
            showCities: !this.state.showCities
        })
    }

    closeCities = () => {
        this.setState({
            showCities: false
        })
    }
    
    render() {
        const clock = this.renderClock();
        const cities = this.state.showCities ? this.renderCities() : null;
        
        return (
            <div className='box-clock'>
                <div className='box-circles'>
                    {clock}
                </div>
                <div className='box-clock-add'>
                    {cities}
                    <button 
                        onClick={this.toggleCities}
                        onBlur={this.closeCities}
                    >Add</button>
                </div>
            </div>
        )
    }
}