import React from 'react';

const Navigation = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p className='pointer pa2'>Browse</p>
            <p className='pointer pa2'>Sign Out</p>
        </nav>
    );
}

export default Navigation;