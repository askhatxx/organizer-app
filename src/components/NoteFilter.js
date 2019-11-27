import React, {Component} from 'react';
import ColorList from './ColorList';

export default class NoteFilter extends Component {
    state = {
        text: '',
        flag: false,
        color: 'default'
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
            <div className='note-filter'>
                <div className='note-filter-search'>
                    <input 
                        type='text'
                        value={this.state.text}
                        onChange={this.changeText}
                        placeholder='Search'
                        className='note-filter-input'
                    />
                </div>
                <div className='note-filter-flag'>
                    <button 
                        onClick={this.changeFlag}
                    >
                        {this.state.flag ? <i className="far fa-check-circle"></i> : <i className="far fa-circle"></i>}
                    </button>
                </div>
                <div>
                    <ColorList 
                        colorsNote={this.props.colorsNote}
                        changeColorNote={this.changeColor}
                    />
                </div>
            </div>
        )
    }
}