import React, {Component} from 'react';

export default class ClockAnalog extends Component {
    constructor(props) {
        super(props);
        this.timezone = this.props.timezone;

        if (this.timezone === 'local') {
            this.timezone = new Date().getTimezoneOffset() / 60 * (-1);
        }

        this.state = {
            hoursDeg: 0,
            minutsDeg: 0,
            secondsDeg: 0
        };
    }

    componentDidMount() {
        this.setDeg();
        this.timerId = setInterval(this.setDeg, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    setDeg = () => {
        const {hoursDeg, minutsDeg, secondsDeg} = this.getDeg(new Date());
        
        this.setState({
            hoursDeg,
            minutsDeg,
            secondsDeg
        });
    }

    getDeg(date) {
        date.setUTCHours(date.getUTCHours() + this.timezone);
        const hoursDeg = date.getUTCHours() * 30 + (date.getUTCMinutes() / 60 * 30);
        const minutsDeg = date.getUTCMinutes() * 6;
        const secondsDeg = date.getUTCSeconds() * 6;

        return {hoursDeg, minutsDeg, secondsDeg};
    }

    renderIndicator() {
        return Array(6).fill(null).map((_, index) => {
            return <div key={index} className={`indicator indicator${index + 1}`}></div>
        });
    }
    
    renderAnalog() {
        const {hoursDeg, minutsDeg, secondsDeg} = this.state;
        const secondHand = this.props.index === 0 ? 
            <div className="hand seconds" style={{transform: `rotate(${secondsDeg}deg)`}}></div> : null;
        const indicators = this.renderIndicator();

        return (
            <div className="circle">
                <div className="hand hours" style={{transform: `rotate(${hoursDeg}deg)`}}></div>
                <div className="hand minuts" style={{transform: `rotate(${minutsDeg}deg)`}}></div>
                {secondHand}
                {indicators}
            </div>
        )
    }
    
    render() {
        const {city, removeClock} = this.props;
        const clock = this.renderAnalog();
        
        return (
            <div>
                {clock}
                <div className='city' onClick={() => removeClock(this.props.index)}>{city}</div>
            </div>
        )
    }
}