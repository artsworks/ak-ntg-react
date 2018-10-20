import React from 'react';
import getSvg from '../../utils/getSvg';

function Header() {
    return (
        <header className="App__header">
            <div className="App__header-logo">
                {getSvg(99)}
            </div>
            <div className="App__header-racing">
                {getSvg(1)}
                <p>Racing</p>
            </div>
        </header>
    );
}

export default Header;