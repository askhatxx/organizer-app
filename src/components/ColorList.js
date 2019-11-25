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
            document.removeEventListener('click', this.closeMenu);
        } else if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
            });
        }
    }

    render() {
        const colorsItems = this.props.colorsNote.map((color) => {
            const data = {color};

            if (this.props.id !== undefined) {
                data.id = this.props.id;
            }
            
            return (
                <div key={color}>
                    <div 
                        className={`color ${color}`}
                        onClick={() => this.props.changeColorNote(data)}
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