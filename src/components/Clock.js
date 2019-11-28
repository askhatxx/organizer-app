import React, {Component} from 'react';
import ClockAnalog from './ClockAnalog';

export default class Clock extends Component {
    state = {
        showCities: false
    }

    showCities = () => {
        this.setState({ showCities: true }, () => {
            document.addEventListener('click', this.closeCities);
        })
    }

    closeCities = () => {
        this.setState({ showCities: false }, () => {
            document.removeEventListener('click', this.closeCities);
        })
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
                    onClick={() => {
                        this.props.addClock({type: 'analog', city, timezone});
                    }}
                >
                    <span>{city}</span>
                    {timezone !== 'local' &&  <span className='timezone'>{timezone}</span>}
                </li>
            )
        });

        return <ul className='box-clock-cities'>{cities}</ul>
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
                        onClick={this.showCities}
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        )
    }
}