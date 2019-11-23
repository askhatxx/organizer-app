import React, {Component} from 'react';
import ColorList from './ColorList';

export default class NoteFilter extends Component {
    state = {
        text: '',
        flag: false,
        color: ''
    }

    changeText = (event) => {
        const value = event.target.value;
        this.setState({text: value});
        this.updateFilter('text', value);
    }

    changeFlag = () => {
        const value = !this.state.flag;
        this.setState({flag: value});
        this.updateFilter('flag', value);
    }

    changeColor = ({color}) => {
        this.setState({color: color});
        this.updateFilter('color', color);
    }

    updateFilter(key, value) {
        const newFilter = {...this.state, [key]: value};
        this.props.changeFilterNote(newFilter);
    }
    
    render() {
        return (
            <div>
                <input 
                    type='text'
                    value={this.state.text}
                    onChange={this.changeText}
                />
                <div onClick={this.changeFlag} style={{float: 'right'}}>{this.state.flag ? 'true' : 'false'}</div>
                <ColorList 
                    colorsNote={this.props.colorsNote}
                    changeColorNote={this.changeColor}
                />
            </div>
        )
    }
}