import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import theme from '../../theme/palette';

const Signup = (props) => {

  const containerStyle = {
    padding: '20px',
    backgroundColor: theme.dark,
    borderRadius: '10px',
    border: '2px solid',
    borderColor: theme.medium,
    color: theme.light,
    marginTop: '50px',
  }

  const inputStyle = {

  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={containerStyle}>
      <h2 style={{textAlign: 'center'}}>Signup</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" ref={emailRef}/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" ref={passwordRef}/>
        </div>
        <div>
          <label>Confirm password:</label>
          <input type="password" ref={passwordConfirmRef}/>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
    </div>
    
  );
};

Signup.propTypes = {};

export default Signup;
