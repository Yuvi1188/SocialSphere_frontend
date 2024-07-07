import React from 'react';

const UserImg = ({ imag, dim }) => {
    const sizeStyle = {
        width: `${dim}rem`,
        height: `${dim}rem`,
    };

    return (
        <div style={sizeStyle} className="border rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src={imag} alt="Profile" />
        </div>
    );
}

export default UserImg;
