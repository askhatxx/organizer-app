import React, {Component} from 'react';

export default class Settings extends Component {
    state = {
        showSettings: false
    }

    showSettings = () => {
        this.setState({ showSettings: true }, () => {
            document.addEventListener('click', this.closeSettings)
        })
    }

    closeSettings = (event) => {
        if (!this.dropdownMenu) {
            document.removeEventListener('click', this.closeSettings);
        } else if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showSettings: false }, () => {
            document.removeEventListener('click', this.closeSettings);
            });
        }
    }

    renderListThemes() {
        const themes = this.props.themes.map((theme, index) => {
            return (
                <div 
                    key={index} 
                    className={`${theme}-item`}
                    onClick={() => this.props.changeTheme(theme)}
                ></div>
            )
        });

        return themes;
    }

    renderListSizes() {
        const sizes = this.props.sizes.map((sizes, index) => {
            return (
                <div 
                    key={index} 
                    className={`${sizes}-item`}
                    onClick={() => this.props.changeSizes(sizes)}
                >
                    {sizes}
                </div>
            )
        });

        return sizes;
    }

    renderSettigs() {
        const themes = this.renderListThemes();
        const sizes = this.renderListSizes();
        return (
            <div 
                className='settings-options'
                ref={(element) => {
                    this.dropdownMenu = element;
                }}
            >
                <div className='list-themes'>
                    {themes}
                </div>
                <div className='list-sizes'>
                    {sizes}
                </div>
            </div>
        )
    }

    render() {
        const settings = this.state.showSettings ? this.renderSettigs() : null;
        return (
            <div className='settings-inner'>
                <button onClick={this.showSettings}><i className="fas fa-ellipsis-v"></i></button>
                {settings}
            </div>
        )
    }
}