import React, { memo } from 'react';

const Button = ({ name }) => {
    return (
        <button
            type="button"
            className="px-5 py-1 m-2 bg-gray-100 rounded-md hover:bg-gray-200"
            aria-label={name}
        >
            {name}
        </button>
    );
};

export default memo(Button);
