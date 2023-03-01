import React from 'react';
import PropTypes from 'prop-types';
import theme from '../theme/palette';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
  color: theme.complement,
  height: '50px',
  textAlign: 'center',
};

const textStyle = {
  backgroundColor: theme.complementDark,
  padding: '5px',
  paddingLeft: '10px',
  paddingRight: '10px',
  marginBottom: '10px',
  borderRadius: '10px',
  border: '1px solid'
};

const Notification = ({ text }) => {
  return (
    <div className="notification-container" style={containerStyle}>
      <span className="notification-container" style={{ ...textStyle, display: text ? 'inline' : 'none' }}>
        {text}
      </span>
    </div>
  );
};

Notification.propTypes = {
  text: PropTypes.string,
};

export default Notification;
