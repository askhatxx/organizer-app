import React, {Component} from 'react';
import ClockAnalog from './ClockAnalog';

export default class Clock extends Component {
    render() {
        const clock = this.props.clock.map((item, index) => {
            const {type, timezone} = item;

            if (type === 'analog') {
                return (
                    <ClockAnalog 
                        key={index}
                        timezone={timezone}
                        index={index}
                        removeClock={this.props.removeClock}
                    />
                )
            }
            
            return null;
        });
        
        return (
            <div className='box-clock'>
                <div className='box-circles'>
                    {clock}
                </div>
                <div className='box-clock-add'>
                    <button onClick={() => this.props.addClock({type: 'analog', timezone: 3})}>Add</button>
                </div>
            </div>
        )
    }
}