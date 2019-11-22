import React, {Component} from 'react';

export default class ColorList extends Component {
    state = {
        showMenu: false
    }

    showMenu = () => {
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }
    
    closeMenu = (event) => {
        if (!this.dropdownMenu) {
            document.removeEventListener('click', this.hideColorMenu);
        } else if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
            });
        }
    }

    render() {
        const colorsItems = this.props.colorsNote.map((color) => {
            return (
                <div key={color}>
                    <div 
                        className={`color ${color}`}
                        onClick={() => this.props.changeColorNote(this.props.id, color)}
                    ></div>
                </div>
            )
        });

        return (
            <div>
                <button onClick={this.showMenu}>color</button>
                {
                    this.state.showMenu 
                    ? 
                    <div 
                        ref={(element) => {
                            this.dropdownMenu = element;
                        }} 
                        className='colors'
                    >
                        {colorsItems}
                    </div> 
                    : 
                    null
                }
            </div>
        )
    }
}