// CustomHorizontalScrollbar.js
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import '../../styles/customScrollbar.scss';
const CustomScrollbar = ({ children }) => {
    return (
        <Scrollbars
            style={{ width: '100vw', height: '100vh' }} // Adjust the width and height as needed
            renderTrackHorizontal={(props) => (
                <div {...props} className="track-horizontal" id="style-3" />
            )}
            renderThumbHorizontal={(props) => (
                <div {...props} className="thumb-horizontal" id="style-3" />
            )}
        >
            {children}
        </Scrollbars>
    );
};

export default CustomScrollbar;

