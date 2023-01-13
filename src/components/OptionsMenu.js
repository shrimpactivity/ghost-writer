import React from 'react';
import PropTypes from 'prop-types';

const OptionsMenu = (props) => {
    const [hidden, setHidden] = React.useState(true);
    return (
        <div>
            <button onClick={() => setHidden(!hidden)}>{hidden ? 'Options' : 'Hide Options'}</button>
            {!hidden && <div>{props.children}</div>}
        </div>
    )
}

OptionsMenu.propTypes = {
    children: PropTypes.node
}

export default OptionsMenu;